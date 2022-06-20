const express = require('express')
const app = express()
const Blogs = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())
app.use(Blogs)
mongoose.connect(config.MONGODB_URI)

module.exports = app