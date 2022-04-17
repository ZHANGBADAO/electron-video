const { app, BrowserWindow } = require('electron')
const path = require('path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function createWindow () {
    const win = new BrowserWindow({
        width: 1500,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, './preload/index.js'),
            nodeIntegration: true,
        }
    })

    if (app.isPackaged) {
        win.loadFile('./dist/index.html')
    } else {
        win.loadURL('http://localhost:8080')
        win.webContents.openDevTools({mode:'bottom'})
    }

    // win.maximize()
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    app.quit()
})
