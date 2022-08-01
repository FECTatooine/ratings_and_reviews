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

const postReview = (review) => {
  let querystr = ``
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
  let order;
  if(sort === 'newest'){
    order = 'allReviews.dateCreated desc'
  } else if (sort === 'helpful'){
    order = 'allReviews.helpful desc'
  } else {
    order = 'allReviews.helpful desc'
  }
  if(page === 1){
   offset = 0;
  } else {
    offset = (page - 1) * count;
  }
  let querystr = `SELECT allReviews.review_id, allReviews.rating, allReviews.summary, allReviews.recommend, allReviews.response, allReviews.body, allReviews.dateCreated as date, allReviews.username as reviewer_name, allReviews.helpful as helpfulness,
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
  ORDER BY ${order}
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

const getMetaData = (productid) => {
  let querystr = `SELECT * FROM characteristics
  LEFT OUTER JOIN
  (SELECT characteristics_ratings.char_id, AVG(characteristics_ratings.char_rating) as value
  FROM characteristics_ratings GROUP BY characteristics_ratings.char_id) ratings
  ON characteristics.char_id = ratings.char_id
  WHERE characteristics.product_id = ${productid};`
  var metaData = {'product_id': productid}
  return pool
    .connect()
    .then((client) => {
      return client
      .query(querystr)
      .then((res) => {return res.rows})
      .then((rows) => {
        var characteristics = {}
        rows.forEach((row) => {
          characteristics[row.characteristic_name] = {id: row.char_id, value: row.value}
        })
        metaData['characteristics'] = characteristics
        queryStr = `SELECT COUNT(recommend) FROM allReviews WHERE product_id = ${productid} AND recommend = true;`
        return client.query(queryStr)
      })
      .then((recCount) => {
        console.log('recCount', recCount);
        metaData['recommended'] = {0: recCount.rows[0]['count']};
        client.release();
        return metaData;
      })
      .catch((err) => {client.release(); return err})
      })
}

exports.helpful = helpful;
exports.report = report;
exports.getAllReviews = getAllReviews;
exports.getMetaData = getMetaData;
exports.postReview = postReview;


