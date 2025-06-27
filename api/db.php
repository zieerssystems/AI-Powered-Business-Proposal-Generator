<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "bizdb";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Function to register a user
function registerUser($name, $email, $password)
{
    global $conn;

    // Check if email already exists
    $checkEmail = $conn->query("SELECT id FROM users WHERE email='$email'");
    if ($checkEmail->num_rows > 0) {
        return ["success" => false, "message" => "Email already registered"];
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";

    if ($conn->query($query) === TRUE) {
        return ["success" => true, "message" => "User registered successfully"];
    } else {
        return ["success" => false, "message" => "Error: " . $conn->error];
    }
}

// Function to login a user
function loginUser($email, $password)
{
    global $conn;

    $query = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            return [
                "success" => true, 
                "message" => "Login Successful",
                "name" => $user['name'] // ✅ Return the username
            ];
        } else {
            return ["success" => false, "message" => "Incorrect password"];
        }
    } else {
        return ["success" => false, "message" => "User not found"];
    }
}

// Function to handle forgot password
function forgotPassword($email)
{
    global $conn;

    $query = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        return ["success" => true, "message" => "Password reset link sent to email"];
    } else {
        return ["success" => false, "message" => "User not found"];
    }
}
?>
