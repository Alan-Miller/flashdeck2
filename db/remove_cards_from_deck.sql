DELETE FROM cards_in_decks
WHERE card_id = $2 AND deck_id = $3;