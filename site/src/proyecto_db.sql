CREATE SCHEMA proyecto_db;

USE proyecto_db;

CREATE TABLE users(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100),
    image VARCHAR(255),
    password TEXT,
    admin TINYINT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE products(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    price MEDIUMINT,
    stock SMALLINT,
    isbn VARCHAR(100),
    numberPages SMALLINT,
    image VARCHAR(255),
    categoryId INT UNSIGNED,
    subcategoryId INT UNSIGNED,
    authorId INT UNSIGNED,
    editorialId INT UNSIGNED,
    coverTypeId INT UNSIGNED,
    formatTypeId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

-- status: 0 => estado pendiente de compra
-- status: 1 => estado cerrado de compra
-- orderId => numero de 'ticket', numero de compra.
-- Es null hasta que compremos el producto. Cuando éste comprado el status será 1 y orderId recibe un numero
-- El numero orderId sale de la tabla orders.

CREATE TABLE orderItems(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED,
    productId INT UNSIGNED,
    productName VARCHAR(255),
    productAuthor VARCHAR(100),
    productEditorial VARCHAR(100),
    productQuantity SMALLINT,
    productPrice MEDIUMINT,
    productImage VARCHAR(255),
    productIsbn VARCHAR(255),
    subTotal INT,
    status TINYINT,
    orderId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE orders(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    number INT UNSIGNED,
    total MEDIUMINT UNSIGNED,
    userId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE categories(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE subcategories(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100),
    categoryId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);
    
CREATE TABLE authors(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    lastName VARCHAR(100),
    bioAuthor TEXT,
    image VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE editorials(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE coverTypes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

CREATE TABLE formatTypes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME
);

-- FOREIGN KEYS

ALTER TABLE products
ADD FOREIGN KEY (categoryId) REFERENCES categories(id),
ADD FOREIGN KEY (subcategoryId) REFERENCES subcategories(id),
ADD FOREIGN KEY (authorId) REFERENCES authors(id),
ADD FOREIGN KEY (editorialId) REFERENCES editorials(id),
ADD FOREIGN KEY (coverTypeId) REFERENCES coverTypes(id),
ADD FOREIGN KEY (formatTypeId) REFERENCES formatTypes(id);

ALTER TABLE subcategories
ADD FOREIGN KEY (categoryId) REFERENCES categories(id);

ALTER TABLE orderItems
ADD FOREIGN KEY (userId) REFERENCES users(id),
ADD FOREIGN KEY (productId) REFERENCES products(id),
ADD FOREIGN KEY (orderId) REFERENCES orders(id);

ALTER TABLE orders
ADD FOREIGN KEY (userId) REFERENCES users(id);









