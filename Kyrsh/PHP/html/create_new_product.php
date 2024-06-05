<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = 'bdpg';
$dbname = 'forkyrs';
$user = 'user';
$password = 'password';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name']) && isset($data['description']) && isset($data['price']) && isset($data['category_id']) && isset($data['address'])) {
        $name = $data['name'];
        $description = $data['description'];
        $price = $data['price'];
        $category_id = $data['category_id'];
        $main_image_url = isset($data['main_image_url']) ? $data['main_image_url'] : null;
        $full_description = isset($data['full_description']) ? $data['full_description'] : null;
        $email = $data['email'];
        $address = $data['address'];

        $stmt = $pdo->prepare("INSERT INTO products (name, description, price, category_id, main_image_url, full_description, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $description, $price, $category_id, $main_image_url, $full_description, $email, $address]);

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>