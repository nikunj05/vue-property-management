const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

global.Property = require('./api/models/propertyModel')

const routes = require('./api/routes/propertyRoutes')
const userRoutes = require('./api/routes/userRoutes')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/PropertyApp', { useNewUrlParser: true })

const port = process.env.PORT || 4000
const app = express()

app.use(express.static('public'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)
app.use(userRoutes)

// routes(app)
app.listen(port)

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` })
})

console.log(`Server started on port ${port}`)
