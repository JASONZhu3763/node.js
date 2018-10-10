const mysql = require('mysql');
// const connect = mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         password:'123456',
//         port:'3306',
//         database:'mysql'
//     });

// function datamysql(){
//     this.falg = true;
//     this.pool = mysql.createConnection({
//         host:'localhost',
//         user:'root',       
//         password:'123456',
//         port:'3306',         
//         database:'mysql'
//     });

//     this.getpool = function(){
//        if(this.falg){
//            this.pool.on('connection', () => {
//                connection.query('select session auto_increment_increment');
//                this.falg = false;
//            });
//        }
//        return this.pool;
//     }
// }

// module.exports = datamysql;

// 创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test1',
    port: 3306
});

// 连接公用方法
var query=function(sql,options,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,options,function(err,results,fields){
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(err,results,fields);
            });
        }
    });
};

module.exports=query;



 