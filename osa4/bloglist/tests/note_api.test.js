const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe('Note api tests', () => {
  test('0 likes is default', async () => {
    await api.post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .expect(201)
    const response = await api.get('/api/blogs')
    const allBlogs = response.body

    allBlogs.map(blog => {
      if(blog.id === helper.blogWithoutLikes.id) {
        expect(blog.likes).toEqual(0)
      }
    })
      
  }, 10000)

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.blogs.length)
  })
  
  test('ID exists', async () => {
    const response = await api.get('/api/blogs') 
    expect(response.body[0].id).toBeDefined()
  })
  
  test('Adding a blog increases blog count by one', async () => {
    const initialResponse = await api.get('/api/blogs')
    await api.post('/api/blogs',helper.oddBlog)
    const afterResponse = await api.get('/api/blogs')
    expect(initialResponse.body).toHaveLength(afterResponse.body.length - 1)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('If url or title is not defined, expect post request to fail', async () => {
    await api.post('/api/blogs')
      .send(helper.blogWithoutUrlOrTitle)
      .expect(400)
      .expect('Bad request')
  })

  test('Deletion of a blog decreases blog count by one', async () => {
    const initialBlogs = await api.get('/api/blogs').expect(200)
    const blogToDelete = initialBlogs.body[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const afterDeletion = await api.get('/api/blogs').expect(200)
    expect(initialBlogs.body).toHaveLength(afterDeletion.body.length + 1 )
  })

  test('Blog modification', async () => {
    const initial = await api.get('/api/blogs').expect(200)
    const notModified = initial.body[0]
    const newBlog = { ...notModified, likes : notModified.likes - 1}

    const modified = await api.put(`/api/blogs/${notModified.id}`)
      .send(newBlog)
    expect(modified.body.likes).toEqual(notModified.likes-1)
    
    //varmistus
    const initialmod = await api.get('/api/blogs').expect(200)
    const likesModified = initialmod.body[0]
    expect(likesModified.likes).toEqual(notModified.likes-1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})