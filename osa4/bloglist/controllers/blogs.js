const Blog = require('../models/blog')
const express = require('express')
const Blogs = express()


Blogs.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

Blogs.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// Blogs.get('/api/blogs/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   if (blog) {
//     response.json(blog.toJSON())
//   } else {
//     response.status(404).end()
//   }
// })
  
Blogs.post('/api/blogs', (request, response) => {
  if (!request.body.url || !request.body.title) {
    response.status(400).send('Bad request')
  }
  else {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

Blogs.put('/api/blogs/:id', (req, res) => {
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

module.exports = Blogs
