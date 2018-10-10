const mysql = require('mysql');

const express = require("express");

const app =  express();

const bodyParser = require('body-parser');

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

app.get('/',function(request,response){
    
    const res = {
        name: 18,
        data:request.query.data
    }
    console.log(res);
    
    response.status(200).end(JSON.stringify(res));
});

app.post('/tempo',function(request,response){
    var res = {
        one: 1,
    }
    console.log(request.body);
    console.log(res);
    response.end(JSON.stringify(res));
});

app.post('/zjzjzj',function(request,response){

    const datemysql = mysql.createConnection({
        host:'localhost',
        user:'root',       
        password:'123456',
        port:'3306',         
        database:'mysql'
    });

    datemysql.connect();
    const sql = ' SELECT * FROM LOGINTABLE WHERE NAME = ?';
    const sqlparam = [request.body.name];
    console.log(sqlparam);
    datemysql.query(sql,sqlparam,function(err,result){
        if(err){
            throw err;
            console.log(err.message);
            return;
        }
        console.log(result.length);
        const length = Number(result.length);
        if(length === 0){
            response.end('请输入正确的用户名和密码');
        } else{
            var okokok = JSON.stringify(result);
            response.end(JSON.stringify(result));
        }
        
    })
    datemysql.end();


});



app.get('/kobe',(request,response) => response.send('kobe is the best!'));

app.listen(3600,() => console.log('Example app listening on port 3600!'));


