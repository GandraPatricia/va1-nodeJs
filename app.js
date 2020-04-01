const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const produtoRoutes = require('./api/routes/produtos');

mongoose.connect('mongodb+srv://patricia:analista1@unidesc-pw-patricia-b7ext.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    userUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-control-Allow-Origin", "*");
    res.header(
        "Access-control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if (req.method == "OPTIONS") {
        req.header("Access-control-Allow-Methods", "PUT, POST,PATH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
})


app.use('/produtos', produtoRoutes);
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

