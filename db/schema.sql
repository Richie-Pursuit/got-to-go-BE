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
  latitude NUMERIC DEFAULT 0,
  longitude NUMERIC DEFAULT 0,
  image TEXT DEFAULT '../images/bathroom.jpg'
);

DROP TABLE IF EXISTS perks_table;
CREATE TABLE perks_table (
  id SERIAL PRIMARY KEY,
  bathrooms_id INTEGER REFERENCES bathrooms_table (id) ON DELETE CASCADE ON UPDATE CASCADE,
  accessibility BOOLEAN DEFAULT false, 
  baby_changing BOOLEAN DEFAULT false,
  family_room BOOLEAN DEFAULT false,
  "open" TEXT NOT NULL, -- Enclosed "open" in double quotes to avoid syntax error
  close TEXT NOT NULL, -- No need to change close as it's not a reserved keyword
  is_public BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS image_files;
CREATE TABLE image_files(
    id SERIAL NOT NULL PRIMARY KEY,
    filename TEXT UNIQUE NOT NULL,
    filepath TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    size BIGINT NOT NULL
);


-- psql -U postgres -f db/schema.sql 