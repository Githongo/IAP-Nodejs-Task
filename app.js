const express = require('express');
const app = express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');

const studentRoutes = require('./api/routes/students');






//morgan route to monitor requests
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//preventing CORS errors in the browser
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requesredd-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


//no6vf0gbshWFjXIh

// routes 
app.use('/api/v1/student',studentRoutes);




app.use((req, res, next)=>{

    const error = new Error('Not found');
    error.status=404;
    next(error);
    
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;