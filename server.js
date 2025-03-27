//env configuration
const envVar = require("dotenv");
envVar.config({path: "./files/config.env"})

//express import
const exPrs = require('./express/allexpress');
const mongoose = require("mongoose");

port = process.env.PORT || 8000;

//connecting to mongodb and listning to the server
mongoose.connect(process.env.Mongo_url).then((connection) =>{
    exPrs.listen(port,()=>{
        console.log("srver started at port " + port)
    })
}).catch(err => {
    console.log(err)
})
