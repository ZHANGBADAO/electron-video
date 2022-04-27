const {app, BrowserWindow} = require('electron')
const path = require('path')
const initPrinters = require('./print')
const initMenu = require('./menu')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {
  const win = createWindow()
  initMenu()
  // initPrinters(win)
})

app.on('window-all-closed', function () {
  app.quit()
})

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, './preload/index.js'),
      nodeIntegration: true,
    }
  })

  if (app.isPackaged) {
    // 正式环境
    win.loadFile('dist/index.html')
  } else {
    // 开发环境
    win.maximize()
    win.loadURL('http://localhost:8080')
    win.webContents.openDevTools({mode: 'bottom'})
  }

  return win
}


