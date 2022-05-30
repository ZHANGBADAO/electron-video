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
  utils,
  openBrowser,
})
