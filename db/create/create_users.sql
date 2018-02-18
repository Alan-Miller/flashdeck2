CREATE TABLE users (
  id serial PRIMARY KEY,
  auth_id VARCHAR(100) NOT NULL,
  username VARCHAR(23) NOT NULL,
  quiz_deck_id int,
  game_deck_id int,
  memory_deck_id int,
  quiz_art_id int,
  game_art_id int,
  memory_art_id int,
  theme_id int
)
