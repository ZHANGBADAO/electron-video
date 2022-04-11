const { contextBridge } = require('electron')
const searchFromWebhd = require('./webhd')
const searchFromSubhd = require('./subhd')
const open = require('open')

function openBrowser(url) {
    open(url);
}
contextBridge.exposeInMainWorld('myAPI', {
    searchFromWebhd,
    searchFromSubhd,
    openBrowser,
})
