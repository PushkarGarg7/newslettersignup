const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static("public"));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup_page.html");
});
app.post("/",function(req,res){
    var firstname=req.body.fn;
    var secondname=req.body.sn;
    var email=req.body.email;
    // res.write(firstname);
    // res.write(secondname);
    // res.write(email);
    // res.send();
    var data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:secondname
            }
        }]

    };

    var jsondata=JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/06d655ed6a";                       //we need listid to access which list in the whole server we are adding to;
    const options={
        method:"POST",
        auth:"pushkar:2d33de89c132abe3170535750d4f4fc2-us13",

    }
    const request=https.request(url,options,function(response){
        var code=response.statusCode;
        if(code===200){
            res.send("done");
        }
        else{
            res.send("retry");
        }
        response.on("data",function(data){
            
           // console.log(JSON.parse(data));
        });
    });
    request.write(jsondata);
    request.end();


});
app.listen(process.env.PORT || 3000,function(){
    console.log("server running");
});





//apikey=2d33de89c132abe3170535750d4f4fc2-us13;       listid:06d655ed6a