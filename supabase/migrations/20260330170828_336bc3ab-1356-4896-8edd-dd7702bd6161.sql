
CREATE TABLE public.contact_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  assunto TEXT,
  horario TEXT,
  mensagem TEXT NOT NULL,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow the edge function (service role) to insert leads
CREATE POLICY "Service role can insert contact leads"
  ON public.contact_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role to read all leads
CREATE POLICY "Service role can read contact leads"
  ON public.contact_leads
  FOR SELECT
  TO service_role
  USING (true);

-- Allow anon users to insert (from the frontend)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
