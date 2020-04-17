const request = require('request');
const cheerio = require('cheerio');



request.defaults({ jar: true });
// 讓預設的 request 開啟 cookie

for (var i = 0; i < 100; i++) {
  request('http://www.hit-counts.com/counter.php?t=MTQxODkyMg==');
}