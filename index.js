const express = require('express')
const app = express()
const port = 3001
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://manhala:ilovemom@d@localhost:5432/gled');
db.any('select * from transactions').then((data) => {
  console.log('DATA:', data[0])
})
.catch((error) => {
  console.log('ERROR:', error)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})