const request = require('request').defaults({jar: true});
const cheerio = require('cheerio');
const fs = require('fs');

request('https://www.ibon.com.tw/mobile/printscan/D0111_fileupload_innerifrm.aspx', (err, res, body)=>{
  var $ = cheerio.load(body)
  var __VIEWSTATE = $('#__VIEWSTATE').val()
  var __EVENTVALIDATION = $('#__EVENTVALIDATION').val()

  var options = {
    url: 'https://www.ibon.com.tw/mobile/printscan/D0111_fileupload_innerifrm.aspx',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      'fuFile': fs.createReadStream(__dirname + '/test.pdf'),
      '__VIEWSTATE': __VIEWSTATE,
      '__EVENTVALIDATION': __EVENTVALIDATION,
      'txtUserName': 'Howard',
      'chkboxAgree': 'on',
      'lnkbtnUpload': '確認上傳',
      'txtEmail': 'tnstiger@gmail.com',
    }
  }
  request(options, (err, res, body)=>{
    request('https://www.ibon.com.tw/mobile/printscan/D0111_fileupload_info.aspx', (err, res, body)=>{
      var $ = cheerio.load(body)
      console.log($('td span.valignmiddle').text().trim());
    })
  })
})