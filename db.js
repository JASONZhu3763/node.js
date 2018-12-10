const mysql = require('mysql');
// 创建连接池
const getpool = function getPool(){
   const promise =  new Promise((resolve,reject)=>{
        var pool = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '123456',
            database: 'mysqlzj',
            port: 3306
        });
        resolve(pool);
    });
 return promise;
}


module.exports=getpool;



 