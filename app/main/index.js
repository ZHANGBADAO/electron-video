const {app, BrowserWindow} = require('electron')
const path = require('path')
const initPrinters = require('./print')
const initMenu = require('./menu')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
app.disableHardwareAcceleration()

let mainWindow = null //主窗口

// 判断是否是单个实例 防止多开
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  // 是第二个实例，则退出
  app.quit()
} else {
  // 是第一个实例，则初始化
  // 监听第二个实例的启动
  app.on('second-instance', () => {
    // 使第一个实例获得焦点。
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  })

  // 创建 BrowserWindow，加载应用的其它功能，等等...
  app.whenReady().then(() => {
    initMenu()
    createWindow()
    // initPrinters(mainWindow)
  })
}

// 退出应用
app.on('window-all-closed', function () {
  app.quit()
})

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, './preload/index.js'),
      nodeIntegration: true,
    }
  })

  if (app.isPackaged) {
    // 正式环境
    mainWindow.loadFile('dist/index.html')
  } else {
    // 开发环境
    mainWindow.maximize()
    mainWindow.webContents.openDevTools({mode: 'bottom'})
    mainWindow.loadURL('http://localhost:8080')
  }
}


