CREATE TABLE settings (
  id serial PRIMARY KEY,
  user_id int references users(id),
  quiz_deck_id int references decks(id),
  game_deck_id int references decks(id),
  memory_deck_id int references decks(id),
  quiz_layout int references layouts(id),
  game_layout int references layouts(id)
);