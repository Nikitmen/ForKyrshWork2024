<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = 'bdpg'; // Имя хоста сервиса PostgreSQL в вашем docker-compose.yml
$dbname = 'forkyrs'; // Имя базы данных, установленное в вашем docker-compose.yml
$user = 'user'; // Имя пользователя PostgreSQL
$password = 'password'; // Пароль пользователя PostgreSQL

// Подключение к PostgreSQL
$dsn = "pgsql:host=$host;port=5432;dbname=$dbname;user=$user;password=$password";
try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получение списка категорий
    if (isset($_GET['action']) && $_GET['action'] === 'getCategories') {
        $stmt = $pdo->query("SELECT id, name, slug FROM categories");
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($categories);
        exit;
    }

    // Получение товаров по категории или всех товаров
    if (isset($_GET['category'])) {
        $category = $_GET['category'];
        $stmt = $pdo->prepare("SELECT p.id, p.name, p.description, p.price, p.main_image_url AS image, p.is_popular, p.created_at 
                               FROM products p
                               JOIN categories c ON p.category_id = c.id
                               WHERE c.slug = :category");
        $stmt->execute(['category' => $category]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $popular_products = [];
    } else {
        // Получение случайных популярных товаров
        $stmt_popular = $pdo->query("SELECT id, name, description, price, main_image_url AS image, is_popular, created_at 
                                     FROM products WHERE is_popular = TRUE ORDER BY RANDOM() LIMIT 3");
        $popular_products = $stmt_popular->fetchAll(PDO::FETCH_ASSOC);

        // Получение всех товаров, исключая популярные
        $popular_ids = array_map(function($product) {
            return $product['id'];
        }, $popular_products);

        if (count($popular_ids) > 0) {
            $placeholders = str_repeat('?,', count($popular_ids) - 1) . '?';
            $stmt = $pdo->prepare("SELECT id, name, description, price, main_image_url AS image, is_popular, created_at 
                                   FROM products WHERE id NOT IN ($placeholders)");
            $stmt->execute($popular_ids);
        } else {
            $stmt = $pdo->query("SELECT id, name, description, price, main_image_url AS image, is_popular, created_at 
                                 FROM products");
        }
        
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    header('Content-Type: application/json');
    echo json_encode([
        'popular_products' => $popular_products,
        'products' => $products
    ]);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
