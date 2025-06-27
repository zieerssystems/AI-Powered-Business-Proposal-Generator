<?php
// 1. Enable full error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 2. CORS & JSON headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 3. Include your database connection (defines $conn as a mysqli instance)
include 'db.php';

// 4. Read & log the raw request for debugging
$raw = file_get_contents('php://input');
file_put_contents('reset_debug.txt', date('c') . " RAW_INPUT: " . $raw . "\n", FILE_APPEND);

// 5. Decode JSON
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit;
}

// 6. Extract and trim inputs
$email       = trim((string)($data['email']       ?? ''));
$otp         = trim((string)($data['otp']         ?? ''));
$newPassword =         ($data['new_password']     ?? '');

if (!$email || !$otp || !$newPassword) {
    echo json_encode([
        'success' => false,
        'message' => 'Email, OTP and new password are all required.'
    ]);
    exit;
}

try {
    // 7. Look up the stored OTP
    $stmt = $conn->prepare("SELECT otp FROM users WHERE email = ?");
    if (!$stmt) {
        throw new Exception("Prepare failed (SELECT): " . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'No such user']);
        exit;
    }
    $row = $res->fetch_assoc();
    $storedOtp   = trim((string)$row['otp']);
    $providedOtp = $otp;

    // 8. Debug log both values
    error_log("DEBUG OTP — stored: '{$storedOtp}', provided: '{$providedOtp}'");

    if ($storedOtp !== $providedOtp) {
        echo json_encode([
            'success' => false,
            'message' => "Invalid OTP (you sent '{$providedOtp}', expected '{$storedOtp}')"
        ]);
        exit;
    }

    // 9. Hash the new password
    $hash = password_hash($newPassword, PASSWORD_DEFAULT);
    if ($hash === false) {
        throw new Exception("Password hashing failed");
    }

    // 10. Update password and clear OTP
    $stmt = $conn->prepare("UPDATE users SET password = ?, otp = NULL WHERE email = ?");
    if (!$stmt) {
        throw new Exception("Prepare failed (UPDATE): " . $conn->error);
    }
    $stmt->bind_param("ss", $hash, $email);
    $stmt->execute();

    // 11. Success response
    echo json_encode(['success' => true, 'message' => 'Password reset successfully']);
} catch (Exception $e) {
    // 12. Return detailed error for debugging
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
