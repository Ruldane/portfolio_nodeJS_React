const express = require('express');
const routeur = express.Router();
const portfolioController = require('../controllers/portfolio')
const authService = require('../services/auth')

routeur.post('',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    portfolioController.savePortfolio);

routeur.get('', portfolioController.getPortfolio);

routeur.get('/:id', portfolioController.getPortfolioById);

routeur.patch('/:id',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    portfolioController.upddatePortfolio);

routeur.delete('/:id',
    authService.checkJTW,
    authService.checkRole('siteOwner'),
    portfolioController.deletePortfolio)

module.exports = routeur;
