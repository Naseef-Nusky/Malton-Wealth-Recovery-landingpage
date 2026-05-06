<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as PhpMailerException;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => 'Method not allowed.',
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput ?: '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => 'Invalid request payload.',
    ]);
    exit;
}

function get_field(array $source, string $key): string
{
    $value = $source[$key] ?? '';
    return trim((string) $value);
}

$fullName = get_field($data, 'fullName');
$mobile = get_field($data, 'mobile');
$email = get_field($data, 'email');
$amountLost = get_field($data, 'amountLost');
$scamType = get_field($data, 'scamType');

if ($fullName === '' || $mobile === '' || $email === '' || $amountLost === '' || $scamType === '') {
    http_response_code(422);
    echo json_encode([
        'ok' => false,
        'message' => 'Please complete all required fields.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'ok' => false,
        'message' => 'Please provide a valid email address.',
    ]);
    exit;
}

$subject = 'New enquiry from website contact form';

$plainBody = implode("\n", [
    'A new enquiry was submitted on the Malton Wealth Recovery website.',
    '',
    'Full name: ' . $fullName,
    'Mobile number: ' . $mobile,
    'Email address: ' . $email,
    'Approximate amount lost: ' . $amountLost,
    'Type of scam: ' . $scamType,
    '',
    'Submitted at: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

$safeReplyTo = preg_replace('/[\r\n]+/', '', $email);

$baseDir = __DIR__;
$mailAutoload = $baseDir . '/mail-autoload.php';
$smtpSecret = $baseDir . '/smtp.secret.php';

if (is_file($mailAutoload) && is_file($smtpSecret)) {
    /** @var array<string, mixed> $cfg */
    $cfg = require $smtpSecret;

    $requiredKeys = ['smtp_host', 'smtp_port', 'smtp_secure', 'smtp_username', 'smtp_password', 'mail_from_email', 'mail_from_name', 'mail_to_email'];
    foreach ($requiredKeys as $key) {
        if (!isset($cfg[$key]) || (is_string($cfg[$key]) && trim($cfg[$key]) === '')) {
            http_response_code(500);
            echo json_encode([
                'ok' => false,
                'message' => 'SMTP configuration is incomplete on the server.',
            ]);
            exit;
        }
    }

    require_once $mailAutoload;

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = (string) $cfg['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = (string) $cfg['smtp_username'];
        $mail->Password = (string) $cfg['smtp_password'];
        $mail->Port = (int) $cfg['smtp_port'];

        $secure = strtolower((string) $cfg['smtp_secure']);
        if ($secure === 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }

        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->setFrom((string) $cfg['mail_from_email'], (string) $cfg['mail_from_name']);
        $mail->addAddress((string) $cfg['mail_to_email']);
        $mail->addReplyTo($safeReplyTo, $fullName);

        $mail->Subject = $subject;
        $mail->Body = $plainBody;

        $mail->send();

        echo json_encode([
            'ok' => true,
            'message' => 'Enquiry sent successfully.',
        ]);
        exit;
    } catch (PhpMailerException $e) {
        http_response_code(500);
        echo json_encode([
            'ok' => false,
            'message' => 'Unable to send email via SMTP. Check server SMTP settings.',
        ]);
        exit;
    }
}

/** Fallback only if mail-autoload.php + smtp.secret.php are missing (not recommended). */
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Malton Wealth Recovery <info@maltonwealthrecovery.com>',
    'Reply-To: ' . $safeReplyTo,
    'X-Mailer: PHP/' . phpversion(),
];

$sentLegacy = mail('naseefnusky09@gmail.com', $subject, $plainBody, implode("\r\n", $headers));

if (!$sentLegacy) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'Email is not configured. Add mail-autoload.php, PHPMailer PHP files, and smtp.secret.php next to contact.php.',
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Enquiry sent successfully.',
]);
