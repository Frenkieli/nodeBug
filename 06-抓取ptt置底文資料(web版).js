const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  getItems(function(items){
    res.json(items)
  });
}).listen(3000)

function getItems(callback){
  request('https://www.ptt.cc/bbs/AnimalForest/M.1586589781.A.964.html', (err, res, body)=>{
    var $ = cheerio.load(body,  { decodeEntities: false })
    var items = []

    $('div.push').each((index, obj)=>{
      var pusher = $(obj).find('.push-userid').html();
      var content = $(obj).find('.push-content').html().replace(': ', '');
      var time = $(obj).find('.push-ipdatetime').html().replace('\n', '');

      if (items.length && pusher === items[items.length - 1].pusher) {
        items[items.length - 1].content = items[items.length - 1].content + content;
      } else {
        currentUser = pusher;
        items.push({
          pusher: pusher,
          content: content,
          time: time,
        });
      }
    })
    callback(items)
  })
}