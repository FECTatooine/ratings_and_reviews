const express = require('express');
const app = express();
const port = 3000;
const {helpful, report} = require('../db/queries.js');

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
app.use(express.json());
app.use(express.static('client/dist'))


app.get('/*', function(req, res) {
  res.send('connected')
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