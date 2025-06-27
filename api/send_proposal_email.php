<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

$email = $data['email'] ?? '';
$subject = $data['subject'] ?? 'Project Proposal';
$message = $data['message'] ?? '';
$attachmentBase64 = $data['attachment'] ?? '';
$filename = $data['filename'] ?? 'proposal.pdf';

if (empty($email) || empty($message) || empty($attachmentBase64)) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Strip prefix if present
if (strpos($attachmentBase64, 'base64,') !== false) {
    $attachmentBase64 = explode('base64,', $attachmentBase64)[1];
}

$pdfBinary = base64_decode($attachmentBase64);

if ($pdfBinary === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to decode PDF']);
    exit;
}

// ✅ Write to temp file
$tempFile = 'temp_proposal.pdf';
file_put_contents($tempFile, $pdfBinary);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'joyce6th23@gmail.com';
    $mail->Password = 'mfwunelbhwfihotz'; // App Password only
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('joyce6th23@gmail.com', 'Zieers');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = nl2br($message);

    // ✅ Attach the file
    $mail->addAttachment($tempFile, $filename);

    $mail->send();

    // ✅ Delete temp file
    unlink($tempFile);

    echo json_encode(['success' => true, 'message' => '✅ Email sent successfully!']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
}
