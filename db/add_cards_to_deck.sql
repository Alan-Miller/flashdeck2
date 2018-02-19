INSERT INTO cards_in_decks (card_id, deck_id) -- VALUES ($2, $3);
SELECT $2, $3
WHERE NOT EXISTS (
    SELECT * FROM cards_in_decks
    WHERE card_id = $2
      AND deck_id = $3);


-- SELECT *
-- FROM decks
  -- FULL OUTER JOIN cards_in_decks ON decks.id = cards_in_decks.deck_id
-- WHERE user_id = $1
-- ORDER BY deck_name;

-- SELECT
--   cid.id cid_id,
--   cards.user_id user_id, cards.id card_id, front, back, archived,
--   decks.id deck_id, deck_name
-- FROM cards_in_decks cid
--   FULL JOIN cards ON cards.id = cid.card_id
--   FULL JOIN decks ON decks.id = cid.deck_id
-- WHERE cards.user_id = $1 OR decks.user_id = $1
-- ORDER BY deck_name, front;