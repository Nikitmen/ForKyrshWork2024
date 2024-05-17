<?php

// Подключение к базе данных MySQL
$host = 'bdpg'; // Имя хоста сервиса MySQL в вашем docker-compose.yml
$dbname = 'forkyrs'; // Имя базы данных, установленное в вашем docker-compose.yml
$user = 'user'; // Имя пользователя MySQL
$password = 'password'; // Пароль пользователя MySQL

// Подключение к MySQL
$mysqli = new mysqli($host, $user, $password, $dbname);

// Проверка соединения
if ($mysqli->connect_error) {
    die("Ошибка подключения к базе данных: " . $mysqli->connect_error);
}

echo "Подключение к базе данных успешно\n";

// Получение списка таблиц
$tables = $mysqli->query("SHOW TABLES");

// Вывод списка таблиц
echo "Список таблиц:\n";
while ($row = $tables->fetch_assoc()) {
    echo $row['Tables_in_forkyrs'] . "\n"; // Имя базы данных может быть другим
}

// Закрытие соединения
$mysqli->close();
