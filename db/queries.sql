sudo -u postgres psql
-- password kiritasiz

CREATE DATABASE books_store;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(200) NOT NULL,
    price INTEGER NOT NULL,
    url VARCHAR(120) NOT NULL
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    book_title VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (book_id) REFERENCES books(id)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
);

