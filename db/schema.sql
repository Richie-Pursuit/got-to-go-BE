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
  latitude NUMERIC,
  longitude NUMERIC,
  image TEXT DEFAULT '../Images-Files/bathroom-default.jpg'
);

DROP TABLE IF EXISTS perks_table;
CREATE TABLE perks_table (
  id SERIAL PRIMARY KEY,
  bathrooms_id INTEGER REFERENCES bathrooms_table (id) ON DELETE CASCADE ON UPDATE CASCADE,
  accessibility BOOLEAN default false, 
  baby_changing BOOLEAN default false,
  family_room BOOLEAN default false,
  open TEXT NOT NULL,
  close TEXT NOT NULL,
  is_public BOOLEAN default false
);


-- psql -U postgres -f db/schema.sql 