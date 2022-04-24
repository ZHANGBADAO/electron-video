const { ipcMain } = require('electron')

module.exports = function (win) {
  ipcMain.on('print', (event, arg) => {

    if (arg === 'getAllPrint') {
      win.webContents.getPrintersAsync().then(printers => {
        event.returnValue = printers
      })
    }

    if (arg === 'startPrint') {
      event.returnValue = '开始打印~'

      win.webContents.print({
          deviceName: 'OneNote for Windows 10',
          silent: true,
        },
        (success, errorType) => {
          if (success) {
            console.log('打印成功')
          } else {
            console.log('打印失败', errorType)
          }
        })
    }

  })
}
