const express = require('express');
const app = express();
const port = 3000;
const {helpful, report, getAllReviews, getMetaData, postReview} = require('../db/queries.js');
const bodyParser = require('body-parser');

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
app.use(express.json());
app.use(express.static('client/dist'))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/*', function(req, res) {
  let url = req.url
  if(url.includes('meta')){
    getMetaData(req.query.product_id)
    .then((data) => {res.send(data)})
    .catch((err) => {res.send('500')})
  } else {
    let sort = req.query.sort || 'relevant'
    let count = req.query.count || 5
    let page = req.query.page || 1
    let productid = req.query.product_id
    getAllReviews(productid, page, count, sort)
      .then((reviews) => {
        var data = {
          'product' : productid,
          'page': page,
          'count': count,
          'results': reviews
        }
        res.send(data)
      })
      .catch((err) => {res.send('500')})
  }
})

app.put('/*', function(req, res) {
  let url = req.url
  let reviewid = Number(url.match(/\d+/g))
  if(url.includes('helpful')){
    helpful(reviewid)
    .then(() => {res.send('204')})
    .catch((err) => {res.send('500')})
  } else if(url.includes('report')){
    report(reviewid)
    .then(() => {res.send('204')})
    .catch((err) => {res.send('500')})
  } else {
    res.send('404');
  }
})

app.post('/reviews', function(req, res) {
  postReview(req.body)
  .then(() => {res.sendStatus(201)})
  .catch((err) => {res.sendStatus(500)})
})
