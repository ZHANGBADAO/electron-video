const {ipcRenderer, clipboard} = require('electron')
const getVideoFromEdge = require('./getVideoFromEdge')

function getAllPrintFn () {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('print', 'getAllPrint')
    ipcRenderer.on('print', (event, arg) => {
      resolve(arg)
    })
  })
}

function startPrintFn() {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('print', 'startPrint')
    ipcRenderer.on('print', (event, arg) => {
      resolve(arg)
    })
  })
}

// 文本写入剪贴板
function writeTextToClipboard(text) {
  clipboard.writeText(text)
}

module.exports = {
  getAllPrintFn,
  startPrintFn,
  getVideoFromEdge,
  writeTextToClipboard,
}
