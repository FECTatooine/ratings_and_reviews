DROP TABLE IF EXISTS allReviews CASCADE;
CREATE TABLE allReviews (
    review_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    summary VARCHAR(60) NULL,
    body VARCHAR(1000) NOT NULL,
    response VARCHAR(1000) NULL,
    recommend BOOLEAN NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    helpful INTEGER NOT NULL DEFAULT 0,
    report BOOLEAN DEFAULT false,
    dateCreated TIMESTAMP
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
    photo_id serial PRIMARY KEY,
    photo_url TEXT,
    review_id INTEGER NOT NULL,
);

DROP TABLE IF EXISTS characteristics;
CREATE TABLE characteristics (
    char_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    characteristic_name TEXT
);

DROP TABLE IF EXISTS characteristic_ratings;
CREATE TABLE characteristics (
    char_rating_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    char_id INTEGER NOT NULL,
    characteristic_rating INTEGER NOT NULL,
    FOREIGN KEY (char_id)
      REFERENCES characteristics (char_id)
);

