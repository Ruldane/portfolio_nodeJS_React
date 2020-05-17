const express = require('express');
const routeur = express.Router();
const projectController = require('../controllers/project')
const authService = require('../services/auth')

routeur.post('',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    projectController.saveProject);

routeur.get('', projectController.getProject);

module.exports = routeur;
