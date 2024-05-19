<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Подключение к базе данных PostgreSQL
$host = 'bdpg'; // Имя хоста сервиса PostgreSQL в вашем docker-compose.yml
$dbname = 'forkyrs'; // Имя базы данных, установленное в вашем docker-compose.yml
$user = 'user'; // Имя пользователя PostgreSQL
$password = 'password'; // Пароль пользователя PostgreSQL

// Подключение к PostgreSQL
$dsn = "pgsql:host=$host;port=5432;dbname=$dbname;user=$user;password=$password";
try {
    $pdo = new PDO($dsn);
    // Установить режим обработки ошибок PDO на исключения
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Запрос данных из базы данных
    $stmt = $pdo->query("SELECT id, name, description, price, main_image_url as image, is_popular as popular FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($products, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>
