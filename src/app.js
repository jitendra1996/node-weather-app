const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode=require('./utils/geocode');
const weatherReport=require('./utils/weatherReport');

const app = express();
const port = process.env.PORT || 3000 ;

//Define paths to Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../tamplates/views');
const partialsPath = path.join(__dirname ,'../tamplates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req , res)=>{
    res.render('index',{
        title:'Weather',
        name:'jitendra kumar'
    });
})

app.get('/help', (req , res) =>{
    res.render('help',{
        title : 'Help',
        msg : `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam voluptate dolor 
        laborum dolorem nobis cum 
        id quaerat nostrum molestiae, neque amet iusto quod deleniti earum reprehenderit incidunt architecto quia magni!`,
        name : 'Jitendra kumar'
    });
});

app.get('/about' , (req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Jitendra kumar'
    });
});

app.get('/weather', (req , res) => {
    if(!req.query.address){
        return res.send({
            error : 'provide any location'
        })
    }else{
        geocode(req.query.address, (error , {latitude , longitude , location} = {}) => {
            if(error){
                return res.send({ error : error});
            }else{
                weatherReport(req.query.address, (error , {name,country,temp,temp_min,temp_max,pressure,humidity,wind_speed,sky}={}) => {
                    if(error){
                        return res.send({error : error});
                    }else{
                        res.send({
                            city : `${name}`, 
                            country : `${country}` , 
                            temperature : `${temp}` , 
                            minium : `${temp_min}` ,
                            maximum : `${temp_max}` ,
                            pressure : `${pressure}` ,
                            humidity : `${humidity}` ,
                            speed : `${wind_speed}` , 
                            details : `${sky}`,
                            latitude : `${latitude}`,
                            longitude : `${longitude}`,
                            location : `${location}`
                       })
                    }
                });
            }
        });
    }           
});

app.get('/about/*' , (req , res) => {
    res.render('errorPage',{
        name: 'Nothing more!!!',
        msg : `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam voluptate dolor 
        laborum dolorem nobis cum 
        id quaerat nostrum molestiae, neque amet iusto quod deleniti earum reprehenderit incidunt`,
        title : '404',
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage',{
        name:'Help article not found',
        msg : `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam voluptate dolor 
        laborum dolorem nobis cum 
        id quaerat nostrum molestiae, neque amet iusto quod deleniti earum reprehenderit incidunt`,
        title : '404'
    })
})

app.get('*', (req , res) => {
    res.render('errorPage',{
        name : 'Page not found',
        msg : `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam voluptate dolor 
        laborum dolorem nobis cum 
        id quaerat nostrum molestiae, neque amet iusto quod deleniti earum reprehenderit incidunt`,
        title : '404'
    })  
})


app.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});
