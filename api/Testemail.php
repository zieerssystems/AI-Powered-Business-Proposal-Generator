<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yourgmail@gmail.com';
    $mail->Password   = 'your-app-password';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('yourgmail@gmail.com', 'Test Mail');
    $mail->addAddress('your-email@example.com');
    $mail->isHTML(true);
    $mail->Subject = 'Test Email';
    $mail->Body    = '<p>This is a test email.</p>';

    $mail->send();
    echo "Test mail sent successfully.";
} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}
