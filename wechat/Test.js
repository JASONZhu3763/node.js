var express = require('express');
var check = express();
var getpool = require('./db');
var getData = {
    total: 0,
    listitem:[]
};
check.get('/info',(request,response) => {
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
                        const qaz = 'qazwsxedc'
                        console.log(new Date());
                        response.end(JSON.stringify(qaz));
                    } catch (error) {
                        console.log(err);
                    }
                });
             data.end();
        });
});

module.exports = check;