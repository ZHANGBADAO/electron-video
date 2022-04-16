const { contextBridge } = require('electron')
const searchFromWebhd = require('./webhd')
const searchFromSubhd = require('./subhd')
const searchFromGaoqing = require('./gaoqing')
const searchFromDouban = require('./douban')
const open = require('open')

function openBrowser(url) {
    open(url);
}
contextBridge.exposeInMainWorld('myAPI', {
    searchFromWebhd,
    searchFromSubhd,
    searchFromGaoqing,
    searchFromDouban,
    openBrowser,
})
