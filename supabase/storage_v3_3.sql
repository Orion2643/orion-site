-- Orion V3.3 - Storage de imagens do Portal do Cliente
-- Execute uma única vez no SQL Editor do Supabase.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-assets',
  'project-assets',
  false,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- O Portal é público: permite somente o envio de imagens para este bucket privado.
drop policy if exists "portal_upload_project_assets" on storage.objects;
create policy "portal_upload_project_assets"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'project-assets'
  and (storage.foldername(name))[1] like 'ORION-%'
  and (storage.foldername(name))[2] in ('logo', 'fachada', 'galeria')
);

-- Somente o administrador autenticado consegue listar, visualizar e baixar.
drop policy if exists "admin_read_project_assets" on storage.objects;
create policy "admin_read_project_assets"
on storage.objects
for select
to authenticated
using (bucket_id = 'project-assets');

-- Preparação para a futura função Arquivar Projeto.
drop policy if exists "admin_delete_project_assets" on storage.objects;
create policy "admin_delete_project_assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-assets');
