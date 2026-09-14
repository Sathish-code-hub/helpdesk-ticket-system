<?php
// Explicitly list PUT and OPTIONS alongside GET and POST to clear browser CORS rules
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS requests gracefully (Browsers send this before a PUT request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Your existing port 3307 connection code below...
$host = 'ticket-db-cloud-sathisathish1530-2866.l.aivencloud.com';
$dbname = 'defaultdb';
$username = 'avnadmin';
$password = 'AVNS_7tlQymlyus6CH4gnzQW';
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}
?>
