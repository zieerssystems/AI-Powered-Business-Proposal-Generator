<?php
// Enable full error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS and headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Include Composer autoloader
require 'vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad(); // Use safeLoad to avoid errors if .env doesn't exist

// Get Gemini API Key from environment variable
$apiKey = $_ENV['GEMINI_API_KEY'];
if (empty($apiKey)) {
    echo json_encode(['success' => false, 'message' => 'Gemini API key not found in environment variables.']);
    exit;
}

// Get request data
$data = json_decode(file_get_contents("php://input"), true);

// Check if data was received
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received for proposal generation.']);
    exit;
}

// Extract relevant data for the prompt
$projectName = $data['projectName'] ?? '';
$projectRequirements = $data['projectRequirements'] ?? '';
$clientName = $data['clientName'] ?? '';
$problemStatement = $data['problemStatement'] ?? '';
$proposedSolution = $data['proposedSolution'] ?? '';
$servicesOffered = $data['servicesOffered'] ?? [];
$pricingDetails = $data['pricingDetails'] ?? '';
$timelineDetails = $data['timelineDetails'] ?? '';
$additionalNotes = $data['additionalNotes'] ?? '';

// Construct the prompt for Gemini
$prompt = "Generate a comprehensive business proposal for the project: \"{$projectName}\". ";
$prompt .= "The key requirements for this project are: \"{$projectRequirements}\". ";
$prompt .= "The client is \"{$clientName}\". ";
if (!empty($problemStatement)) $prompt .= "The problem statement is: \"{$problemStatement}\". ";
if (!empty($proposedSolution)) $prompt .= "The proposed solution is: \"{$proposedSolution}\". ";
if (!empty($servicesOffered)) $prompt .= "The services offered are: " . implode(', ', $servicesOffered) . ". ";
if (!empty($pricingDetails)) $prompt .= "Pricing details: \"{$pricingDetails}\". ";
if (!empty($timelineDetails)) $prompt .= "Timeline details: \"{$timelineDetails}\". ";
if (!empty($additionalNotes)) $prompt .= "Additional notes: \"{$additionalNotes}\". ";
$prompt .= "Structure the proposal with clear headings (e.g., Introduction, Project Overview, Requirements Analysis, Proposed Solution, Services Offered, Pricing, Timeline, Conclusion). Ensure the proposal directly addresses the stated requirements and provides a compelling case for your solution.";

// Log the prompt
file_put_contents("proposal_log.txt", "PROMPT: " . $prompt . PHP_EOL, FILE_APPEND);

try {
    // Initialize the Generative Model
    $genAI = new \Google\Cloud\GenerativeAI\GenerativeModel($apiKey);
    $model = $genAI->getGenerativeModel('gemini-pro'); // Or your preferred model

    // Generate content
    $response = $model->generateContent($prompt);
    $proposalText = '';
    foreach ($response->candidates as $candidate) {
        foreach ($candidate->content->parts as $part) {
            $proposalText .= $part->text;
        }
    }

    // Log the successful response
    file_put_contents("proposal_log.txt", "GEMINI API RESPONSE: " . json_encode($response) . PHP_EOL, FILE_APPEND);
    echo json_encode(['success' => true, 'proposal' => $proposalText]);

} catch (\Google\ApiCore\ApiException $e) {
    // Log Gemini API errors
    file_put_contents("proposal_log.txt", "GEMINI API ERROR: " . $e->getMessage() . PHP_EOL, FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Gemini API Error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Log other server errors
    file_put_contents("proposal_log.txt", "SERVER ERROR: " . $e->getMessage() . PHP_EOL, FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Server Error during proposal generation: ' . $e->getMessage()]);
}
?>