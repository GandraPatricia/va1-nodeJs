const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 const dotenv =require('dotenv');
 const jwt = require ('jsonwebtoken');


const produtoRoutes = require('./api/routes/produtos');



mongoose.connect('mongodb+srv://patricia:analista1@unidesc-pw-patricia-b7ext.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    userUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    // res.header("Access-control-Allow-Origin", "*");
    // res.header(
    //     "Access-control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    //     "Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    // )
    // if (req.method == "OPTIONS") {
    //     req.header('Access-Control-Allow-Methods', 'PUT, POST,PATH, GET, DELETE');
    //     return res.status(200).json({});
    // }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATH, OPTIONS');
    next();
})


app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuariosRoutes);

/*app.use('/jwt',(req, res)=>{
    let privatekey = process.env.PRIVATE_KEY;
    let token = jwt.sign({"body":"unidesc"},privatekey, {algorithm:'HS256'});
    res.send(token);
});*/

app.use((req, res, next) => {
    const error = Error('not found');
    error.status = 404;
    next(error);

})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;

