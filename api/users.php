<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "db.php";

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//require 'PHPMailer/src/Exception.php';
//require 'PHPMailer/src/PHPMailer.php';
//require 'PHPMailer/src/SMTP.php';



$data = json_decode(file_get_contents("php://input"));

if (!isset($data->action)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$action = $data->action;

// === REGISTER ===
if ($action === "register") {
    if (!empty($data->fullName) && !empty($data->email) && !empty($data->password)) {
        echo json_encode(registerUser($data->fullName, $data->email, $data->password));
    } else {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
    }
}
// === LOGIN ===
elseif ($action === "login") {
    if (!empty($data->email) && !empty($data->password)) {
        echo json_encode(loginUser($data->email, $data->password));
    } else {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
    }
}
// === FORGOT PASSWORD ===
elseif ($action === "forgot_password") {
    if (!empty($data->email)) {
        echo json_encode(forgotPassword($data->email));
    } else {
        echo json_encode(["success" => false, "message" => "Email is required"]);
    }
}
// === SEND OTP ===
elseif ($action === "send_otp") {
    if (!empty($data->email)) {
        echo json_encode(sendOTP($data->email));
    } else {
        echo json_encode(["success" => false, "message" => "Email is required"]);
    }
}
// === INVALID ACTION ===
else {
    echo json_encode(["success" => false, "message" => "Invalid action"]);
}

function sendOTP($email) {
    $otp = rand(100000, 999999);
    file_put_contents("otp_{$email}.txt", $otp);

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com';  // <-- Change this
        $mail->Password = 'your-app-password';     // <-- Change this
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('your-email@gmail.com', 'AI Marketing App'); // <-- Change this
        $mail->addAddress($email);
        $mail->Subject = 'Your OTP Code';
        $mail->Body    = "Your OTP is: $otp";

        $mail->send();
        return ["success" => true, "message" => "OTP sent to your email."];
    } catch (Exception $e) {
        return ["success" => false, "message" => "Email sending failed: " . $mail->ErrorInfo];
    }
}
?>
