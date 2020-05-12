const express = require('express');
const routeur = express.Router();
const blogController = require('../controllers/blog')
const authService = require('../services/auth')

routeur.get('', blogController.getBlog);

// s means slug
routeur.get('/s/:slug', blogController.getBlogBySlug);

routeur.get('/me',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    blogController.getUserBlogs);


routeur.get('/:id', blogController.getBlogById)

routeur.post('',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    blogController.saveBlog);

routeur.patch('/:id',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    blogController.updateBlog);

routeur.delete('/:id',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    blogController.deleteBlog);

module.exports = routeur;
