<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];

// 1. CREATE: Client opens a new ticket
if ($method === 'POST') {
    $user_id = $data['user_id'] ?? null;
    $title = trim($data['title'] ?? '');
    $description = trim($data['description'] ?? '');

    if ($user_id && !empty($title) && !empty($description)) {
        $stmt = $pdo->prepare("INSERT INTO tickets (user_id, title, description) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $title, $description]);
        echo json_encode(["success" => true, "message" => "Ticket logged successfully in the master queue!"]);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required ticket inputs."]);
    }
}

// 2. UPDATE: Developer updates status or records internal notes
if ($method === 'PUT') {
    $ticket_id = $data['ticket_id'] ?? null;
    $status = $data['status'] ?? null;
    $developer_notes = trim($data['developer_notes'] ?? '');

    if ($ticket_id && $status) {
        $stmt = $pdo->prepare("UPDATE tickets SET status = ?, developer_notes = ? WHERE id = ?");
        $stmt->execute([$status, $developer_notes, $ticket_id]);
        echo json_encode(["success" => true, "message" => "Ticket status updated instantly!"]);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing update arguments."]);
    }
}

// 3. READ: Decides what data grid to show based on user privileges
if ($method === 'GET') {
    $user_id = $_GET['user_id'] ?? null;
    $role = $_GET['role'] ?? 'client';

    if ($role === 'developer') {
        // Developers pull ALL tickets across the whole platform using an inner join
        $stmt = $pdo->query("SELECT t.*, u.username as client_name FROM tickets t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC");
        $tickets = $stmt->fetchAll();
        echo json_encode($tickets);
    } else {
        // Regular clients pull only their own logged history
        $stmt = $pdo->prepare("SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$user_id]);
        $tickets = $stmt->fetchAll();
        echo json_encode($tickets);
    }
}
?>
