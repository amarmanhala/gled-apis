if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const app = express()
const port = 3001
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://'+ process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@d@' + process.env.DB_HOSTNAME + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME);
db.any('select * from transactions').then((data) => {
  console.log('DATA:', data[0])
})
.catch((error) => {
  console.log('ERROR:', error)
})
console.log(process.env.NAME);
;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})