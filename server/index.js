const express = require('express');
const app = express();
require('dotenv').config();//to .env file
const port = process.env.PORT;
const cors = require('cors');


app.use(cors());//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(express.json())




//Routes
app.use('/', require('./MVC/routes/User'));


app.listen(port,()=>{
    console.log("server is running in port " + port);
})

