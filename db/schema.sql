DROP DATABASE IF EXISTS bathrooms_dev;
CREATE DATABASE bathrooms_dev;
\c bathrooms_dev;

DROP TABLE IF EXISTS bathrooms_table;

CREATE TABLE bathrooms_table (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  zipcode NUMERIC,
  latitude double precision,
  longitude double precision,
  image TEXT
);


-- psql -U postgres -f db/schema.sql 