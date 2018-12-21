var express = require('express');
var getpool = require('./db');
var apiDat = express();
var fs = require('fs');
var xlsx = require('node-xlsx');
var Excel = require('exceljs');
const nodeExcel = require('excel-export');
var bodyParser = require('body-parser');
var getData = {
    success: '',
    total: '',
    listitem: []
};
var name = 0;

//设置　start-end　行单元格水平垂直居中/添加边框
function rowCenter(arg_ws, arg_start, arg_end) {
    for (i = arg_start; i <= arg_end; i++) {
        arg_ws.findRow(i).alignment = { vertical: 'middle', horizontal: 'center' };
        //循环 row 中的　cell，给每个 cell添加边框
        arg_ws.findRow(i).eachCell((cell, index) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        })

    }
}

//设置　start-end 列的宽度
function colWidth(arg_ws, arg_cols, arg_width) {
    for (i in arg_cols) {
        arg_ws.getColumn(arg_cols[i]).width = arg_width;
    }
}

apiDat.use(bodyParser.json());
apiDat.use(bodyParser.urlencoded({ extended: false }));
apiDat.post('/', function (request, response) {
    name += 1;
    console.log(name);
    let pagenum = Number(request.body.pagenum);
    let pagesize = Number(request.body.pagesize);
    const offset = (pagenum - 1) * pagesize;
    const limit = pagesize;
    let count = 0;
    let listitem = [];
    const qazwsx = new getpool();
    const sql = "select * from pob_rtu limit " + offset + "," + limit;
    const sqlcount = "select count(1) as num  from pob_rtu";
    console.log(sql, sqlcount);
    qazwsx.then((data) => {
        data.connect();
        data.query(sql, (err, result) => {
            try {
                listitem = result;
            } catch (error) {
                console.log(err);
            }
        });
        data.query(sqlcount, (err, result) => {
            try {
                count = result[0].num;
                getData.total = count;
                getData.listitem = listitem;
                getData.success = 1;
                response.end(JSON.stringify(getData));
            } catch (error) {
                console.log(err);
            }
        });
        data.end();
    });
    // response.end('你是第'+name+'个访问者');
});
apiDat.get('/export', (request, response) => {
    let conf ={};
    let exceldata=[
        {name:"张三",age:"20",sex:"男",birthday:"1998-10-10"},
        {name:"李四",age:"21",sex:"男",birthday:"1997-08-08"},
        {name:"王五",age:"22",sex:"男",birthday:"1996-06-06"},
        {name:"赵六",age:"20",sex:"男",birthday:"1998-12-12"},
    ];
        conf.name = "mysheet";//表格名
        let alldata = new Array();
        for(let i = 0;i<exceldata.length;i++){
            let arr = new Array();
            arr.push(exceldata[i].name);
            arr.push(exceldata[i].age);
            arr.push(exceldata[i].sex);
            arr.push(exceldata[i].birthday);
            alldata.push(arr);
        }
        //决定列名和类型
        conf.cols = [{
            caption:'姓名',
            type:'string'
        },{
            caption:'年龄',
            type:'number'
        },{
            caption:'性别',
            type:'string'
        },{
            caption:'出生日期',
            type:'string',
            width:20,
        }];
        
        conf.rows = alldata;//填充数据
        let result = nodeExcel.execute(conf);
   
    response.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
    response.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    response.end(result, 'binary');
});
module.exports = apiDat;