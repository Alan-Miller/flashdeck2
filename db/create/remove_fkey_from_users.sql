ALTER TABLE users
DROP CONSTRAINT IF EXISTS qdeck_users_fkey,
  DROP CONSTRAINT IF EXISTS gdeck_users_fkey,
    DROP CONSTRAINT IF EXISTS mdeck_users_fkey;

