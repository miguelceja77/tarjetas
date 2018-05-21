var express = require('express');
var path= require('path');
var cokieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// configure bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// views with jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// routes 
app.get('/', function(req, res){
    res.render('index');
});

app.post('/charge', function(req, res){
    var keys = require('./keys.json')
    conekta = require('conekta');
    conekta.api_key = keys.pivate
    conekta.Customer.create(req.body, function(err, charge){
        if (err){
            return res.render('charge', {
                charge: res
            });
        }
        res.render('charge', {
           charge: charge.toObject() 
        });
    });
});

app.listen(4000);

module.exports = app;