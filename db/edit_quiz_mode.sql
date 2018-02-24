-- UPDATE users 
-- SET quiz_deck_id = $2
-- WHERE users.id = $1;

UPDATE settings
SET quiz_deck_id = $2
WHERE user_id = $1;

SELECT 
  users.id u_id, username, 
  s.quiz_deck_id qd_id, qd.deck_name qd_name, 
  s.quiz_layout_id ql_id, ql.layout_name ql_name,
  s.game_deck_id gd_id, gd.deck_name gd_name, 
  s.game_layout_id gl_id, gl.layout_name gl_name,
  s.memory_deck_id md_id, md.deck_name md_name,
  s.memory_layout_id ml_id, ml.layout_name ml_name
FROM users
  JOIN settings s ON users.id = s.user_id
  LEFT JOIN decks qd ON s.quiz_deck_id = qd.id
  LEFT JOIN decks gd ON s.game_deck_id = gd.id
  LEFT JOIN decks md ON s.memory_deck_id = md.id
  LEFT JOIN layouts ql ON s.quiz_layout_id = ql.id
  LEFT JOIN layouts gl ON s.game_layout_id = gl.id
  LEFT JOIN layouts ml ON s.memory_layout_id = ml.id
WHERE
  users.id = $1;