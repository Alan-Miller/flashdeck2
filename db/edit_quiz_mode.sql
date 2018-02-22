-- UPDATE users 
-- SET quiz_deck_id = $2
-- WHERE users.id = $1;

UPDATE settings
SET quiz_deck_id = $2
WHERE user_id = $1;

SELECT 
  users.id u_id, username, 
  s.quiz_deck_id qd_id, qd.deck_name qd_name, 
  s.game_deck_id gd_id, gd.deck_name gd_name, 
  s.memory_deck_id md_id, md.deck_name md_name
FROM users
  JOIN settings s ON users.id = s.user_id
  LEFT JOIN decks qd ON s.quiz_deck_id = qd.id
  LEFT JOIN decks gd ON s.game_deck_id = gd.id
  LEFT JOIN decks md ON s.memory_deck_id = md.id
WHERE
  users.id = 1;