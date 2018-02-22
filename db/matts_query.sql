-- SELECT *
-- FROM trail
-- WHERE
--   difficulty ~* $1
--   AND general_area ~* $2
--   AND trail_length < $3
--   AND elevation_gain < $4;

-- SELECT rating.rating
-- FROM rating
--   JOIN trail ON trail.trail_id = rating.trail_id
-- WHERE
--   trail.trail_name = $1
--   AND rating.user_id = $2;

SELECT *
FROM trail
WHERE
  difficulty ~* $1
  AND general_area ~* $2
  AND trail_length < $3
  AND elevation_gain < $4
  AND trail_id IN (
    SELECT trail_id
    FROM rating
    GROUP BY trail_id
    HAVING AVG(rating) >= $5);

