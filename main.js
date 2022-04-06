const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL('http://localhost:3000/')
    // win.loadFile('./vue/dist/index.html')

    win.maximize()
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
