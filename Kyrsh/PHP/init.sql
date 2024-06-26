-- Создание таблицы products

SET timezone = 'Europe/Moscow';

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category_id INT NOT NULL,
    is_premium BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    main_image_url VARCHAR(255),
    full_description TEXT,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN first_name VARCHAR(50) NOT NULL,
ADD COLUMN middle_name VARCHAR(50),
ADD COLUMN email VARCHAR(100) NOT NULL,
ADD COLUMN gender VARCHAR(10),
ADD COLUMN address VARCHAR(255);


ALTER TABLE products ADD CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories (id);

INSERT INTO categories (name, slug) VALUES
('Столы', 'tables'),
('Кровати', 'beds'),
('Диваны', 'sofas'),
('Кресла', 'chairs'),
('Шкафы', 'wardrobes'),
('Стулья', 'stools'),
('Зеркала', 'Mirrors'),
('Полки', 'shelves'),
('Освещение', 'Lighting'),
('Тумбы', 'cabinets');

-- Вставка данных в таблицу products
INSERT INTO products (name, description, price, category_id, is_premium, is_popular, main_image_url, full_description, email, address, created_at) 
VALUES 
('Обеденный стол', 'Стол из массива дерева с искусственной краской, размер 150x90 см', 25000, 1, false, false, 'https://cache3.youla.io/files/images/780_780/5d/05/5d051e7ef8efdc61dc5cc936.jpg', 'Красивый и функциональный обеденный стол для вашей кухни или столовой.', 'john.doe@example.com','г. Москва, ул. Примерная, д. 2', '2024-05-10 10:35:00'),
('Кровать', 'Кровать из массива дерева с ортопедическим матрасом, размер 180x200 см', 35000, 2, false, false, 'https://img01.kupiprodai.ru/032022/1647684718746.jpg', 'Удобная и стильная кровать для вашей спальни.', 'ane.smith@example.com','г. Москва, ул. Ленина, д. 3', '2024-05-10 10:35:00'),
('Диван', 'Диван с мягкой тканевой обивкой, размер 200x100 см', 45000, 3, false, false, 'https://cache3.youla.io/files/images/780_780/5b/52/5b526857dbdf0fd52043f742.jpg', 'Уютный и комфортный диван для гостиной или спальни.', 'david.brown@example.com','г. Москва, ул. Гагарина, д. 4', '2024-05-10 10:35:00'),
('Кресло', 'Мягкое кресло с подлокотниками и ножками из дерева, размер 80x70 см', 20000, 4, false, false, 'https://shgs.ru/disk/get/bHLq9hgrG5pl.jpg', 'Комфортное кресло для отдыха и чтения.', 'david.brown@example.com','г. Москва, ул. Кирова, д. 5', '2024-05-10 10:35:00'),
('Шкаф', 'Шкаф из массива дерева с вместительными полками и ящиками, размер 200x150 см', 55000, 5, false, false, 'https://avatars.dzeninfra.ru/get-zen_doc/3413906/pub_617d59daca40d92f7d1a0efe_617d769e93121f356c61762a/scale_1200', 'Просторный и стильный шкаф для вашей спальни или гостиной.', 'michael.wilson@example.com','г. Москва, ул. Советская, д. 6', '2024-05-10 10:35:00'),
('Стул', 'Деревянный стулья с мягким сиденьем, размер 40x40 см', 5000, 6, false, false, 'https://1000dosok.ru/s/20-09-6611125.jpg', 'Удобный и элегантный стул для вашего обеденного стола.', 'sarah.anderson@example.com','г. Москва, ул. Победы, д. 7', '2024-05-10 10:35:00'),
('Стол', 'Стол письменный с деревянной поверхностью, размер 120x60 см', 10000, 1, false, false, 'https://cache3.youla.io/files/images/780_780/59/7d/597d831e821a990d0b0b0f13.jpg', 'Функциональный и стильный письменный стол для вашего офиса или дома.', 'sarah.anderson@example.com','г. Москва, ул. Фрунзе, д. 8', '2024-05-10 10:35:00'),
('Полка', 'Деревянная полка для хранения книг и декоративных предметов, размер 100x20 см', 7000, 8, false, false, 'https://i.baraholka.com.ru/files/1/9/1917990.jpg', 'Компактная и удобная полка для вашего интерьера.', 'william.roberts@example.com','г. Москва, ул. Мира, д. 9', '2024-05-10 10:35:00'),
('Кухонный стол', 'Стол для кухни, размер 120x80 см', 18000, 1, false, false, 'https://26.img.avito.st/image/1/1.f1zqy7aB07WcbiGzmPI6GzVo17NIbtOzLwvXs5xuIbNcbN-xXGrT8Q.ZZJ1wixnL51GXnPKGEYtKHXcRaeBeHFyoa2DsA86Ay4', 'Стильный и практичный стол для вашей кухни.', 'william.roberts@example.com','г. Москва, ул. Ленинградская, д. 10', '2024-05-10 10:35:00'),
('Диван "Аврора"', 'Угловой диван с мягкой обивкой из бархата, с вместительным бельевым ящиком. Идеальный выбор для большой семьи.', 75000.00, 3, false, true, 'https://20.img.avito.st/image/1/1.reXczLa5AQzKZLsGiq6g3QpvBwZozwi2Ym8DCGBlCw4.TMS6V4tMpWBpT7otaunVakMOLahr7xUelaKiAJBtKeM', 'Диван "Аврора" - это сочетание комфорта и стиля. Мягкая обивка из бархата приятна на ощупь, а вместительный бельевой ящик позволит хранить все необходимое. Диван прекрасно подойдет для большой семьи и станет центром вашей гостиной.', 'william.roberts@example.com','г. Москва, ул. Большая Дмитровка, д. 15', '2023-05-10 10:00:00'),
('Кресло "Элегант"', 'Кресло с высокой спинкой и мягкими подлокотниками, обивка из натуральной кожи. Отличный вариант для кабинета или библиотеки.', 35000.00, 4, false, true, 'https://80.img.avito.st/image/1/1.NCBDI7aDmMlZhDbPJwNEByWBms_9iDbPWYSay_uemMPZirZr9IA.ZVdeyHm1L0OSlpbFgLsTAiM6zkTbmTTemikFi2Qm7RQ', 'Кресло "Элегант" - это воплощение комфорта и стиля. Изготовленное из натуральной кожи, оно придаст вашему интерьеру роскошный вид. Кресло идеально подходит для кабинета или библиотеки, где вы сможете расслабиться и насладиться чтением.', 'william.roberts@example.com','г. Москва, ул. Тверская, д. 12', '2023-05-11 14:30:00'),
('Кухонный стол "Милан"', 'Стол из натурального дерева с матовой лакировкой, размер 160x90 см. Стильный и практичный вариант для вашей кухни.', 40000.00, 1, false, true, 'https://60.img.avito.st/image/1/1.ptvJc7a1CjLT1KQ0iVnC_LnRCDJ32KQ009QIMA.rUwVH7MkKLakAh4CZ5ATqb_xrSAfaJGescO4vqSsFr0', 'Кухонный стол "Милан" - это сочетание практичности и стиля. Изготовленный из натурального дерева, он прослужит вам долгие годы. Стол легко чистится и прекрасно впишется в любой интерьер.', 'william.roberts@example.com','г. Москва, ул. Арбат, д. 1', '2023-05-12 11:15:00'),
('Шкаф "Классика"', 'Шкаф из массива сосны с двумя дверцами и полками, размер 180x100 см.  Прочный и вместительный, идеально подходит для спальни.', 60000.00, 5, false, true, 'https://time-mebel.ru/wp-content/uploads/2019/10/image-05-06-20-14-15-18.jpeg', 'Шкаф "Классика" - это воплощение практичности и стиля. Изготовленный из массива сосны, он прослужит вам долгие годы.  Вместительный шкаф прекрасно подойдет для хранения одежды и других вещей.', 'daniel.thompson@example.com','г. Москва, ул. Петровка, д. 18', '2023-05-13 16:45:00'),
('Стулья "Валенсия"', 'Набор из 4-х стульев с деревянной спинкой и мягким сиденьем из эко-кожи, прекрасно дополнят обеденный стол.', 20000.00, 6, false, true, 'https://pushminer.ru/image/cache/catalog/29.06/stul-650x650.jpg', 'Стулья "Валенсия" - это идеальное дополнение к вашему обеденному столу.  Изготовленные из дерева с мягкими сиденьями, они комфортны и стильно смотрятся.', 'daniel.thompson@example.com','г. Москва, ул. Никольская, д. 10', '2023-05-14 12:00:00'),
('Комод "Ренессанс"', 'Комод с 5-ю ящиками из натурального дерева с резными элементами, размер 120x80 см. Прекрасный выбор для спальни или прихожей.', 45000.00, 10, false, true, 'https://80.img.avito.st/image/1/1.DbMr2ra5oVo9chtQPaITrcN5p1Cf2ajglXmjXpdzq1g.l6A9zJra1FDawWk3MgUE9jzerwr9tjlABbEiO4nIwWA', 'Комод "Ренессанс" - это воплощение элегантности и практичности.  Изготовленный из натурального дерева с резными элементами, он станет прекрасным украшением вашей спальни или прихожей.', 'daniel.thompson@example.com','г. Москва, ул. Кузнецкий мост, д. 7', '2023-05-15 17:30:00'),
('Кровать "Скандинавия"', 'Двуспальная кровать с деревянным каркасом и обивкой из текстиля.  Простая, но стильная модель, идеально подходящая для спальни.', 50000.00, 2, false, true, 'https://90.img.avito.st/image/1/1.0pi0m7aDfnGuPNB3nMC0z845fHcKMNB3rjx8cwwmfnsuMlDTAzg.E-EuD0ZYWve76DZ-EsUgsDGoXkTsCph01GRbq-jLhGY', 'Кровать "Скандинавия" - это сочетание простоты и стиля.  Изготовленная из дерева с текстильной обивкой, она создает уютную атмосферу в вашей спальне.', 'daniel.thompson@example.com','г. Москва, ул. Большая Никитская, д. 14', '2023-05-16 10:15:00'),
('Пуф "Весна"', 'Мягкий пуф с обивкой из велюра,  идеальный для создания уютной зоны отдыха.', 15000.00, 3, false, true, 'https://time-mebel.ru/wp-content/uploads/2020/01/100_4070.jpg', 'Пуф "Весна" - это уютный аксессуар для вашего дома.  Мягкий велюр приятен на ощупь, а пуф идеально подходит для создания уютной зоны отдыха.', 'daniel.thompson@example.com','г. Москва, ул. Малая Бронная, д. 12', '2023-05-17 14:45:00'),
('Стол-консоль "Ромашка"', 'Стол из натурального дерева,  размер 100x40 см. Прекрасный вариант для прихожей или спальни.', 25000.00, 1, false, true, 'https://i3.stat01.com/1/8496/84951141/afacdb/stol-konsol-transformer-s-dopolnitelnymi-segmentami-b2307.jpg', 'Стол-консоль "Ромашка" - это элегантный и функциональный предмет мебели.  Изготовленный из натурального дерева, он станет прекрасным украшением вашей прихожей или спальни.', 'jennifer.hernandez@example.com','г. Москва, ул. Воздвиженка, д. 1', '2023-05-18 11:30:00'),
('Зеркало "Флоренция"', 'Настенное зеркало в резной раме, размер 120x80 см. Прекрасное дополнение к спальне или прихожей.', 30000.00, 7, false, true, 'https://www.autopriwos.ru/catalogue/renault/19/sku/53415236/images/fullsize/zerkalo-naruzhnoe-pravoe-renault-19-53415236-1-5524384.jpg', 'Зеркало "Флоренция" - это элегантный и стильный аксессуар для вашего дома.  Изготовленное в резной раме, оно прекрасно дополнит интерьер вашей спальни или прихожей.', 'jennifer.hernandez@example.com','г. Москва, ул. Пречистенка, д. 18', '2023-05-19 16:00:00');