const express = require('express');
const routeur = express.Router();
const portfolioController = require('../controllers/portfolio')
const authService = require('../services/auth')

routeur.post('',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    portfolioController.savePortfolio);

routeur.get('',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    portfolioController.getPortfolio)

module.exports = routeur;
