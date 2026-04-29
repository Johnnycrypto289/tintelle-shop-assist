drop policy "Anyone can subscribe" on public.newsletter_signups;
-- No policies for anon/authenticated => only service_role (edge functions) can insert/read.
