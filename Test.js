var fs = require('fs');
const  list = [
        {
          "property": "polename",
          "propertyValue": "灯杆名称",
          "type": 1
        },
        {
          "property": "disc",
          "propertyValue": "路灯名称",
          "type": 1
        },
        {
          "property": "meterno",
          "propertyValue": "通讯地址",
          "type": 1
        },
        {
          "property": "pointid",
          "propertyValue": "测量点号",
          "type": 1
        },
        {
          "property": "datatime",
          "propertyValue": "数据时间",
          "type": 1
        },
        {
          "property": "datatype",
          "propertyValue": "数据类型",
          "type": 1
        },
        {
          "property": "ctrltype",
          "propertyValue": "控制类型",
          "type": 1
        },
        {
          "property": "lampstatus",
          "propertyValue": "开关",
          "type": 1
        },
        {
          "property": "lightvalue",
          "propertyValue": "亮度",
          "type": 1
        },
        {
          "property": "p",
          "propertyValue": "功率(W)",
          "type": 0
        },
        {
          "property": "uv",
          "propertyValue": "电压(V)",
          "type": 0
        },
        {
          "property": "ima",
          "propertyValue": "电流(mA)",
          "type": 0
        },
        {
          "property": "pf",
          "propertyValue": "总功率因数",
          "type": 0
        },
        {
          "property": "setno",
          "propertyValue": "策略集号",
          "type": 0
        },
        {
          "property": "sumenergy",
          "propertyValue": "累计用电量",
          "type": 0
        },
        {
          "property": "sumoncount",
          "propertyValue": "开灯次数",
          "type": 0
        },
        {
          "property": "sumontime",
          "propertyValue": "开灯累计时间",
          "type": 0
        }
    ];
// const content = new Uint8Array(Buffer.from('name'));
    fs.writeFile('nodejs.xls',JSON.stringify(list),(err)=>{
        try {
            console.log('success!');
        } catch (error) {
            console.log(err);
        }
    });