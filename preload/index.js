const { contextBridge, shell } = require('electron')
const searchFromWebhd = require('./webhd')
const searchFromSubhd = require('./subhd')
const searchFromGaoqing = require('./gaoqing')
const searchFromDouban = require('./douban')
const searchFromShooter = require('./shooter')
const searchFromTorlock = require('./torlock')

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
    openBrowser,
})
