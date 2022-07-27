DROP TABLE IF EXISTS allReviews CASCADE;
CREATE TABLE allReviews (
    review_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    summary VARCHAR(200) NULL,
    body VARCHAR(1000) NOT NULL,
    response VARCHAR(1000) NULL,
    recommend BOOLEAN NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    helpful INTEGER NOT NULL DEFAULT 0,
    report BOOLEAN DEFAULT false,
    dateCreated bigint
);

COPY allReviews(review_id, product_id, rating, dateCreated, summary, body, recommend, report, username, email, response, helpful)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/reviews.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
    photo_id serial PRIMARY KEY,
    photo_url TEXT,
    review_id INTEGER NOT NULL
);

COPY photos(photo_id, review_id, photo_url)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/reviews_photos.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS characteristics CASCADE;
CREATE TABLE characteristics (
    char_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    characteristic_name TEXT
);

COPY characteristics(char_id, product_id, characteristic_name)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/characteristics.csv'
DELIMITER ',' CSV HEADER;

DROP TABLE IF EXISTS characteristics_ratings;
CREATE TABLE characteristics_ratings (
    char_rating_id serial PRIMARY KEY,
    char_id INTEGER NOT NULL,
    review_id INTEGER NOT NULL,
    char_rating INTEGER NOT NULL,
    FOREIGN KEY (char_id)
      REFERENCES characteristics (char_id),
    FOREIGN KEY (review_id)
      REFERENCES allReviews (review_id)
);

COPY characteristics_ratings(char_rating_id, char_id, review_id, char_rating)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;





SELECT count (*) FROM allreviews;
SELECT count (*) FROM characteristics;
SELECT count (*) FROM photos;
SELECT count (*) FROM characteristics_ratings;
