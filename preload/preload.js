const { contextBridge } = require('electron')
const searchFromWebhd = require('./webhd')
const open = require('open')

function openBrowser(url) {
    open(url);
}
contextBridge.exposeInMainWorld('myAPI', {
    searchFromWebhd,
    openBrowser,
})
