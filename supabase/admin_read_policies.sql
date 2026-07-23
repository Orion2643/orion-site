-- Orion Admin V3.1 - leitura protegida por autenticação
-- Execute este arquivo no SQL Editor do Supabase uma única vez.

alter table public.projects enable row level security;
alter table public.briefings enable row level security;
alter table public.project_files enable row level security;

drop policy if exists "orion_admin_read_projects" on public.projects;
create policy "orion_admin_read_projects"
on public.projects
for select
to authenticated
using (true);

drop policy if exists "orion_admin_read_briefings" on public.briefings;
create policy "orion_admin_read_briefings"
on public.briefings
for select
to authenticated
using (true);

drop policy if exists "orion_admin_read_project_files" on public.project_files;
create policy "orion_admin_read_project_files"
on public.project_files
for select
to authenticated
using (true);
