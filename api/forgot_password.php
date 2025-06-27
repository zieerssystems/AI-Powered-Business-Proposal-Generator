<?php
// ✅ CORS and headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Include PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// ✅ DB connection
include("db.php");

// ✅ Read and decode input
$rawInput = file_get_contents("php://input");
file_put_contents("debug.txt", "Raw Input: " . $rawInput . "\n", FILE_APPEND);

$data = json_decode($rawInput, true);
if (!$data || !isset($data['email'])) {
    error_log("Invalid or missing input: $rawInput");
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$email = $data['email'];

// ✅ Check if user exists
$result = $conn->query("SELECT * FROM users WHERE email = '$email'");
if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit;
}

// ✅ Generate OTP
$otp = rand(100000, 999999);

// ✅ Save OTP in database
$conn->query("UPDATE users SET otp = '$otp' WHERE email = '$email'");

// ✅ Send Email
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yourgmail@gmail.com'; // ✅ Replace with your Gmail
    $mail->Password   = 'your-app-password';   // ✅ Use App Password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('yourgmail@gmail.com', 'Your App Name');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Password Reset OTP';
    $mail->Body    = "<p>Your OTP is: <b>$otp</b></p>";

    $mail->send();
    echo json_encode(["success" => true, "message" => "OTP sent to your email"]);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send OTP: " . $mail->ErrorInfo
    ]);
}
?>
