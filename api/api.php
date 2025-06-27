<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Get POST data from frontend
$data = json_decode(file_get_contents("php://input"));

// Include your DB connection
include 'db.php'; // make sure db.php has `$conn` variable

// Validate input
if (!isset($data->action)) {
    echo json_encode(['success' => false, 'message' => 'Action not specified']);
    exit;
}

$action = $data->action;

if ($action === 'forgot_password') {
    $email = $data->email;

    // Generate 6-digit OTP
    $otp = rand(100000, 999999);

    // Save OTP to database (assuming your users table has an `otp` column)
    $query = "UPDATE users SET otp = '$otp' WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_affected_rows($conn) > 0) {
        // Send OTP via email
        $subject = "Your OTP Code";
        $message = "Your OTP code is: $otp";
        $headers = "From: noreply@yourdomain.com";

        if (mail($email, $subject, $message, $headers)) {
            echo json_encode(['success' => true, 'message' => 'OTP sent to your email']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send OTP email']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Email not found']);
    }
}

elseif ($action === 'reset_password') {
    $email = $data->email;
    $otp = $data->otp;
    $new_password = password_hash($data->new_password, PASSWORD_DEFAULT);

    // Check OTP
    $check = "SELECT * FROM users WHERE email = '$email' AND otp = '$otp'";
    $res = mysqli_query($conn, $check);

    if (mysqli_num_rows($res) > 0) {
        // Update password and clear OTP
        $update = "UPDATE users SET password = '$new_password', otp = NULL WHERE email = '$email'";
        if (mysqli_query($conn, $update)) {
            echo json_encode(['success' => true, 'message' => 'Password reset successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to reset password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid OTP']);
    }
}
?>
