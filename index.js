const express = require("express");
const server = express();

//other imports
const path = require("path");
const bodyParser= require("body-parser");


//body parser for the params
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());


//import the routes
const main = require("./routes/main");
const uploads = require("./routes/uploads");

//static folders that express will use
//to look for files

//main public folder
server.use(express.static("./public"));
//uploads Multer folder
server.use(express.static("./uploads"));

//set the view engine to PUG
server.set("views", path.join(__dirname,"views"));
server.set("view engine", "pug");



//add the routes
server.use("/", main);
server.use("/", uploads);

//create the server
server.listen(3000, ()=>{
    console.log("Server is running @ localhost:3000");
});



