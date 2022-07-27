DROP TABLE IF EXISTS allReviews;
CREATE TABLE allReviews (
    review_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    summary VARCHAR(60) NULL,
    body VARCHAR(1000) NOT NULL,
    recommend BOOLEAN NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    photos TEXT,
    helpful INTEGER NOT NULL DEFAULT 0,
    report INTEGER NOT NULL DEFAULT 0,
    dateCreated TIMESTAMP
);

DROP TABLE IF EXISTS characteristics;
CREATE TABLE characteristics (
    char_rating_id serial PRIMARY KEY,
    product_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    characteristic_rating INTEGER NOT NULL,
    review_id INTEGER NOT NULL,
    FOREIGN KEY (review_id)
      REFERENCES allReviews (review_id)
);

