const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.SITE_URL ?? '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const assuntoLabels = {
  imobiliario: 'Direito Imobiliário',
  familia: 'Família e Sucessões',
  criminal: 'Direito Penal',
  consumidor: 'Direito do Consumidor',
  outro: 'Outro',
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  };
}

function clean(value, maxLength = 1200) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function cleanMultiline(value, maxLength = 4000) {
  return String(value ?? '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildTextEmail(payload) {
  return [
    'Novo contato pelo site Lucas Rodriguez Advocacia',
    '',
    `Nome: ${payload.nome}`,
    `E-mail: ${payload.email}`,
    `Telefone: ${payload.telefone || 'Não informado'}`,
    `Assunto: ${payload.assuntoLabel}`,
    `Horário preferido: ${payload.horario || 'Não informado'}`,
    '',
    'Mensagem:',
    payload.mensagem,
  ].join('\n');
}

function buildHtmlEmail(payload) {
  const fields = [
    ['Nome', payload.nome],
    ['E-mail', payload.email],
    ['Telefone', payload.telefone || 'Não informado'],
    ['Assunto', payload.assuntoLabel],
    ['Horário preferido', payload.horario || 'Não informado'],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#101828;line-height:1.5">
      <h2 style="margin:0 0 16px;color:#071629">Novo contato pelo site</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${fields
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:700;width:180px">${escapeHtml(label)}</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
      <h3 style="margin:24px 0 8px;color:#071629">Mensagem</h3>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;background:#f9fafb;padding:16px;border-radius:8px">${escapeHtml(payload.mensagem)}</div>
    </div>
  `;
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Método não permitido.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return jsonResponse(500, { error: 'Serviço de e-mail não configurado.' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { error: 'JSON inválido.' });
  }

  if (clean(body.website)) {
    return jsonResponse(200, { ok: true });
  }

  const payload = {
    nome: clean(body.nome, 140),
    email: clean(body.email, 180).toLowerCase(),
    telefone: clean(body.telefone, 80),
    assunto: clean(body.assunto, 80),
    horario: clean(body.horario, 120),
    mensagem: cleanMultiline(body.mensagem, 4000),
  };

  payload.assuntoLabel = assuntoLabels[payload.assunto] ?? 'Não informado';

  if (!payload.nome || !payload.email || !payload.mensagem) {
    return jsonResponse(400, { error: 'Nome, e-mail e mensagem são obrigatórios.' });
  }

  if (!isEmail(payload.email)) {
    return jsonResponse(400, { error: 'E-mail inválido.' });
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? 'Lucas Rodriguez Advocacia <contato@lucasrodriguez.adv.br>';
  const to = process.env.CONTACT_TO_EMAIL ?? 'contato@lucasrodriguez.adv.br';
  const subject = `Contato pelo site - ${payload.nome}`;

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject,
      text: buildTextEmail(payload),
      html: buildHtmlEmail(payload),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend error:', detail);
    return jsonResponse(502, { error: 'Não foi possível enviar a mensagem agora.' });
  }

  return jsonResponse(200, { ok: true });
}
