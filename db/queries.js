const pool = require('./db.js')

const helpful = (reviewid) => {
  let querystr = `UPDATE allReviews SET helpful = helpful + 1 WHERE review_id = ${reviewid};`
  return pool
    .connect()
    .then((client) => {
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
  let queryStrRev = `INSERT INTO allReviews VALUES (default, ${review.product_id}, ${review.rating}, '${review.summary}', '${review.body}', default, ${review.recommend}, '${review.name}', '${review.email}', default, default, ${Math.floor(new Date().getTime()/1000.0)}) RETURNING review_id;`
  return pool
    .connect()
    .then((client) => {
      return client
      .query(queryStrRev)
      .then((res) => {
        let chars = ``
        let reviewid = res.rows[0]['review_id']
        for(var key in review.characteristics){
          chars += `(default, ${key}, ${reviewid}, ${review.characteristics[key]}),`
        }
        let queryStr = `INSERT INTO characteristics_ratings VALUES ${chars}`
        queryStr = queryStr.slice(0, queryStr.length - 1) + `;`
        if(review.photos !== []){
          let photos = ``
          allPhotos = review.photos
          allPhotos.forEach((photo) => {
            photos += `(default, '${photo}', ${reviewid}),`
          })
          queryStr += ` INSERT INTO photos VALUES ${photos}`
          queryStr = queryStr.slice(0, queryStr.length - 1) + `;`
        }
        return client.query(queryStr)
      })
      .then((res) => {
        client.release();
        return res;
      })
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
  let queryStr = ` SELECT
  json_build_object(
    'review_id', allReviews.review_id,
    'rating', allReviews.rating,
    'summary', allReviews.summary,
    'recommend', allReviews.recommend,
    'response', allReviews.response,
    'body', allReviews.body,
    'date', allReviews.dateCreated,
    'reviewer_name', allReviews.username,
    'helpfulness', allReviews.helpful,
    'photos', (SELECT array_agg
             (json_build_object('id', photos.photo_id, 'url', photos.photo_url)
                    ORDER BY photos.photo_id )
              FROM photos
                    WHERE photos.review_id = allReviews.review_id)
  )
  FROM allReviews
  WHERE product_id = ${productid} AND report = false
  ORDER BY ${order}
  LIMIT ${count}
  OFFSET ${offset};`

  return pool
  .connect()
  .then((client) => {
    return client
    .query(queryStr)
    .then((res) => {
      console.log(res)
      var data = [];
      var rows = res.rows
      rows.forEach(row =>{
        data.push(row['json_build_object'])
      })
      console.log('data', data)
      client.release();
      return data})
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


