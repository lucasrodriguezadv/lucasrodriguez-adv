import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, email, telefone, assunto, horario, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios: nome, email e mensagem' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save lead to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: lead, error: dbError } = await supabase
      .from('contact_leads')
      .insert({
        nome,
        email,
        telefone: telefone || null,
        assunto: assunto || null,
        horario: horario || null,
        mensagem,
        email_sent: false,
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
    }

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const CONTACT_FROM_EMAIL = Deno.env.get('CONTACT_FROM_EMAIL') ?? 'Lucas Rodriguez Advocacia <contato@lucasrodriguez.adv.br>';
    const CONTACT_TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') ?? 'contato@lucasrodriguez.adv.br';

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Configuração de e-mail ausente' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const assuntoMap: Record<string, string> = {
      criminal: 'Advocacia Criminal',
      consumidor: 'Direito do Consumidor',
      familia: 'Direito de Família',
      imobiliario: 'Direito Imobiliário',
      consultoria: 'Consultoria Jurídica',
      outro: 'Outro',
    };

    const htmlBody = `
      <h2>Novo lead do site – Lucas Rodriguez Advocacia</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nome</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(nome)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-mail</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefone</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(telefone || 'Não informado')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Assunto</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(assuntoMap[assunto] || assunto || 'Não informado')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Horário preferido</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(horario || 'Não informado')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Mensagem</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(mensagem)}</td></tr>
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        subject: `Novo contato: ${nome} – ${assuntoMap[assunto] || 'Site'}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(
        JSON.stringify({ error: 'Falha ao enviar e-mail', details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update email_sent status
    if (!dbError && lead?.id) {
      await supabase
        .from('contact_leads')
        .update({ email_sent: true })
        .eq('id', lead.id);
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
