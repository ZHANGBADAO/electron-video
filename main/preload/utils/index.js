const { ipcRenderer } = require('electron')

function getAllPrintFn () {
  return ipcRenderer.sendSync('print', 'getAllPrint')
}

function startPrintFn () {
  return ipcRenderer.sendSync('print', 'startPrint')
}

module.exports = {
  getAllPrintFn,
  startPrintFn
}
