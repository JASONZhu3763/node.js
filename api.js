var express = require('express');
var getpool = require('./db');
var apiDat = express();
var fs = require('fs');
var xlsx = require('node-xlsx');
var getData = {
    total: 0,
    listitem:[]
};
apiDat.get('/',function(request,response){
    // let result = object;
    const res = {
        name: 18,
        data:request.query.data
    }
    let count = 0;
    let listitem=[];
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
apiDat.get('/export',(request,response)=>{
    const data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; 
    const option = {'!merges': [ range ]};
    const buffer = xlsx.build([{name:'mySheetName',data: data}],option);
    fs.writeFileSync('b.xlsx',buffer,'binary');
    response.end('success!');
});
module.exports = apiDat;