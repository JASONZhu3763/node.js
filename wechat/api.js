var express = require('express');
var getpool = require('./db');
var apiDat = express();
var fs = require('fs');
var xlsx = require('node-xlsx');
var Excel = require('exceljs');
var bodyParser = require('body-parser');
var getData = {
    success: '',
    total: '',
    listitem: []
};
var name = 0;

//设置　start-end　行单元格水平垂直居中/添加边框
function rowCenter(arg_ws, arg_start, arg_end) {
    for(i = arg_start; i <= arg_end; i++) {
        arg_ws.findRow(i).alignment = { vertical: 'middle', horizontal: 'center' };
        //循环 row 中的　cell，给每个 cell添加边框
        arg_ws.findRow(i).eachCell( (cell, index) => {
            cell.border = {
                top: {style:'thin'},
                left: {style:'thin'},
                bottom: {style:'thin'},
                right: {style:'thin'}
            };
        })

    }
}

//设置　start-end 列的宽度
function colWidth(arg_ws, arg_cols, arg_width) {
    for(i in arg_cols) {
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
    var fills = {
        solid: { type: "pattern", pattern: "solid"}
    };
    var options = {
        stream: response,
        useStyles: true,
        useSharedStrings: false
    }
    var Workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    var ws1 = Workbook.addWorksheet("测试一");
    ws1.addRow(["你", "在", "说些", "神马", "呢？"]);
    ws1.getCell("A1").fill = fills.solid;
    ws1.getCell("B1").fill = fills.solid;
    ws1.getCell("C1").fill = fills.solid;
    ws1.getCell("D1").fill = fills.solid;
    ws1.getCell("E1").fill = fills.solid;
    ws1.addRow(["什么跟神马", 10, 1, "凡人修仙传", 7]);
    ws1.addRow(["", "", "", "一号遗迹", 2]);
    ws1.addRow(["", "", "", "六号遗迹", 0]);
    ws1.addRow(["", "", "", "古国一号", 0]);
    ws1.addRow(["", "", "", "锻体期", 0]);
    ws1.addRow(["", "", "", "合体期", 0]);
    ws1.addRow(["", "", "", "没资质", 1]);
    ws1.mergeCells("A2:A8");
    ws1.mergeCells("B2:B8");
    ws1.mergeCells("C2:C8");
    rowCenter(ws1,1,8);
    colWidth(ws1,[1,2,3,4,5],20);
    ws1.commit();
    Workbook.commit().then(()=>{
        response.end();
    });
    // Workbook.xlsx.writeFile('response.xlsx').then( () => {
    //     console.log('生成 xlsx');
    //     response.end();
    // });
    
});
module.exports = apiDat;