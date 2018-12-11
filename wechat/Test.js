// var $ = require('jquery');
// function checkTime( qaz ){
//       var data = new Date(); // 获取现在时间
//       var nowData = data.getTime();  //  转化成毫秒数
//       var  time = qaz.getTime();  //  结束的时间
//      var t = time - nowData ;
//      var HH, mm , ss = 0;
//       var sta = "";
//       if( HH == 24){
//          HH = 0;
//    } 
//  if (++ss == 60) {
//      if (++mm == 60) { HH++; mm = 0; }
//      ss = 0;
//  }
//   if( t > 0){
//           DD = Math.floor(t/1000/60/60/24);
//           HH = Math.floor(t/1000/60/60%24);
//           mm = Math.floor(t/1000/60%60);
//           ss = Math.floor(t/1000%60);
//           let str = '';
//          str += DD <10 ?  "0" + DD : DD;
//          str += "天";
//          str += HH < 10 ? "0" + HH : HH;
//          str += ":";
//          str += mm < 10 ? "0" + mm : mm;
//          str += ":";
//          str += ss < 10 ? "0" + ss : ss;
//         // $(".progress-time span").text(str);
//         console.log(str); 
//      }
      
//   }  
//  setInterval(function () { // 每隔一秒调用一次
//      checkTime(new Date('2019-02-04 00:00:00'));
//  },1000);
var Excel = require('exceljs');
var fills = {
    solid: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFAAAA" } }
};
var Workbook = new Excel.Workbook();
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
ws1.mergeCells("A2:A7");
ws1.mergeCells("B2:B7");
ws1.mergeCells("C2:C7");
Workbook.xlsx.writeFile('test2.xlsx')
.then(function(){
    console.log('生成 xlsx');
});

