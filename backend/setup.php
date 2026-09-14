<?php
require 'config.php'; // Pulls your secure Aiven connection keys

try {
    // 1. Define SQL table schema strings
    $sql = "
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('client', 'developer') DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('Open', 'In Progress', 'Resolved') DEFAULT 'Open',
        developer_notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Seed an uncorrupted Admin account (Password is exactly: admin123)
    INSERT IGNORE INTO users (id, username, email, password, role) 
    VALUES (1, 'Senior_Dev', 'dev@company.com', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'developer');
    ";

    // 2. Execute SQL commands directly inside your cloud database
    $pdo->exec($sql);
    echo "<h1>🎉 Cloud Database Tables Created Successfully on Aiven!</h1>";
    echo "<p>You can now safely delete the setup.php file from your repository.</p>";

} catch (PDOException $e) {
    die("Error executing migration: " . $e->getMessage());
}
?>
