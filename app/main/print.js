const { ipcMain } = require('electron')

module.exports = function (win) {
  ipcMain.on('print', (event, arg) => {

    if (arg === 'getAllPrint') {
      win.webContents.getPrintersAsync().then(printers => {
        event.reply('print', printers)
      })
    }

    if (arg === 'startPrint') {
      win.webContents.print({
          deviceName: 'MF240 Series',
          silent: true,
        },
        (success, errorType) => {
          if (success) {
            event.reply('print', '打印成功~')
          } else {
            event.reply('print', `打印失败: ${errorType}`)
          }
        })
    }

  })
}
