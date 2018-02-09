const express = require("express");
const route = express.Router();

//this is the main route of the app.
//Create the route
route.get("/", (req,res,next)=>{
 
    //render the view
    res.render("main");
 
});


//export the module
module.exports = route;
