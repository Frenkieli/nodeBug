const request = require('request');
const cheerio = require('cheerio');

getData((body) => {
  var $ = cheerio.load(body)
  var rate = $('.rate-content-cash.text-right.print_table-cell')
    .filter((index) => {
      return index % 2 && index < 14
    })
    .map((index, obj) => {
      return $(obj).text()
    })
    .get()

  var lowest = Math.min(...rate)
  var gotoBackRightNow = (lowest == rate[0]) ? true : false
  console.log(gotoBackRightNow);
})

function getData(callback) {
  var options = {
    'method': 'GET',
    'url': 'http://rate.bot.com.tw/xrt/quote/ltm/JPY',
    'headers': {
    }
  };
  request(options, function (error, response, body) { 
    if (error) throw new Error(error);
    console.log(response.body);
    callback(body)
  });
}
