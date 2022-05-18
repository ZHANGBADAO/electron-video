const Crawler = require('crawler')

module.exports = function () {
  return new Promise((resolve, reject) => {
    const crawler = new Crawler({});

    crawler.queue([
      {
        uri: `https://ntp.msn.cn/resolver/api/resolve/v3/config/?expType=AppConfig&apptype=edgeChromium&v=20220517.348`,
        headers: {},
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

          resolve(JSON.parse(res.body).configs['BackgroundImageWC/default'].properties.video.data)
          done()
        },
      },
    ]);
  })
}


