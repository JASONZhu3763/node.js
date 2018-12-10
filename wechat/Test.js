var $ = require('')
function checkTime( time ){
      var data = new Date(); // 获取现在时间
      var nowData = data.getTime();  //  转化成毫秒数
      console.log(nowData);
      var  time ;  //  结束的时间
     var t = time - nowData ;
     var HH, mm , ss = 0;
      var sta = "";
      if( HH == 24){
         HH = 0;
   } 
 if (++ss == 60) {
     if (++mm == 60) { HH++; mm = 0; }
     ss = 0;
 }
  if( t > 0){
          HH = Math.floor(t/1000/60/60%24);
          mm = Math.floor(t/1000/60%60);
          ss = Math.floor(t/1000%60);
          let str = '';
         str += HH < 10 ? "0" + HH : HH;
         str += ":";
         str += mm < 10 ? "0" + mm : mm;
         str += ":";
         str += ss < 10 ? "0" + ss : ss;
        $(".progress-time span").text(str);
     }
     console.log(t);  
  }  
 setInterval(function () { // 每隔一秒调用一次
     checkTime(new Date('2018-12-31 00:00:00'));
 },1000);