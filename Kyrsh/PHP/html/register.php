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

    if (
        isset($data['username']) && isset($data['password']) &&
        isset($data['firstName']) && isset($data['email']) &&
        isset($data['gender']) && isset($data['address'])
    ) {
        $username = $data['username'];
        $passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);
        $firstName = $data['firstName'];
        $middleName = isset($data['middleName']) ? $data['middleName'] : null;
        $email = $data['email'];
        $gender = $data['gender'];
        $address = $data['address'];

        $stmt = $pdo->prepare("INSERT INTO users (username, password, first_name, middle_name, email, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$username, $passwordHash, $firstName, $middleName, $email, $gender, $address]);

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
