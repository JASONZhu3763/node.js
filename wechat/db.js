const mysql = require('mysql');
// 创建连接池
const getpool = function getPool(){
   const promise =  new Promise((resolve,reject)=>{
        var pool = mysql.createConnection({
            host: '10.10.15.79',
            user: 'ytldb2017',
            password: 'ytldb2017',
            database: 'ytldb',
            port: 3306
        });
        resolve(pool);
    });
 return promise;
}


module.exports=getpool;



 