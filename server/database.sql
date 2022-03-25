CREATE DATABASE login;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)


CREATE TABLE question(
    question_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

INSERT INTO user(username, passhash) values($1,$2);