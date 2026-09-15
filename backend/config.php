<?php
// Explicitly list PUT and OPTIONS alongside GET and POST to clear browser CORS rules
header("Access-Control-Allow-Origin: *");
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
    // UNIVERSAL SSL BYPASS: We tell PDO to connect without strictly verifying the server certificate
    $pdo = new PDO(
    "mysql:host=$host;dbname=$dbname;charset=utf8",
    $username,
    $password,
    [
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]
);
} catch (PDOException $e) {
    // Returns the exact database error to the browser screen so we can see it clearly
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}
?>
