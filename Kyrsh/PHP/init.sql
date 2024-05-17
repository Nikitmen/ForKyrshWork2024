CREATE DATABASE IF NOT EXISTS forkyrs;
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
GRANT SELECT,UPDATE,INSERT ON forkyrs.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_premium BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    main_image_url VARCHAR(255),
    full_description TEXT,
    address VARCHAR(255)
);

INSERT INTO products (name, description, price, category, is_premium, is_popular, main_image_url, full_description, address) 
VALUES 
('Обеденный стол', 'Стол из массива дерева с искусственной краской, размер 150x90 см', 25000.00, 'Мебель', false, false, 'https://cache3.youla.io/files/images/780_780/5d/05/5d051e7ef8efdc61dc5cc936.jpg', 'Красивый и функциональный обеденный стол для вашей кухни или столовой.', 'г. Москва, ул. Примерная, д. 2'),
('Кровать', 'Кровать из массива дерева с ортопедическим матрасом, размер 180x200 см', 35000.00, 'Мебель', false, false, 'http://price-altai.ru/uploads/2016/03/03123925d335d2.jpg', 'Удобная и стильная кровать для вашей спальни.', 'г. Москва, ул. Ленина, д. 3'),
('Диван', 'Диван с мягкой тканевой обивкой, размер 200x100 см', 45000.00, 'Мебель', false, false, 'https://cache3.youla.io/files/images/780_780/5b/52/5b526857dbdf0fd52043f742.jpg', 'Уютный и комфортный диван для гостиной или спальни.', 'г. Москва, ул. Гагарина, д. 4'),
('Кресло', 'Мягкое кресло с подлокотниками и ножками из дерева, размер 80x70 см', 20000.00, 'Мебель', false, false, 'https://shgs.ru/disk/get/bHLq9hgrG5pl.jpg', 'Комфортное кресло для отдыха и чтения.', 'г. Москва, ул. Кирова, д. 5'),
('Шкаф', 'Шкаф из массива дерева с вместительными полками и ящиками, размер 200x150 см', 55000.00, 'Мебель', false, false, 'https://avatars.dzeninfra.ru/get-zen_doc/3413906/pub_617d59daca40d92f7d1a0efe_617d769e93121f356c61762a/scale_1200', 'Просторный и стильный шкаф для вашей спальни или гостиной.', 'г. Москва, ул. Советская, д. 6'),
('Стул', 'Деревянный стулья с мягким сиденьем, размер 40x40 см', 5000.00, 'Мебель', false, false, 'https://1000dosok.ru/s/20-09-6611125.jpg', 'Удобный и элегантный стул для вашего обеденного стола.', 'г. Москва, ул. Победы, д. 7'),
('Стол', 'Стол письменный с деревянной поверхностью, размер 120x60 см', 10000.00, 'Мебель', false, false, 'https://cache3.youla.io/files/images/780_780/59/7d/597d831e821a990d0b0b0f13.jpg', 'Функциональный и стильный письменный стол для вашего офиса или дома.', 'г. Москва, ул. Фрунзе, д. 8'),
('Полка', 'Деревянная полка для хранения книг и декоративных предметов, размер 100x20 см', 7000.00, 'Мебель', false, false, 'https://i.baraholka.com.ru/files/1/9/1917990.jpg', 'Компактная и удобная полка для вашего интерьера.', 'г. Москва, ул. Мира, д. 9'),
('Кухонный стол', 'Стол для кухни, размер 120x80 см', 18000.00, 'Мебель', false, false, 'https://26.img.avito.st/image/1/1.f1zqy7aB07WcbiGzmPI6GzVo17NIbtOzLwvXs5xuIbNcbN-xXGrT8Q.ZZJ1wixnL51GXnPKGEYtKHXcRaeBeHFyoa2DsA86Ay4', 'Стильный и практичный стол для вашей кухни.', 'г. Москва, ул. Ленинградская, д. 10')