const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const ironmans = [
  'https://ithelp.ithome.com.tw/users/20107159/ironman/1325',
  'https://ithelp.ithome.com.tw/users/20107356/ironman/1315',
  'https://ithelp.ithome.com.tw/users/20107440/ironman/1355',
  'https://ithelp.ithome.com.tw/users/20107334/ironman/1335',
  'https://ithelp.ithome.com.tw/users/20107329/ironman/1286',
  'https://ithelp.ithome.com.tw/users/20091297/ironman/1330',
  'https://ithelp.ithome.com.tw/users/20075633/ironman/1375',
  'https://ithelp.ithome.com.tw/users/20107247/ironman/1312',
  'https://ithelp.ithome.com.tw/users/20107335/ironman/1337',
  'https://ithelp.ithome.com.tw/users/20106699/ironman/1283',
  'https://ithelp.ithome.com.tw/users/20107420/ironman/1381',
]

async.map(ironmans, getInfo, (err, results) => {
  console.log(results);
})

/**
 * @description 用來獲取鐵人賽系列的內容
 * @author frenkie
 * @date 2020-04-17
 * @param {String} url
 * @param {function} callback - (err, result)
 */
function getInfo(url, callback) {
  request(url, function (err, res, body) {
    var $ = cheerio.load(body)
    var link = url
    var name = $('.profile-header__name  .qa-list__title-link').text().trim()
    var title = $('.qa-list__title--ironman').text().trim().replace(' 系列', '')
    var joinDays = $('.qa-list__info--ironman span').eq(0).text().replace(/[^0-9]/g, '')
    var posts = $('.qa-list__info--ironman span').eq(1).text().replace(/[^0-9]/g, '')
    var subscriber = $('.qa-list__info--ironman span').eq(2).text().replace(/[^0-9]/g, '')
    var postList = $('.qa-list').map((index, obj) => {
      return {
        title: $(obj).find('.qa-list__title').text().trim(),
        like: $(obj).find('.qa-condition__count').eq(0).text().trim(),
        comment: $(obj).find('.qa-condition__count').eq(1).text().trim(),
        view: $(obj).find('.qa-condition__count').eq(2).text().trim(),
        date: $(obj).find('.qa-list__info-time').text().trim(),
        url: $(obj).find('.qa-list__title a').attr('href').trim(),
      }
    }).get()

    callback(null, {
      name, title, link, joinDays, posts, subscriber, postList
    });
  })
}