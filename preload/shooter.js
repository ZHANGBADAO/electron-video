// 射手网搜索字幕
// 'http://assrt.net/'

const Crawler = require('crawler')

module.exports = function (keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
        });

        crawler.queue([
            {
                uri: `http://assrt.net/sub/?searchword=${encodeURI(keyword)}`,
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
                    let divArr = $('#resultsdiv > div > div.subitem')
                    divArr.each(function (){
                        if ($(this).attr('id')) return
                        resultArr.push({
                            nameCn: $(this).find('a.introtitle').html(),
                            url: 'http://assrt.net' + $(this).find('a.introtitle').attr('href'),//字幕地址
                            match: $(this).find('#meta_top b').html(),//片源版本
                            subType: $(this).find('#sublist_div > span:nth-child(2)').html(),//字幕格式
                            subLanguage: $(this).find('#sublist_div > span:nth-child(3)').html(),//字幕语言
                            count: $(this).find('#sublist_div > span:nth-child(7)').text() + $(this).find('#sublist_div > span:nth-child(8)').text(),//下载次数
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}


