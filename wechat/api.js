var express = require('express');
var getpool = require('./db');
var apiDat = express();
var fs = require('fs');
var xlsx = require('node-xlsx');
var bodyParser = require('body-parser');
var getData = {
    total: 0,
    listitem:[]
};
var name = 0;
apiDat.use(bodyParser.json());
apiDat.use(bodyParser.urlencoded({ extended: false }));
apiDat.post('/',function(request,response){
    name+=1;
    console.log(name);
    let pagenum = Number(request.body.pagenum);
    let pagesize = Number(request.body.pagesize);
    const offset = (pagenum-1)*pagesize;
    const limit = pagesize;
    let count = 0;
    let listitem=[];
    const qazwsx = new getpool();
    const sql="select * from pob_rtu limit "+offset+","+limit;
    const sqlcount="select count(1) as num  from pob_rtu";
    console.log(sql,sqlcount);
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
                        // response.end(JSON.stringify(getData));
                    } catch (error) {
                        console.log(err);
                    }
                });
             data.end();
        });
        response.end('你是第'+name+'个访问者');
});
apiDat.get('/export',(request,response)=>{
    const data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
    const buffer = xlsx.build([{name:'mySheetName',data: data}]);
    fs.writeFileSync('b.xlsx',buffer,'binary');
    response.end('success!');
});
module.exports = apiDat;