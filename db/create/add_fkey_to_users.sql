ALTER TABLE users
  ADD CONSTRAINT qdeck_users_fkey FOREIGN KEY (quiz_deck_id) REFERENCES decks (id),
    ADD CONSTRAINT gdeck_users_fkey FOREIGN KEY (game_deck_id) REFERENCES decks (id),
      ADD CONSTRAINT mdeck_users_fkey FOREIGN KEY (memory_deck_id) REFERENCES decks (id);

