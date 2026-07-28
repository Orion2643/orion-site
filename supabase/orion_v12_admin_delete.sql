-- ORION V12 — exclusão administrativa segura
-- Execute uma vez no SQL Editor do Supabase.
-- Os arquivos do Storage são removidos pela Central Orion antes desta função.

begin;

create or replace function public.orion_delete_project(p_project_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is null then
    raise exception 'Acesso não autorizado.';
  end if;

  if not exists (select 1 from public.projects where id = p_project_id) then
    raise exception 'Projeto não encontrado.';
  end if;

  -- Remove dependências explicitamente para funcionar mesmo em bases antigas
  -- cujas chaves estrangeiras não foram criadas com ON DELETE CASCADE.
  delete from public.project_timeline where project_id = p_project_id;
  delete from public.project_files where project_id = p_project_id;
  delete from public.briefings where project_id = p_project_id;
  delete from public.projects where id = p_project_id;

  return true;
end;
$$;

revoke all on function public.orion_delete_project(uuid) from public, anon;
grant execute on function public.orion_delete_project(uuid) to authenticated;

commit;
