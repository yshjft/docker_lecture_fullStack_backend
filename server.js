const express =  require('express')
const morgan = require('morgan')

const app = express()
const db = require('./db')
app.set('PORT', process.env.PORT || 5000)

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded())


// 테이블 생성하기
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('results', results)
})

// api
app.get('/api/values', (req, res, next)=>{
    db.pool.query('SELECT * FROM lists;', (err, results, fields)=>{
        if(err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})

app.post('/api/value', (req, res, next)=>{
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (req, res, next) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json({success: true, value: req.body.value})
        }
    )
})


app.use((req, res, next)=>{
    const err = new Error()
    err.status = 404
    next(err)
})

app.use((req, res, next, err)=>{
    console.log(err)
    res.json(err.status || 500, err.message)
})

app.listen(app.get('PORT'), ()=>{
    console.log(app.get('PORT'), '번 포트에서 대기 중')
})