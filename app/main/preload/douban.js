//搜索影视
// 'https://douban.com'

const Crawler = require('crawler')

module.exports = function (keyword) {
    return new Promise((resolve, reject) => {
        const crawler = new Crawler({
        });

        crawler.queue([
            {
                uri: `https://movie.douban.com/j/subject_suggest?q=${encodeURI(keyword)}`,
                headers: {
                },
                jQuery: false,
                userAgent:
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55',
                // The global callback won't be called
                callback: (error, res, done) => {
                    if (error) {
                        console.log(error);
                        reject(error)
                        return;
                    }

                    resolve(JSON.parse(res.body))
                    done();
                },
            },
        ]);
    })
}


