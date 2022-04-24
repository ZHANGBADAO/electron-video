//搜索影视
// 'https://gaoqing.fm'

const Crawler = require('crawler')

module.exports = function (keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
        });

        crawler.queue([
            {
                uri: `https://gaoqing.fm/s.php?q=${encodeURI(keyword)}`,
                headers: {
                },
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
                    let divArr = $('#result1 > div')
                    divArr.each(function (){
                        resultArr.push({
                            imgUrl: $(this).find('div.x-m-side.col-md-3 > a > div > img').attr('src'),
                            nameCn: $(this).find('div.col-md-9 > div > a > h4').text(),
                            url: $(this).find('div.col-md-9 > div > a').attr('href'),//影视地址
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}


