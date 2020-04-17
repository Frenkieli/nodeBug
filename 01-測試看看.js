const request = require('request');
const cheerio = require('cheerio');



request.defaults({jar: true});
// 讓預設的 request 開啟 cookie


var options = {
  'method': 'GET',
  'url': 'https://ithelp.ithome.com.tw/articles/10190761',
  'headers': {
    'Content-Type': 'application/json',
  },
};
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  // console.log(response.body);
  console.log(response); // response.body == body
  var $ = cheerio.load(body);
  //
  // 現在你可以使用像是 jQuery 的 selector 去選擇資料
  //
  console.log($('.ans-header .response-header__info .ans-header__leveltime').text());
});
