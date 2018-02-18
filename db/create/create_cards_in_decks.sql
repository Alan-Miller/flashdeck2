CREATE TABLE cards_in_decks (
  id serial PRIMARY KEY,
  card_id int REFERENCES cards (id) ON DELETE CASCADE,
  deck_id int REFERENCES decks (id) ON DELETE CASCADE
);