CREATE TABLE cards (
  id serial PRIMARY KEY,
  user_id int REFERENCES users (id) ON DELETE CASCADE,
  front VARCHAR(223) NOT NULL,
  back VARCHAR(223) NOT NULL,
  archived BOOL DEFAULT FALSE
);