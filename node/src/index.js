const express = require('express')
const mysql = require('mysql2')
const app = express()

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const pool = mysql.createPool(config)
const createRepo = () => {
  pool.query(
    `CREATE TABLE IF NOT EXISTS people(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
  )`,
    (err, results) => {
      if (err) {
        throw err
      } else {
        console.log('table created', results)
      }
    }
  )
}

app.get('/', (req, res) => {
  createRepo()

  pool.query(`INSERT INTO people(name) values('Bernardo')`, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err)
    } else {
      pool.query('SELECT name FROM people', (err, results) => {
        if (err) {
          console.error('Error selecting data:', err)
        } else {
          let names = results.map((row) => row.name).join(', ')
          res.send(`<h1>Full Cycle Rocks!</h1><p>${names}</p>`)
        }
      })
    }
  })
})

app.listen(3000, () => {
  console.log('Server listens on port 3000')
})
