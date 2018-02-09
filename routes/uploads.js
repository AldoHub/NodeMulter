const express = require("express");
const route = express.Router();
// we need the file system to delete the images.
const fs = require("fs"); 


//import mongoose
const mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost/images");
let db = mongoose.connection;


//multer config
const upload = require("../multer/storage");

//Model
const Image = require("../models/images");



route.delete("/uploads/:id", (req,res)=>{
    //get the id from the ajax response
    //in this case the id is the name of the image
    //we need it in order to delete the image from the uploads directory
    let query= {image:req.params.id};

    Image.remove(query, (err)=>{
        if(err){
            console.log(err);
        }else{
            //delete the image from the directory
            //this is where we need the File System.
            //we use the params.id to find the file
            let $filePath= "./uploads/" + req.params.id
            fs.unlinkSync($filePath, (err)=>{
                if(err){
                    //send an error if the image was not deleted
                    console.log("couldnt delete " + req.params.id + " image");
                }
                                
                               
            });

            res.send("The image was deleted...");
        }
    });

 });
 

//-----Manage the get requests.
route.get("/uploads", (req, res, next)=>{
   //find the images inside mongodb
   Image.find({}, (err, images)=>{
       if(err){
           console.log(err);
       }else{
           //return the array of images found.
           res.render("uploads", {
               images: images
           });
       } 
   });
   
    
});


//-----Manage the post requests.
route.post("/uploads", (req, res, next)=>{
    //let multer manage the requests
    //which are passed to the upload function
    //by the main request.
    //the function if everything went right
    //will upload the file without cheking if already exists

   

    // ---------- MULTER UPLOAD FUNCTION -------------
    upload(req, res, function (err) {
        // need to check if the req.file is set.
        if(req.file == null || req.file == undefined || req.file == ""){
            //redirect to the same url            
            res.redirect("/");
            
        }else{
            // An error occurred when uploading
            if (err) {
                console.log(err);
            }else{
                // Everything went fine
                //define what to do with the params
                //both the req.body and req.file(s) are accessble here
                console.log(req.file);
        
        
                //store the file name to mongodb    
                //we use the model to store the file.
                let image = new Image();
                image.image = req.file.filename;
        
                
        
                //save the image
                image.save(()=>{
                    if(err){
                        console.log(err);
                    }else{
                        //render the view again    
                        res.redirect("/uploads");
        
                    }
                });

            }
    
        }

    }); 


    
});



//export the module
module.exports = route;
