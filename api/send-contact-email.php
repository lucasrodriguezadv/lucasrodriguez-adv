<?php
declare(strict_types=1);

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Metodo nao permitido.']);
}

$privateConfigCandidates = [
    dirname(__DIR__, 4) . '/private/contact-config.php',
    dirname(__DIR__, 2) . '/private/contact-config.php',
];

foreach ($privateConfigCandidates as $privateConfig) {
    if (is_file($privateConfig)) {
        require $privateConfig;
        break;
    }
}

$rawBody = file_get_contents('php://input') ?: '';
$body = json_decode($rawBody, true);
if (!is_array($body)) {
    json_response(400, ['error' => 'JSON invalido.']);
}

if (clean($body['website'] ?? '') !== '') {
    json_response(200, ['ok' => true]);
}

$assuntoLabels = [
    'imobiliario' => 'Direito Imobiliario',
    'familia' => 'Familia e Sucessoes',
    'criminal' => 'Direito Penal',
    'consumidor' => 'Direito do Consumidor',
    'outro' => 'Outro',
];

$payload = [
    'nome' => clean($body['nome'] ?? '', 140),
    'email' => strtolower(clean($body['email'] ?? '', 180)),
    'telefone' => clean($body['telefone'] ?? '', 80),
    'assunto' => clean($body['assunto'] ?? '', 80),
    'horario' => clean($body['horario'] ?? '', 120),
    'mensagem' => clean_multiline($body['mensagem'] ?? '', 4000),
];
$payload['assuntoLabel'] = $assuntoLabels[$payload['assunto']] ?? 'Nao informado';

if ($payload['nome'] === '' || $payload['email'] === '' || $payload['mensagem'] === '') {
    json_response(400, ['error' => 'Nome, e-mail e mensagem sao obrigatorios.']);
}

if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    json_response(400, ['error' => 'E-mail invalido.']);
}

$resendApiKey = config_value('RESEND_API_KEY');
if ($resendApiKey === '') {
    json_response(500, ['error' => 'Servico de e-mail nao configurado.']);
}

$from = config_value('CONTACT_FROM_EMAIL', 'Lucas Rodriguez Advocacia <contato@lucasrodriguez.adv.br>');
$to = config_value('CONTACT_TO_EMAIL', 'contato@lucasrodriguez.adv.br');
$subject = 'Contato pelo site - ' . $payload['nome'];

$emailPayload = [
    'from' => $from,
    'to' => $to,
    'reply_to' => $payload['email'],
    'subject' => $subject,
    'text' => build_text_email($payload),
    'html' => build_html_email($payload),
];

$ch = curl_init(RESEND_ENDPOINT);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($emailPayload, JSON_UNESCAPED_SLASHES),
    CURLOPT_TIMEOUT => 15,
]);

$responseBody = curl_exec($ch);
$statusCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($responseBody === false || $statusCode < 200 || $statusCode >= 300) {
    error_log('Resend contact error: HTTP ' . $statusCode . ' ' . $curlError . ' ' . (string) $responseBody);
    json_response(502, ['error' => 'Nao foi possivel enviar a mensagem agora.']);
}

json_response(200, ['ok' => true]);

function json_response(int $statusCode, array $body): void
{
    http_response_code($statusCode);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function config_value(string $key, string $default = ''): string
{
    if (defined($key)) {
        return (string) constant($key);
    }

    $value = getenv($key);
    if ($value !== false && $value !== '') {
        return (string) $value;
    }

    return $default;
}

function clean(mixed $value, int $maxLength = 1200): string
{
    $cleaned = preg_replace('/\s+/', ' ', (string) ($value ?? '')) ?? '';
    return truncate_text(trim($cleaned), $maxLength);
}

function clean_multiline(mixed $value, int $maxLength = 4000): string
{
    $cleaned = str_replace("\r", '', (string) ($value ?? ''));
    return truncate_text(trim($cleaned), $maxLength);
}

function truncate_text(string $value, int $maxLength): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }

    return substr($value, 0, $maxLength);
}

function build_text_email(array $payload): string
{
    return implode("\n", [
        'Novo contato pelo site Lucas Rodriguez Advocacia',
        '',
        'Nome: ' . $payload['nome'],
        'E-mail: ' . $payload['email'],
        'Telefone: ' . ($payload['telefone'] ?: 'Nao informado'),
        'Assunto: ' . $payload['assuntoLabel'],
        'Horario preferido: ' . ($payload['horario'] ?: 'Nao informado'),
        '',
        'Mensagem:',
        $payload['mensagem'],
    ]);
}

function build_html_email(array $payload): string
{
    $fields = [
        ['Nome', $payload['nome']],
        ['E-mail', $payload['email']],
        ['Telefone', $payload['telefone'] ?: 'Nao informado'],
        ['Assunto', $payload['assuntoLabel']],
        ['Horario preferido', $payload['horario'] ?: 'Nao informado'],
    ];

    $rows = '';
    foreach ($fields as [$label, $value]) {
        $rows .= '<tr>'
            . '<td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:700;width:180px">' . html_escape($label) . '</td>'
            . '<td style="padding:8px 12px;border:1px solid #e5e7eb">' . html_escape($value) . '</td>'
            . '</tr>';
    }

    return '<div style="font-family:Arial,sans-serif;color:#101828;line-height:1.5">'
        . '<h2 style="margin:0 0 16px;color:#071629">Novo contato pelo site</h2>'
        . '<table style="border-collapse:collapse;width:100%;max-width:680px">' . $rows . '</table>'
        . '<h3 style="margin:24px 0 8px;color:#071629">Mensagem</h3>'
        . '<div style="white-space:pre-wrap;border:1px solid #e5e7eb;background:#f9fafb;padding:16px;border-radius:8px">' . html_escape($payload['mensagem']) . '</div>'
        . '</div>';
}

function html_escape(mixed $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
