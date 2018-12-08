var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var apiData = require('./api');
var check = require('./Test');
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*',function(request,response,next){
    response.header('Access-Control-Allow-Origin','*');
    response.header('Access-Control-Allow-Headers','content-type');
    response.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
    response.header('Content-Type', 'text/plain;charset=UTF-8');
    if(request.method.toLowerCase()=='options') {
        response.send(200);
    } else {
        next();
    }
});
app.use('/api',apiData);
app.use('/check',check);
app.listen(3600,'0.0.0.0',() =>{
    console.log('port:',3600);
})