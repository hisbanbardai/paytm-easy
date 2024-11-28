-- Migration: create_accounts_table
DROP TABLE IF EXISTS accounts;

CREATE TABLE
  accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    balance NUMERIC(12, 2) NOT NULL
  )