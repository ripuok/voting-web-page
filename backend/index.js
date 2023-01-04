require('dotenv').config();
const express = require('express');
const bodyParser =require('body-parser');
const user = require('./user');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(cors());
app.use('/user', user )



const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("Server Running on port "+PORT)
});