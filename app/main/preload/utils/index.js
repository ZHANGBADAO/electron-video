const { ipcRenderer } = require('electron')

function getAllPrintFn () {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('print', 'getAllPrint')
    ipcRenderer.on('print', (event, arg) => {
      resolve(arg)
    })
  })
}

function startPrintFn () {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('print', 'startPrint')
    ipcRenderer.on('print', (event, arg) => {
      resolve(arg)
    })
  })
}

module.exports = {
  getAllPrintFn,
  startPrintFn
}
