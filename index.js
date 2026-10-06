import express from 'express'
import pg, { Pool } from 'pg'
const app = express()
const port = 3000
const {Pool} = pg

app.use(express.json())
app.use(
    express.urlencoded(
        {extended: true,

        
    })
)
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'apasaja', //sesuaikan password masing2
    port: 5432,
})

app.get('/', (req, res, next) => {
    console.log("TEST DATA : ");
    pool.query('Select * from biodata')
        .then(testData => {
            console.log(testData)
            res.send(testData.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
})

app.listen(port, () => {
    console.log('Server running on port ${port}');
})