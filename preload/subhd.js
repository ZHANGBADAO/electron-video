//搜索字幕
// 'https://subhd.tv/'

const Crawler = require('crawler')

function searchFromSubhd(keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
            // rateLimit: 500, // `maxConnections` will be forced to 1
        });

        crawler.queue([
            {
                uri: `https://subhd.tv/search/${encodeURI(keyword)}`,
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
                    let divArr = $('body > div.container > div > div > div > div.col-lg-9.pe-lg-4 > div.bg-white')
                    divArr.each(function (){
                        //字幕语言的描述
                        let descArr = []
                        $(this).find('.pt-2.f11 > .p-1').each(function (){
                            if ($(this).children().length === 0) {
                                descArr.push($(this).text())
                            }
                        })

                        resultArr.push({
                            imgUrl: $(this).find('img.rounded-start').attr('src'),
                            nameCn: $(this).find('a.link-dark.align-middle').text(),
                            season: $(this).find('.ms-2 > .f12.fw-normal').text(),
                            subUrl: 'https://subhd.tv'+ $(this).find('a.link-dark.align-middle').attr('href'),//字幕地址
                            match: $(this).find('.text-secondary a.link-dark').text(),//匹配的片源
                            desc: descArr,
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}

module.exports = searchFromSubhd
