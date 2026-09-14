<?php
require 'config.php';

// Grab the raw JSON input data coming from your React forms
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!empty($username) && !empty($email) && !empty($password)) {
        // Encrypt the password before sending it to the database
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        try {
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$username, $email, $hashed_password]);
            echo json_encode(["success" => true, "message" => "Registration successful!"]);
        } catch (PDOException $e) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Username or email already exists."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Please complete all fields."]);
    }
}
?>
