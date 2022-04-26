// 人人影视搜索字幕
// https://www.yysub.net/

const Crawler = require('crawler')

module.exports = function (keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
        });

        crawler.queue([
            {
                uri: `https://www.yysub.net/search?keyword=${encodeURI(keyword)}&type=subtitle`,
                headers: {
                },
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
                    let divArr = $('body > div.middle-box > div > div.search-result-box-wrap > div > div.search-result > ul > li')
                    divArr.each(function (){
                        resultArr.push({
                            nameCn: $(this).find('.fl-info .t.f14 a').html(),
                            url: 'https://www.yysub.net' + $(this).find('.fl-info .t.f14 a').attr('href'),//字幕地址
                            match: $(this).find('.fl-info p:nth-child(2) span.f4').html(),//片源版本
                            date: $(this).find('.fl-info p:nth-child(4) span.time').html(),//发布时间
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}


