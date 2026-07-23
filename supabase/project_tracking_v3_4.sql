-- ============================================================
-- ORION V3.4 — ACOMPANHAMENTO DE PROJETOS
-- Execute uma única vez no SQL Editor do Supabase.
-- Script aditivo e idempotente: preserva projetos e briefings.
-- ============================================================

begin;

-- 1. Campos principais de acompanhamento.
alter table public.projects
  add column if not exists progress smallint not null default 5,
  add column if not exists next_step text,
  add column if not exists status_updated_at timestamptz not null default now();

alter table public.projects
  drop constraint if exists projects_progress_check;

alter table public.projects
  add constraint projects_progress_check check (progress between 0 and 100);

-- 2. Histórico completo do projeto.
create table if not exists public.project_timeline (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  event_type text not null default 'note',
  title text not null,
  description text,
  status text,
  progress smallint,
  visible_to_client boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint project_timeline_progress_check check (progress is null or progress between 0 and 100)
);

create index if not exists project_timeline_project_created_idx
  on public.project_timeline (project_id, created_at desc);

alter table public.project_timeline enable row level security;

-- O painel administrativo atual utiliza usuários autenticados.
drop policy if exists "admin_read_project_timeline" on public.project_timeline;
create policy "admin_read_project_timeline"
on public.project_timeline
for select
to authenticated
using (true);

drop policy if exists "admin_insert_project_timeline" on public.project_timeline;
create policy "admin_insert_project_timeline"
on public.project_timeline
for insert
to authenticated
with check (auth.uid() is not null);

-- 3. Padronização dos status e percentuais.
create or replace function public.orion_status_progress(p_status text)
returns smallint
language sql
immutable
as $$
  select case lower(coalesce(p_status, 'novo'))
    when 'novo' then 5
    when 'briefing_recebido' then 15
    when 'aguardando_material' then 25
    when 'material_recebido' then 35
    when 'em_desenvolvimento' then 60
    when 'em_revisao' then 85
    when 'publicado' then 100
    when 'finalizado' then 100
    else 5
  end::smallint;
$$;

create or replace function public.orion_status_label(p_status text)
returns text
language sql
immutable
as $$
  select case lower(coalesce(p_status, 'novo'))
    when 'novo' then 'Novo projeto'
    when 'briefing_recebido' then 'Briefing recebido'
    when 'aguardando_material' then 'Aguardando material'
    when 'material_recebido' then 'Material recebido'
    when 'em_desenvolvimento' then 'Em desenvolvimento'
    when 'em_revisao' then 'Em revisão'
    when 'publicado' then 'Publicado'
    when 'finalizado' then 'Finalizado'
    else initcap(replace(coalesce(p_status, 'novo'), '_', ' '))
  end;
$$;

-- 4. Trigger para registrar automaticamente a criação do projeto.
create or replace function public.orion_project_created_timeline()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.status := coalesce(nullif(new.status, ''), 'novo');
  new.progress := public.orion_status_progress(new.status);
  new.status_updated_at := coalesce(new.status_updated_at, now());

  return new;
end;
$$;

drop trigger if exists trg_orion_project_defaults on public.projects;
create trigger trg_orion_project_defaults
before insert on public.projects
for each row execute function public.orion_project_created_timeline();

create or replace function public.orion_project_after_insert_timeline()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.project_timeline (
    project_id, event_type, title, description, status, progress, visible_to_client
  ) values (
    new.id,
    'created',
    'Projeto criado',
    'A solicitação foi registrada no Portal Orion.',
    new.status,
    new.progress,
    true
  );
  return new;
end;
$$;

drop trigger if exists trg_orion_project_after_insert_timeline on public.projects;
create trigger trg_orion_project_after_insert_timeline
after insert on public.projects
for each row execute function public.orion_project_after_insert_timeline();

-- 5. Atualização segura feita pelo Orion Admin.
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
  if auth.uid() is null then
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
    project_id,
    event_type,
    title,
    description,
    status,
    progress,
    visible_to_client,
    created_by
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

-- 6. Consulta pública limitada por protocolo.
-- Não expõe telefone, e-mail, briefing ou arquivos.
create or replace function public.get_project_tracking(p_project_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project public.projects%rowtype;
  v_timeline jsonb;
begin
  select * into v_project
  from public.projects
  where upper(project_code) = upper(trim(p_project_code))
  limit 1;

  if not found then
    return null;
  end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', t.id,
        'title', t.title,
        'description', t.description,
        'status', t.status,
        'progress', t.progress,
        'created_at', t.created_at
      ) order by t.created_at desc
    ),
    '[]'::jsonb
  ) into v_timeline
  from public.project_timeline t
  where t.project_id = v_project.id
    and t.visible_to_client = true;

  return jsonb_build_object(
    'project_code', v_project.project_code,
    'company_name', v_project.company_name,
    'segment', v_project.segment,
    'status', coalesce(v_project.status, 'novo'),
    'status_label', public.orion_status_label(v_project.status),
    'progress', coalesce(v_project.progress, public.orion_status_progress(v_project.status)),
    'next_step', v_project.next_step,
    'created_at', v_project.created_at,
    'updated_at', coalesce(v_project.status_updated_at, v_project.updated_at, v_project.created_at),
    'timeline', v_timeline
  );
end;
$$;

revoke all on function public.get_project_tracking(text) from public;
grant execute on function public.get_project_tracking(text) to anon, authenticated;

-- 7. Ajusta projetos antigos sem apagar dados.
update public.projects
set status = coalesce(nullif(status, ''), 'novo'),
    progress = public.orion_status_progress(coalesce(nullif(status, ''), 'novo')),
    status_updated_at = coalesce(updated_at, created_at, now());

insert into public.project_timeline (
  project_id, event_type, title, description, status, progress, visible_to_client
)
select
  p.id,
  'created',
  'Projeto importado para o acompanhamento',
  'Projeto existente incorporado à estrutura Orion V3.4.',
  p.status,
  p.progress,
  true
from public.projects p
where not exists (
  select 1 from public.project_timeline t where t.project_id = p.id
);

commit;
