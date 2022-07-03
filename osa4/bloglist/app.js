const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
mongoose.connect(config.MONGODB_URI)

module.exports = app