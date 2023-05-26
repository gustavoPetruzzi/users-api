DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);