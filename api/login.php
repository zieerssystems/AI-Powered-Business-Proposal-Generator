<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

// Validate request
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Username and password are required"]);
    exit();
}

$username = $data['username'];
$password = $data['password'];

// Prevent SQL Injection
$username = mysqli_real_escape_string($conn, $username);
$password = mysqli_real_escape_string($conn, $password);

$query = "SELECT * FROM users WHERE username='$username'";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Database query failed"]);
    exit();
}

if ($row = mysqli_fetch_assoc($result)) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true,"name" =>$row['name'], "message" => "Login Successful"]);
        
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect Password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User Not Found"]);
}

mysqli_close($conn);
?>
