const pool = require('./db.js')

const helpful = (reviewid) => {
  return pool
    .connect()
    .then((client) => {
      return client
      .query(`UPDATE allReviews
      SET helpful = helpful + 1
      WHERE review_id = ${reviewid}`)
      .then((res) => {client.release(); return res})
      .catch((err) => {client.release(); return err})
      })
}

const report = (reviewid) => {
  return pool
    .connect()
    .then((client) => {
      return client
      .query(`UPDATE allReviews
      SET report = true
      WHERE review_id = ${reviewid}`)
      .then((res) => {client.release(); return res})
      .catch((err) => {client.release(); return err})
      })
}

exports.helpful = helpful;
exports.report = report;

// module.exports =  function () {
//   return {
//     helpful: function (reviewid) {
//       console.log('calling helpful')
//       return 'helpful'
//         // db.connect()
//         //   .then(() => {
//         //     db.query(`UPDATE allReviews
//         //     SET helpful = helpful + 1
//         //     WHERE review_id = ${reviewid}`)
//         //   })
//         //   .then((res) => {console.log('success'); db.release()})
//         //   .catch((err) => {console.log('error'); db.release()})
//     }
//   }
// }





