const pool = require('./db.js')

const helpful = (reviewid) => {
  let querystr = `UPDATE allReviews SET helpful = helpful + 1 WHERE review_id = ${reviewid};`
  return pool
    .connect()
    .then((client) => {
      console.log('in client')
      return client
      .query(querystr)
      .then((res) => {client.release(); return res})
      .catch((err) => {client.release(); return err})
      })
}

const report = (reviewid) => {
  let querystr = `UPDATE allReviews SET report = true WHERE review_id = ${reviewid};`
  return pool
    .connect()
    .then((client) => {
      return client
      .query(querystr)
      .then((res) => {client.release(); return res})
      .catch((err) => {client.release(); return err})
      })
}

const getAllReviews = (productid, page, count, sort) => {
  let offset;
  if(page === 1){
   offset = 0;
  } else {
    offset = (page - 1) * count;
  }
  let querystr = `SELECT allReviews.review_id, allReviews.rating, allReviews.summary, allReviews.recommend, allReviews.response, allReviews.body, allReviews.dateCreated, allReviews.username, allReviews.helpful,
  CASE WHEN count(photo) = 0 THEN ARRAY[]::json[] ELSE (array_agg(reviewphotos.photo)) END AS photos
  FROM allReviews
  LEFT OUTER JOIN
  (
    SELECT review_id, json_build_object('id', photo_id, 'url', photo_url) as photo
    FROM photos
    ORDER BY photo_id
  ) reviewphotos
  ON allReviews.review_id = reviewphotos.review_id
  WHERE allReviews.product_id = ${productid} AND report = false
  GROUP BY allReviews.review_id
  LIMIT ${count}
  OFFSET ${offset};`

  return pool
  .connect()
  .then((client) => {
    return client
    .query(querystr)
    .then((res) => {client.release(); return res})
    .catch((err) => {client.release(); return err})
    })

}

exports.helpful = helpful;
exports.report = report;
exports.getAllReviews = getAllReviews;



