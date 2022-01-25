const path = require("path");
// Express is actually a function as opposed to something like an object, and we call it to create a new express application.
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// __dirname contaons a path to the directory the current script lives in
// console.log(__dirname)
// ../.. goes up to folder
// console.log(path.join(__dirname, '../..'))
// console.log(path.join(__dirname, '../public'))
const app = express();

//Define pathes for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setupstatic directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  // Render allow us to render one of our views we've configured express to use the view engine hbs
  // So with render we can render one of our handlebars templates.
  // All we need to do is provide as the first argument, the name of the particular view we want to use and there is no need for the file extension.
  res.render("index", {
    // To provide a value that is accessible in the template, we have to provide a second argument to render
    // so the first argment is the name of the view to render, and the second argument is an object which contains all of the values you want that view to be able to access.
    title: "Weather",
    name: "POYING HSU",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "POYING HSU",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helptext: "This is some helpful text.",
    name: "POYING HSU",
  });
});

// get method, let us configure what the server should do when someone tries to get the resource at a spcific url
// app.get( '', (req, res) => {
//     // The callback function gets called with two very important arguments.
//     // The first is an object containing informationabout the incoming request to the server.(req)
//     // The other argument is the response. This contains a bunch of methods allowing us to customize what we're going send back to the requester.
//     res.send('<h1>Weather</h1>')
// })

/**
 * Challenge: Create two more HTML files
 *
 * 1. Create a html page for about with "About" title
 * 2. Create a html page for help with "Help" title
 * 3. Remove the old toute handlers for both
 */

// app.get('/help', (req, res) => {
//     // Express is going to detect we've provide an object. It is going to stringify the JSON for us and it's going to get it sent to the requester
//     res.send([{
//             name: 'Edwin',
//             age: 27
//         },{
//             name: "Cool",
//             age: 23
//         }
//     ])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    if(error){
      return res.send({
        error: error
      })
    }

    forecast(latitude, longitude, (error, forecastdata)=>{
      if(error){
        return res.send({
          error
        })
      }
      res.send({
        forecastdata: forecastdata,
        location, //same as location: location,
        address: req.query.address
      })
    })
  })

});

// How server get query string, information about query string lives on request
app.get('/products', (req,res)=>{
  console.log(req.query.search)
  if(!req.query.search){
    return res.send({ // By using return, we are stopping the function execution, which is a pretty common pattern with express
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })

})

app.get('/help/:notfound', (req,res)=>{
    res.render('404', {
        title: '404',
        name: "POYING HSU",
        errorMessage: req.params.notfound+' article not found.'
    })
})

// To match everything else, Express provides us with the wild character we can use in our url.
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'POYING HSU',
        errorMessage: 'Page not found'
    })
})

// To start the server up, we have to use one more method on app which will only ever use a single time.
// app.listen, this starts up the server and it has to listen on a specific port for the moment.
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
