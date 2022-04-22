const { ipcMain } = require('electron')

module.exports = function (win) {
  ipcMain.on('print', (event, arg) => {

    if (arg === 'getAllPrint') {
      win.webContents.getPrintersAsync().then(printers => {
        event.returnValue = printers
      })
    }

    if (arg === 'startPrint') {
      console.log('startPrint')
      win.webContents.print({
          deviceName: 'Microsoft Print to PDF'
        },
        (success, errorType) => {
          if (!success) console.log(errorType)
        })
    }

  })
}
