-- ORION V11.3 — correção do protocolo aleatório
-- Execute no SQL Editor do Supabase. É idempotente e preserva dados existentes.
begin;

create unique index if not exists projects_project_code_unique_idx
  on public.projects (upper(project_code));

create or replace function public.orion_generate_random_project_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
  v_token text;
  v_attempt integer := 0;
begin
  loop
    v_attempt := v_attempt + 1;
    -- Não depende de pgcrypto ou do schema extensions.
    v_token := upper(substr(md5(random()::text || clock_timestamp()::text || v_attempt::text), 1, 6));
    v_token := translate(v_token, '01OIL', '23457');
    v_code := 'ORION-' || v_token;

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

create or replace function public.orion_assign_random_project_code()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.project_code := public.orion_generate_random_project_code();
  return new;
end;
$$;

drop trigger if exists trg_orion_random_project_code on public.projects;
create trigger trg_orion_random_project_code
before insert on public.projects
for each row execute function public.orion_assign_random_project_code();

commit;
