$(function(){
   $(".delete").on("click", function(){
        //get the parent id, in this case is the src
        let id= $(this).next("IMG").attr("src");

        //we send the ajax request from here
        //to the route in express.
        //make the ajax request to the delete route
        $.ajax({
            type: "delete",
            url: "/uploads/" + id,
            success: function(response){
                alert("Image ready to be deleted...");
                //we need to redirect here
                //one the ajax reached the route
                //will exec the redirect
                location.href="/uploads";
            },
            error: function(err){
                //return the message from the server if an
                //error happens.
                console.log(err.statusText);
            }

        });
    });

    //this is just a simple anim using jquery.
    $(".image:odd").css({"animation-delay": "0.300s"});

});