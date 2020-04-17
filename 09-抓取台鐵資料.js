const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const express = require('express');
const app = express();

// app.get('/', function (req, res) {
//   getRowData(((data)=>{
//     res.json(data);
//   }))
// }).listen(3000);


var options = {
  'method': 'POST',
  'url': 'https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip112/querybytime',
  'headers': {
  },
  formData: {
    '_csrf': 'b4b38e45-0494-424e-b650-e07e0e113eb3',
    'startStation': '1020-板橋',
    'endStation': '1000-臺北',
    'transfer': 'ONE',
    'rideDate': '2020/04/17',
    'startOrEndTime': 'true',
    'startTime': '00:00',
    'endTime': '23:59',
    'trainTypeList': 'ALL',
    'query': '查詢'
  }
};
getRowData();

function getRowData (callback) {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let $ = cheerio.load(body);
    let trainData = $('.trip-column');
    console.log(trainData);
    // callback(body);
  });
}