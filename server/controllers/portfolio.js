// model with Mongoose
const Portfolio = require('../models/portfolio')

exports.getPortfolioById = (req,res) => {
    const portfolioId = req.params.id
    Portfolio.findById(portfolioId)
        .select('-__v')
        .exec((error, foundPortfolio) => {
            if (error) {
                return res.status(422).send(error)
            }
            return res.json(foundPortfolio)
        })
}

// save portfolio
exports.savePortfolio = (req, res)=> {
    const portfolioData = req.body;
    const userId = req.user && req.user.sub;
    const portfolio = new Portfolio(portfolioData)
    portfolio.userId = userId;

    portfolio.save((error, createPortfolio) => {
        if (error){
            return res.status(422).send(error)
        }
        return res.json(createPortfolio)
    })
}

exports.getPortfolio = (req, res) => {
    // {} means all portfolio
    Portfolio.find({})
        .sort({'startDate': 1})
        .exec((error, allPortfolios)=> {
            if (error){
                return res.status(422).send(error)
            }
            return res.json(allPortfolios);
        })
}

// update data
exports.upddatePortfolio=(req, res)=> {
    const bookId = req.params.id
    const bookData = req.body;

    Portfolio.findById(bookId, (err, foundPortfolio) => {
        if (err){
            return res.status(422).send(err)
        }
        foundPortfolio.set(bookData);
        foundPortfolio.save((err, savePortfolio) => {
            if (err){
                return res.status(422).send(err)
            }
            return res.json(savePortfolio)
        })
    })
}

//delete inside model
exports.deletePortfolio= (req, res) =>{
    const portfolioId = req.params.id

    Portfolio.deleteOne({_id: portfolioId}, (err, deletePortfolio) =>{
        if (err){
            return res.status(422).send(err)
        }
        return res.json({status: 'DELETED'})
    })
}
