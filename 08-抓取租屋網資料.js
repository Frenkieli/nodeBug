const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  getRowData(((data)=>{
    res.json(data);
  }))
}).listen(3000);
// 選擇關鍵在於cookie的"urlJumpIp"和"urlJumpIpByTxt"不符合會觸發防禦機制
// urlJumpIp=19 是屏東縣
// urlJumpIp=23 是花蓮縣
// 然後把屏東縣用這格轉換
// http://www.mxcz.net/tools/zh-TW/Url.aspx
// 放到　urlJumpIpByTxt=這邊
var options = {
  'method': 'GET',
  'url': 'https://rent.591.com.tw/home/search/rsList',
  'headers': {
    'Cookie': [
      'urlJumpIp=23;' +
      'urlJumpIpByTxt=%E8%8A%B1%E8%93%AE%E7%B8%A3;' + 
      'XSRF-TOKEN=eyJpdiI6IloxRHJrMUtsSmplaVdNalViUlNycUE9PSIsInZhbHVlIjoiM0hcL0tZN1wvMDZPd1U4SGV2OFBqRUtydzlZOWJ5MUF3ZzRcL1p3K2JoQmEzTlR5OHNJZ2ZleUdHNHJ3bVNzZFdVOFdDdFwvdHJ3bExqTGZqZmh5Q1dpNm9BPT0iLCJtYWMiOiJlMDkwYTRlODA3OTQyMzMyZGM2YWRhOGQ3MjQzMzlmMzFkZDFiMjAzZWMwM2Q0ZWVhMTBkZGU0OTEwNTI4MmEyIn0%3D;' +
      '591_new_session=eyJpdiI6IjFvTGcreE0xTmxOME8reTN0ajczM3c9PSIsInZhbHVlIjoieFhmemtiV3J2UVk3SEVHZFkzZFl3QmxkWmNRMGZNd3JTZ0xDaFF6TEYrVzdPRVM5QnVBeE1aVVJqT1ZIYkExQkF6XC9vWXFpTEtpWlArUkRBeUNZWkx3PT0iLCJtYWMiOiJiYmI2YTM0MGFiYzlhMWIzOWE0Njg5NzgzNmQ5NTZiMGE1MGJlYzhhZGM5ZjhlODU2NjNlMWFkN2U4NjE4Y2RhIn0%3D'
    ],
    'X-CSRF-TOKEN': 'llYmeiiMRAkbLya9OGzAh9uJT3WdCQHA3dQcboGC'
  }
};
function getRowData(callback){
  request(options, function (error, response, body) { 
    if (error) throw new Error(error);
    let json = JSON.parse(body);
    console.log(json);
    callback(json);
  });
}
