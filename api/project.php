<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// DB connection
$conn = new mysqli("localhost", "root", "", "bizdb");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get raw input
$data = json_decode(file_get_contents("php://input"), true);

// Sanitize input
$id = $data['id'] ?? '';
$title = trim($data['title'] ?? '');
$description = trim($data['description'] ?? '');
$email = trim($data['email'] ?? '');
$clientName = trim($data['clientName'] ?? '');
$clientEmail = trim($data['clientEmail'] ?? '');
$projectCost = trim($data['projectCost'] ?? '');
$currency = trim($data['currency'] ?? 'USD');
$projectSchedule = trim($data['projectSchedule'] ?? '');

// Validate required fields
if (empty($title) || empty($description) || empty($email)) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

if (!empty($id)) {
    // UPDATE existing project
    $stmt = $conn->prepare("UPDATE projects SET title = ?, description = ?, clientName = ?, clientEmail = ?, projectCost = ?, currency = ?, projectSchedule = ? WHERE id = ? AND email = ?");
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Prepare failed (UPDATE): " . $conn->error]);
        exit;
    }
    $stmt->bind_param("sssssssis", $title, $description, $clientName, $clientEmail, $projectCost, $currency, $projectSchedule, $id, $email);
    $action = "UPDATE";
} else {
    // INSERT new project
    $stmt = $conn->prepare("INSERT INTO projects (title, description, email, clientName, clientEmail, projectCost, currency, projectSchedule) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Prepare failed (INSERT): " . $conn->error]);
        exit;
    }
    $stmt->bind_param("ssssssss", $title, $description, $email, $clientName, $clientEmail, $projectCost, $currency, $projectSchedule);
    $action = "INSERT";
}

// Execute query
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => $action === "INSERT" ? "Project added!" : "Project updated!"]);
} else {
    echo json_encode(["success" => false, "message" => "Execution failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
