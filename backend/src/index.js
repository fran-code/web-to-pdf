const express = require('express')
const env = require('./env')
const cors = require('cors')

const routerPdf = require('./routes/pdf')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// Routes
app.use('/pdf', routerPdf)

app.listen(env.port, () => console.log(`App listening on port: ${env.port}`))

module.exports = app
