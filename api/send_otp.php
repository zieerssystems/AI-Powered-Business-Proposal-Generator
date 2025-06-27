<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'db.php'; // ✅ Include your database connection

// Get input from React
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';

if (empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

// Generate a 6-digit OTP
$otp = rand(100000, 999999);

// ✅ Save OTP to database
$stmt = $conn->prepare("UPDATE users SET otp = ? WHERE email = ?");
if (!$stmt) {
    error_log("DB Error: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Server error. Try again later.']);
    exit;
}
$stmt->bind_param("ss", $otp, $email);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Email not found in database']);
    exit;
}

// ✅ Send OTP by email
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'joyce6th23@gmail.com'; // your Gmail
    $mail->Password = 'mfwunelbhwfihotz';     // app password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('joyce6th23@gmail.com', 'Zieers');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Your OTP Code';
    $mail->Body    = "Your OTP code is <b>$otp</b>";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'OTP sent successfully']);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode(['success' => false, 'message' => 'Failed to send OTP']);
}
