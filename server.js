const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleWare/error');
const connectDB =require('./config/db');


dotenv.config({path: './config/config.env'});

connectDB();

//route files
const user = require('./routes/user');
const child = require('./routes/child')

const app =express();

// Body parser
app.use(express.json());
// cookie  Parser
app.use(cookieParser());
// dev logging middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));

}

app.use('/api/v1/child', child)

app.use('/api/v1/user',user);

app.use(errorHandler);

const PORT= process.env.PORT || 5000;

const server = app.listen(
    PORT,
     console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold)
     );
     
    //  Handle unhandled promise rejection 
    process.on('unhandledRejection',(err,Promise) => {
        console.log(`Error: ${err.message}`.red);
        // close server & exit process
        server.close(() => process.exit(1));
    });