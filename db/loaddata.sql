COPY allReviews(review_id, product_id, rating, dateCreated, summary, body, recommend, report, username, email, response, helpful)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/reviews.csv'
DELIMITER ',' CSV HEADER;

COPY photos(photo_id, review_id, photo_url)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/reviews_photos.csv'
DELIMITER ',' CSV HEADER;

COPY characteristics(char_id, product_id, characteristic_name)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/characteristics.csv'
DELIMITER ',' CSV HEADER;

COPY characteristics_ratings(char_rating_id, char_id, review_id, char_rating)
FROM '/Users/jeankim/Desktop/SDCratingsandrevs/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;

SELECT count (*) FROM allreviews;
SELECT count (*) FROM characteristics;
SELECT count (*) FROM photos;
SELECT count (*) FROM characteristics_ratings;
