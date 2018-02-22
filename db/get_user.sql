-- VARIABLES
-- $1 userID from session


-- SELECT id, username, quiz_deck_id
-- FROM users
-- WHERE id = $1;
-- update users set quiz_deck_id = 23 where id = 1;

-- SELECT 
--   users.id u_id, username, 
--   quiz_deck_id qd_id, qd.deck_name qd_name, 
--   game_deck_id gd_id, gd.deck_name gd_name, 
--   memory_deck_id md_id, md.deck_name md_name
-- FROM users
--   LEFT JOIN decks qd ON users.quiz_deck_id = qd.id
--   LEFT JOIN decks gd ON users.game_deck_id = gd.id
--   LEFT JOIN decks md ON users.memory_deck_id = md.id
-- WHERE
--   users.id = $1;

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