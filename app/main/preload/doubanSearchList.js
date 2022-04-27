// 不能在electron环境中使用
const Nightmare = require('nightmare')

const nightmare = Nightmare({
  show: true,
})

nightmare
  .goto('https://search.douban.com/movie/subject_search?search_text=%E6%90%9C%E7%B4%A2&cat=1002')
  // .type('#search_form_input_homepage', '蜘蛛侠')
  // .click('#search_button_homepage')
  .wait('#root .sc-gqjmRU .sc-bZQynM.eJWSlY')
  .evaluate(() => document.querySelector('#root .sc-gqjmRU .sc-bZQynM.eJWSlY .detail .title-text').innerHTML)
  .end()
  .then((result) => {
    console.log(111111, result)
  })
  .catch(error => {
    console.error('Search failed:', error)
  })

