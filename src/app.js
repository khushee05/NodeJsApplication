const path = require('path')
const  express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const direc = path.join(__dirname,'../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//Setup handlers engines and view location
app.set('view engine', 'hbs') //put folder name as view and this single line is enough
app.set('views', viewpath)
hbs.registerPartials(partialpath)


//Setup static directory to serve
app.use(express.static(direc))


app.get('',(req,res) =>{

    res.render('index',{title: 'Weather', name: 'Khushee Jain'})
})

app.get('/help', (req,res)=>{
    res.render('help',{helptext: 'This is help page. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est quod veritatis, ratione consequuntur iusto officia officiis dicta dignissimos explicabo exercitationem optio', title: 'Help', name:'Khushee Jain'})
})

app.get('/about', (req,res)=>{
    res.render('about',{title: 'About Me',desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est quod veritatis, ratione consequuntur iusto officia officiis dicta dignissimos explicabo exercitationem optio", name: 'Khushee Jain'})
    
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geoCode(req.query.address, (error, { latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: "It is snowing",
    //     location: "Jaipur",
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.hi){              //at the url search query
        res.send({
            error: "Not allowed"
        })
    }
    console.log(req.query.hi)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Khushee Jain',
        errorMessage: 'Page Not FOund'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Khushee Jain',
        errorMessage: 'Page Not FOund'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port')
})