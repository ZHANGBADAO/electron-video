//搜索视频
// 'https://webhd.cc'

const Crawler = require('crawler')

function searchFromWebhd(keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
            // rateLimit: 500, // `maxConnections` will be forced to 1
        });

        crawler.queue([
            {
                uri: `https://webhd.cc/search/${encodeURI(keyword)}`,
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
                    let divArr = $('body > div.container > div > div > div > div > div.col-lg-9.pt-2 > .mb-4')
                    divArr.each(function (){
                        resultArr.push({
                            nameCn: $(this).find('.col-10 .f16 a').text(),
                            nameEn: $(this).find('.col-10 .f16 span').text(),
                            url: 'https://webhd.cc'+ $(this).find('.col-10 .f16 a').attr('href'),
                            imgUrl: $(this).find('.col-2 img').attr('src'),
                            subUrl: $(this).find('.col-10 .position-absolute .ps-2 a').attr('href'),
                            descUrl: $(this).find('.col-10 .position-absolute > a.btn').attr('href'),
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}

module.exports = searchFromWebhd
