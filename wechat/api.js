var express = require('express');
var getpool = require('./db');
var apiDat = express();
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
apiDat.post('/export',(request,response)=>{

});
module.exports = apiDat;