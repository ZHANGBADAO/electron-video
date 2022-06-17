const {contextBridge, shell} = require('electron')
const searchFromWebhd = require('./webhd')
const searchFromSubhd = require('./subhd')
const searchFromGaoqing = require('./gaoqing')
const searchFromDouban = require('./douban')
const searchFromShooter = require('./shooter')
const searchFromTorlock = require('./torlock')
const searchFromYtsMx = require('./ytsMx')
const searchFromYysub = require('./yysub')
const searchFromDdrk = require('./ddrk')
const searchFromEztv = require('./eztv')
const searchFrom1337x = require('./1337x')
const utils = require('./utils')

function openBrowser(url) {
  shell.openExternal(url)
}

contextBridge.exposeInMainWorld('myAPI', {
  searchFromWebhd,
  searchFromSubhd,
  searchFromGaoqing,
  searchFromDouban,
  searchFromShooter,
  searchFromTorlock,
  searchFromYtsMx,
  searchFromYysub,
  searchFromDdrk,
  searchFromEztv,
  searchFrom1337x,
  utils,
  openBrowser,
})
