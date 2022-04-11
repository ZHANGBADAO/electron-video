const { app, BrowserWindow } = require('electron')
const path = require('path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, './preload/preload.js'),
            nodeIntegration: true,
        }
    })

    if (app.isPackaged) {
        win.loadFile('./dist/index.html')
    } else {
        win.loadURL('http://10.1.6.196:8080/')
    }

    win.maximize()
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    app.quit()
})
