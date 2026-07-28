-- ============================================================
-- ORION V11.2 — PROTOCOLOS ALEATÓRIOS E NÃO SEQUENCIAIS
-- Execute uma única vez no SQL Editor do Supabase.
--
-- Novo padrão: ORION-K7M4Q9
-- - não revela a quantidade de projetos cadastrados;
-- - usa seis caracteres aleatórios em letras maiúsculas e números;
-- - evita caracteres visualmente ambíguos (0, O, 1 e I);
-- - verifica colisão antes de concluir o INSERT.
-- ============================================================

begin;

create extension if not exists pgcrypto;

create unique index if not exists projects_project_code_unique_idx
  on public.projects (upper(project_code));

create or replace function public.orion_generate_random_project_code()
returns text
language plpgsql
volatile
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
      substr(v_alphabet, 1 + (get_byte(gen_random_bytes(1), 0) % length(v_alphabet)), 1),
      ''
    )
    into v_code
    from generate_series(1, 6);

    exit when not exists (
      select 1
      from public.projects
      where upper(project_code) = upper(v_code)
    );

    if v_attempt >= 50 then
      raise exception 'Não foi possível gerar um protocolo Orion exclusivo.';
    end if;
  end loop;

  return v_code;
end;
$$;

create or replace function public.orion_assign_random_project_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Todos os novos projetos passam a receber o protocolo aleatório.
  -- Projetos antigos permanecem com seus códigos atuais.
  new.project_code := public.orion_generate_random_project_code();
  return new;
end;
$$;

drop trigger if exists trg_orion_random_project_code on public.projects;
create trigger trg_orion_random_project_code
before insert on public.projects
for each row
execute function public.orion_assign_random_project_code();

commit;
