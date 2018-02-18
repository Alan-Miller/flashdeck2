CREATE TABLE decks (
  id serial PRIMARY KEY,
  user_id int REFERENCES users (id) ON DELETE CASCADE,
  deck_name VARCHAR(23) NOT NULL
);