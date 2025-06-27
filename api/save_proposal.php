<?php
header("Content-Type: application/json");

// Enable error reporting (for development)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

$projectName = $data["project_name"] ?? "";
$requirements = $data["requirements"] ?? "";

if (!$projectName || !$requirements) {
  echo json_encode(["success" => false, "message" => "Missing project name or requirements."]);
  exit;
}

// Your Gemini API key (✅ Your given key)
$apiKey = "AIzaSyBgF8MSv_-m9gTxfYDyIq6Z07nlM4JrJZU";
$model = "gemini-pro";
$url = "https://generativelanguage.googleapis.com/v1beta/models/$model:generateContent?key=$apiKey";

// Build the prompt
$prompt = "Generate a formal business proposal based on the following details:

Project Name: $projectName
Requirements: $requirements

The proposal should include an introduction, objectives, deliverables, and a conclusion.";

// Gemini API request payload
$payload = json_encode([
  "contents" => [[
    "parts" => [[
      "text" => $prompt
    ]]
  ]]
]);

// Set up cURL request
$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_SSL_VERIFYHOST => false,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if (!$response || $httpCode !== 200) {
  echo json_encode(["success" => false, "message" => "Gemini API call failed with status $httpCode."]);
  exit;
}

$result = json_decode($response, true);
$proposal = $result["candidates"][0]["content"]["parts"][0]["text"] ?? "";

if ($proposal) {
  echo json_encode(["success" => true, "proposal" => $proposal]);
} else {
  echo json_encode(["success" => false, "message" => "No response from Gemini."]);
}
