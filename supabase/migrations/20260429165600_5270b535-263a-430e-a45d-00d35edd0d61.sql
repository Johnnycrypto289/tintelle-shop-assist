create table public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'footer',
  created_at timestamptz not null default now(),
  unique (email)
);

alter table public.newsletter_signups enable row level security;

create policy "Anyone can subscribe"
  on public.newsletter_signups
  for insert
  to anon, authenticated
  with check (true);
