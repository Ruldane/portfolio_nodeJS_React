const express = require('express');
const compression = require('compression')
const path = require('path');
const next = require('next');
const mongoose= require('mongoose')

const bodyParser = require('body-parser')

const bookRoutes = require('./routes/book')

//secret key
const config = require('./config')

//routes
const portfolioRoutes = require('./routes/portfolio')
const blogRoutes = require('./routes/blog')
const projectRoutes = require('./routes/project')

//service
const authService = require('./services/auth')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

robotsOptions={
    root: path.join(__dirname, '../public'),
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
}

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

mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(()=>console.log('i am connecting on Mongo DB'))
    .catch((error)=>{
        console.error(error)
    })

app.prepare().then(() => {

    const server = express();
    server.use(compression());
    server.use(bodyParser.json())

    server.use('/api/v1/books', bookRoutes)
    server.use('/api/v1/portfolios', portfolioRoutes)
    server.use('/api/v1/blogs', blogRoutes)
    server.use('/api/v1/projects', projectRoutes)

    server.get('/robots.txt', (req, res) => {
        return res.status(200).sendfile('robots.txt', robotsOptions)
    })

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
        if (err) { console.error(err); }
        console.log(`> Ready on port ${PORT}`)
    })
})
