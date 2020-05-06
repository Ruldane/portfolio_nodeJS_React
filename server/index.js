const express = require('express');
const next = require('next');
const mongoose= require('mongoose')
const routes = require('../routes')
const bodyParser = require('body-parser')

const bookRoutes = require('./routes/book')

//secret key
const config = require('./config')

//portfolio
const portfolioRoutes = require('./routes/portfolio')

//service
const authService = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const secretData = [
    {
        title: 'secretData 1',
        description: 'Plans how to build spaceship'
    },
    {
        title : 'secretData 2',
        description: 'ma secret password'
    }
]

mongoose.connect(config.DB_URL, {useNewUrlParser: true}).then(()=>console.log('i am connecting'))
    .catch((error)=>{
        console.log(error)
    })

app.prepare().then(() => {

    const server = express();


    server.use(bodyParser.json())

    server.use('/api/v1/books', bookRoutes)

    server.use('/api/v1/portfolios', portfolioRoutes)


    server.get('/api/v1/secret', authService.checkJTW, (req, res) => {
        return res.json(secretData)
    })

    server.get('/api/v1/secrets', authService.checkJTW, authService.checkRole('siteOwner'), (req, res)=> {
        return res.json(secretData)
    })

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.use(function (err, req, res) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({title: "Unauthorized", detail: 'Unauthorized access'});
        }
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) { console.log(err); }
        console.log(`> Ready on port ${PORT}`)
    })
})
