// model with Mongoose
const Portfolio = require('../models/portfolio')

// save book
exports.savePortfolio = (req, res)=> {
    const portfolioData = req.body;
    const portfolio = new Portfolio(portfolioData)

    portfolio.save((err, createPortfolio) => {
        if (err){
            return res.status(422).send(err)
        }
        return res.json(createPortfolio)
    })
}

// get book
exports.getPortfolio = (req, res) => {
    // {} means all book
    Portfolio.find({}, (err, allPortfolios)=> {
        if (err){
            return res.status(422).send(err)
        }
        return res.json(allPortfolios);
    })
}


