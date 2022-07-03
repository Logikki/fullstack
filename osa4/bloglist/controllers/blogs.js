const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
})

// blogsRouter.get('/api/blogsRouter/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   if (blog) {
//     response.json(blog.toJSON())
//   } else {
//     response.status(404).end()
//   }
// })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.url || !body.title) {
    response.status(400).send('Bad request')
  }
  else {
    const blog = new Blog({
      title : body.title,
      author : body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
      
  }
})

blogsRouter.put('/:id', (req, res) => {
  const body = req.body

  const blog = {
    title : body.title,
    author : body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(req.params.id, blog, {new : true})
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => console.error(error))

})

module.exports = blogsRouter
