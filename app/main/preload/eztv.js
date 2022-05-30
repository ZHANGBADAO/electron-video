// eztv电视剧
// https://eztv.re

const Crawler = require('crawler')

module.exports = function (keyword) {
  return new Promise((resolve, reject) => {
    const crawler = new Crawler({});

    crawler.queue([
      {
        uri: `https://eztv.re/search/${encodeURI(keyword)}`,
        headers: {},
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55',
        // The global callback won't be called
        callback: (error, res, done) => {
          if (error) {
            console.log(error);
            reject(error)
            return;
          }

          const $ = res.$;
          console.log('页面标题', $('title').text());

          let resultArr = []
          let divArr = $('#header_holder > table.forum_header_border').eq(2).find('tr.forum_header_border')
          divArr.each(function () {
            resultArr.push({
              nameCn: $(this).find('td:nth-child(2) a').attr('title'),
              info: 'https://eztv.re' + $(this).find('td:nth-child(1) a').attr('href'),//视频介绍
              url: $(this).find('td:nth-child(3) a:nth-child(1)').attr('href'),//磁力链
              size: $(this).find('td:nth-child(4)').html(),//视频大小
              date: $(this).find('td:nth-child(5)').html(),//发布时间
              seed: $(this).find('td:nth-child(6)').html(),//做种数
            })
          })

          resolve(resultArr)
          done();
        },
      },
    ]);
  })
}


