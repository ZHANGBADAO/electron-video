//搜索影视
// 'https://douban.com'

const Crawler = require('crawler')

module.exports = function (keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
            // zxt 两次请求之间将闲置1000ms
            rateLimit: 3000,
        });

        crawler.queue([
            {
                uri: `https://search.douban.com/movie/subject_search?search_text=${encodeURI(keyword)}&cat=1002`,
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
                    let divArr = $('.root .sc-bxivhb')
                    divArr.each(function (){
                        resultArr.push({
                            imgUrl: $(this).find('img.cover').attr('src'),
                            nameCn: $(this).find('.title-text').text(),
                            url: $(this).find('.title-text').attr('href'),//影视地址
                            rating_nums: $(this).find('.rating_nums').text(),//评分
                            rating_people: $(this).find('.rating .p1').text(),//评分人数
                            type: $(this).find('.meta.abstract').text(),//类型
                            actor: $(this).find('.meta.abstract_2').text(),//主演
                        })
                    })

                    resolve(resultArr)
                    done();
                },
            },
        ]);
    })
}


