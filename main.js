const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload')

const createWindow = (file) => {
    const win = new BrowserWindow({
        backgroundColor: '#b6b6b6',
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile(file);
}

app.whenReady().then(() => {
    createWindow('index.html')
});