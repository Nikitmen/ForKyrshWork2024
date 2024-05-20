<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Подключение к базе данных PostgreSQL
$host = 'bdpg';
$dbname = 'forkyrs';
$user = 'user';
$password = 'password';

$dsn = "pgsql:host=$host;port=5432;dbname=$dbname;user=$user;password=$password";
try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Запрос продуктов
    $stmt = $pdo->query("SELECT id, name, description, price, main_image_url as image, is_popular as popular, created_at FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Запрос категорий
    $stmt = $pdo->query("SELECT id, name, slug FROM categories");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode(['products' => $products, 'categories' => $categories], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>