-- ORION V13 — hardening de autorização/RLS
-- IMPORTANTE: antes de aplicar, marque o(s) administrador(es) em auth.users.raw_app_meta_data:
-- {"role":"admin"}. App metadata deve ser alterado apenas por ambiente confiável/Admin API.

begin;

create or replace function public.is_orion_admin()
returns boolean
language sql
stable
security invoker
set search_path = public, auth
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function public.is_orion_admin() from public;
grant execute on function public.is_orion_admin() to authenticated;

alter table public.projects enable row level security;
alter table public.briefings enable row level security;
alter table public.project_files enable row level security;
alter table public.project_timeline enable row level security;

-- Remove políticas antigas permissivas e recria com RBAC explícito.
drop policy if exists "orion_admin_read_projects" on public.projects;
create policy "orion_admin_read_projects"
on public.projects for select to authenticated
using ((select public.is_orion_admin()));

drop policy if exists "orion_admin_read_briefings" on public.briefings;
create policy "orion_admin_read_briefings"
on public.briefings for select to authenticated
using ((select public.is_orion_admin()));

drop policy if exists "orion_admin_read_project_files" on public.project_files;
create policy "orion_admin_read_project_files"
on public.project_files for select to authenticated
using ((select public.is_orion_admin()));

drop policy if exists "admin_read_project_timeline" on public.project_timeline;
create policy "admin_read_project_timeline"
on public.project_timeline for select to authenticated
using ((select public.is_orion_admin()));

drop policy if exists "admin_insert_project_timeline" on public.project_timeline;
create policy "admin_insert_project_timeline"
on public.project_timeline for insert to authenticated
with check ((select public.is_orion_admin()));

-- Storage: somente usuários explicitamente administradores podem ler/apagar.
drop policy if exists "admin_read_project_assets" on storage.objects;
create policy "admin_read_project_assets"
on storage.objects for select to authenticated
using (bucket_id = 'project-assets' and (select public.is_orion_admin()));

drop policy if exists "admin_delete_project_assets" on storage.objects;
create policy "admin_delete_project_assets"
on storage.objects for delete to authenticated
using (bucket_id = 'project-assets' and (select public.is_orion_admin()));

-- RPC administrativa: exige role=admin, não apenas sessão autenticada.
create or replace function public.orion_delete_project(p_project_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_orion_admin() then
    raise exception 'Acesso não autorizado.';
  end if;

  if not exists (select 1 from public.projects where id = p_project_id) then
    raise exception 'Projeto não encontrado.';
  end if;

  delete from public.project_timeline where project_id = p_project_id;
  delete from public.project_files where project_id = p_project_id;
  delete from public.briefings where project_id = p_project_id;
  delete from public.projects where id = p_project_id;
  return true;
end;
$$;

revoke all on function public.orion_delete_project(uuid) from public, anon;
grant execute on function public.orion_delete_project(uuid) to authenticated;

-- Mantém a assinatura existente para não quebrar o painel.
create or replace function public.update_project_tracking(
  p_project_id uuid,
  p_status text,
  p_next_step text default null,
  p_note text default null,
  p_visible_to_client boolean default true
)
returns table (
  project_id uuid,
  status text,
  progress smallint,
  next_step text,
  status_updated_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_progress smallint;
  v_old_status text;
begin
  if not public.is_orion_admin() then
    raise exception 'Acesso não autorizado.';
  end if;

  if lower(p_status) not in (
    'novo', 'briefing_recebido', 'aguardando_material', 'material_recebido',
    'em_desenvolvimento', 'em_revisao', 'publicado', 'finalizado'
  ) then
    raise exception 'Status de projeto inválido.';
  end if;

  select projects.status into v_old_status
  from public.projects
  where id = p_project_id
  for update;

  if not found then
    raise exception 'Projeto não encontrado.';
  end if;

  v_progress := public.orion_status_progress(p_status);

  update public.projects
  set status = lower(p_status),
      progress = v_progress,
      next_step = nullif(trim(coalesce(p_next_step, '')), ''),
      status_updated_at = now(),
      updated_at = now()
  where id = p_project_id;

  insert into public.project_timeline (
    project_id, event_type, title, description, status, progress,
    visible_to_client, created_by
  ) values (
    p_project_id,
    case when lower(coalesce(v_old_status, '')) = lower(p_status) then 'note' else 'status_changed' end,
    case
      when lower(coalesce(v_old_status, '')) = lower(p_status) then 'Atualização do projeto'
      else public.orion_status_label(p_status)
    end,
    nullif(trim(coalesce(p_note, '')), ''),
    lower(p_status),
    v_progress,
    p_visible_to_client,
    auth.uid()
  );

  return query
  select p.id, p.status, p.progress, p.next_step, p.status_updated_at
  from public.projects p
  where p.id = p_project_id;
end;
$$;

revoke all on function public.update_project_tracking(uuid, text, text, text, boolean) from public, anon;
grant execute on function public.update_project_tracking(uuid, text, text, text, boolean) to authenticated;

-- Aumenta a entropia dos NOVOS protocolos públicos (12 caracteres ≈ 60 bits).
-- Projetos existentes não são alterados para preservar links/protocolos já enviados.
create or replace function public.orion_generate_random_project_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_code text;
  v_attempt integer := 0;
begin
  loop
    v_attempt := v_attempt + 1;
    select 'ORION-' || string_agg(
      substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::integer, 1),
      ''
    ) into v_code
    from generate_series(1, 12);

    exit when not exists (
      select 1 from public.projects where upper(project_code) = upper(v_code)
    );

    if v_attempt >= 50 then
      raise exception 'Não foi possível gerar um protocolo Orion exclusivo.';
    end if;
  end loop;
  return v_code;
end;
$$;

commit;
