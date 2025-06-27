<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS and content type headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Create DB connection
$conn = new mysqli("localhost", "root", "", "bizdb");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Handle OPTIONS (preflight request for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // --- FETCH PROJECTS BY EMAIL ---
    $email = $_GET['email'] ?? '';
    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Email is required"]);
        exit;
    }

    // Get full project info
    $stmt = $conn->prepare("SELECT id, title, description, email, clientName, clientEmail, projectCost, currency, projectSchedule FROM projects WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    $projects = [];
    while ($row = $result->fetch_assoc()) {
        $projects[] = $row;
    }

    echo json_encode(["success" => true, "projects" => $projects]);
    $stmt->close();

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // --- DELETE PROJECT BY ID ---
    $id = $_POST['id'] ?? null;
    if (!$id) {
        echo json_encode(["success" => false, "message" => "Project ID is required for deletion"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Project deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Project not found or already deleted"]);
    }

    $stmt->close();

} else {
    // Invalid request method
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
