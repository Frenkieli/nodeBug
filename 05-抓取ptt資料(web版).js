const request = require('request');
const cheerio = require('cheerio');

const CrontabPeriod = 60 * 5 // 五分鐘抓一次


function requsetGet(){

  
  request('https://www.ptt.cc/bbs/Gamesale/index.html', (err, res, body) => {
    var $ = cheerio.load(body)
    
    // 抓取文章列表
    var list = $('.r-ent a').map((index, obj) => {
      return {
        title: $(obj).text(),
        link: $(obj).attr('href'),
        timestamp: $(obj).attr('href').substr(16, 10),
      }
    }).get()
    
    // filter 時間
    list = list.filter((post) => {
      return post.timestamp > (Date.now() / 1000 - CrontabPeriod)
    })
    
    console.log(list);
  })
  
  
}
requsetGet();
setInterval(() => {
  requsetGet();
}, 1000);