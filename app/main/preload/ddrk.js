// 低端影视
// https://ddrk.me/

const Crawler = require('crawler')

module.exports = function (keyword) {
  return new Promise((resolve, reject) => {
    const crawler = new Crawler({});

    crawler.queue([
      {
        uri: `https://www.baidu.com/s?wd=site%3Addrk.me%20${encodeURI(keyword)}`,
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
          let divArr = $('#content_left .result.c-container')
          divArr.each(function () {
            resultArr.push({
              nameCn: $(this).find('h3.c-title a').html(),
              url: $(this).find('h3.c-title a').attr('href'),//地址
              desc: $(this).find('span.content-right_8Zs40').html(),//介绍
            })
          })

          resolve(resultArr)
          done();
        },
      },
    ]);
  })
}


