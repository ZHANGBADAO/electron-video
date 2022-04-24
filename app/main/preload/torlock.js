// torlock.com 搜索种子
// 'https://www.torlock.com/'

const Crawler = require('crawler')

module.exports = function (keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
        });

        crawler.queue([
            {
                uri: `https://www.torlock.com/?qq=1&q=${encodeURI(keyword)}`,
                proxy:'http://127.0.0.1:10809',
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
                    let divArr = $('article > div:last-child .table-condensed tr')
                    divArr.each(function (){
                        resultArr.push({
                            nameCn: $(this).find('td:first-child a').html(),
                            url: 'https://www.torlock.com' + $(this).find('td:first-child a').attr('href'),//种子地址
                            addTime: $(this).find('td:nth-child(2)').html(),//添加时间
                            size: $(this).find('td:nth-child(3)').html(),//大小
                            seeds: $(this).find('td:nth-child(4)').html(),//seeds
                            peers: $(this).find('td:nth-child(5)').html(),//peers
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}


