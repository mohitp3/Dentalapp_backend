const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection')

const app = express();
dotenv.config({path:'config.env'})
const PORT  = process.env.PORT || 6000;


/** COnnect Database */
connectDB();

//parse request to body parser
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//load routes 
app.use('/', require('./server/routes/router'))

app.listen(PORT,()=>console.log(`server is running on 
http://localhost:${PORT}
`));