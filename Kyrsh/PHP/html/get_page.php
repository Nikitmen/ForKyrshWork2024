<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$host = 'bdpg';
$dbname = 'forkyrs';
$user = 'user';
$password = 'password';

try {
    // Подключение к базе данных PostgreSQL через PDO
    $dsn = "pgsql:host=$host;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    // Получение действия из параметра запроса
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if ($action == 'getProduct') {
        // Получение ID продукта из параметра запроса
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

        // Подготовка и выполнение запроса
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Получение данных о продукте
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode(['error' => 'Product not found']);
        }
    } 
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
