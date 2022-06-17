// https://1337x.to/

const Crawler = require('crawler')

module.exports = function (keyword) {
  return new Promise((resolve, reject) => {
    const crawler = new Crawler({});

    crawler.queue([
      {
        uri: `https://1337x.to/search/${encodeURI(keyword)}/1/`,
        proxy: 'http://127.0.0.1:10809',
        headers: {},
        // jQuery: false,
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
          let divArr = $('body > main > div > div > div > div.box-info-detail.inner-table > div.table-list-wrap > table > tbody > tr')
          divArr.each(function () {
            let sizeStr = $(this).find('td:nth-child(5)').html()
            sizeStr = sizeStr.slice(0, sizeStr.indexOf('<'))

            resultArr.push({
              nameCn: $(this).find('td:nth-child(1) a:nth-child(2)').html(),
              url: 'https://1337x.to' + $(this).find('td:nth-child(1) a:nth-child(2)').attr('href'),//种子地址
              seeds: $(this).find('td:nth-child(2)').html(),//seeds
              addTime: $(this).find('td:nth-child(4)').html(),//添加时间
              size: sizeStr,//大小
            })
          })

          resolve(resultArr)
          done();
        },
      },
    ]);
  })
}


