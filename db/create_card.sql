INSERT INTO cards (user_id, front, back)
  VALUES ($1, $2, $3);

-- SELECT *
-- FROM cards
-- WHERE user_id = $1
-- ORDER BY front;

-- SELECT
--   cid.id cid_id,
--   cards.user_id user_id, cards.id card_id, front, back, archived,
--   decks.id deck_id, deck_name
-- FROM cards_in_decks cid
--   FULL JOIN cards ON cards.id = cid.card_id
--   FULL JOIN decks ON decks.id = cid.deck_id
-- WHERE cards.user_id = $1 OR decks.user_id = $1
-- ORDER BY deck_name;