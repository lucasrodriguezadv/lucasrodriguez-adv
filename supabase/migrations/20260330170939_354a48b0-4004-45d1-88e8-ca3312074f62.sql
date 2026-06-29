
CREATE POLICY "Service role can update contact leads"
  ON public.contact_leads
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
