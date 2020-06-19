const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');


var indexController = require('./index.js');
app.use('/',indexController);
var bookController = require('./book.js')
app.use('/book',bookController);  


var server = app.listen(5000,function(){
    console.log("Server is running in 5000 port");
})