var getpool = require('./mysql');
var express = require('express');
var app =  express();
var bodyParser = require('body-parser');
var login = require('./Test');
var getData = {
    total: 0,
    listitem:[]
};
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
app.use('/login',login);
app.get('/',function(request,response){
    // let result = object;
    const res = {
        name: 18,
        data:request.query.data
    }
    let count = 0;
    listitem=[];
    const qazwsx = new getpool();
    const sql="select * from wasz";
    const sqlcount="select count(1) as num  from wasz";
        qazwsx.then((data)=>{
            data.connect();
                data.query(sql,(err,result) => {
                    try {
                        listitem = result;
                    } catch (error) {
                        console.log(err);
                    }
                });
                data.query(sqlcount,(err,result)=>{
                    try {
                        count = result[0].num;
                        getData.total = count;
                        getData.listitem = listitem;
                        console.log(new Date());
                        response.end(JSON.stringify(getData));
                    } catch (error) {
                        console.log(err);
                    }
                });
             data.end();
        });
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
    const sql = ' SELECT * FROM LOGINTABLE WHERE NAME = ? ';
    const sqlparam = [request.body.name];
    console.log(sqlparam);
    datemysql.query(sql,sqlparam,function(err,result){
        if(err){
            throw err;
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

app.post('/zhuce',function(request,response){
    const datemysql = mysql.createConnection({
        host:'localhost',
        user:'root',       
        password:'123456',
        port:'3306',         
        database:'mysql'
    });

    datemysql.connect();
    const sql = 'INSERT INTO LOGINTABLE VALUES(?,?)'
    const sqlparam = [request.body.name,request.body.password];
    datemysql.query(sql,sqlparam,function(err,result){
        if(err){
            throw err;
            return;
        } else {
            response.end('success');
        }
    });
    datemysql.end();
}); 



app.get('/kobe',(request,response) => response.send('kobe is the best!'));

var server = app.listen(3600,'0.0.0.0',() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('address ',host,port);
});


