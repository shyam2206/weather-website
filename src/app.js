const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Shyam Agrawal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Shyam Agrawal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText : 'This is Help Page',
        title : 'Help',
        name : 'Shyam Agrawal'
    })
})

app.get('/weather', (req, res) => {
   if (!req.query.address) {
        return res.send({
            error : 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error) {
            return res.send({error})
        }
        forecast(longitude,latitude,(error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        }) 
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404 Help',
        name: 'Shyam',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Shyam Agrawal',
        errorMessage : 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})