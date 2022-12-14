const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
    });

    // and load the view.html of the app.
    mainWindow.loadFile(path.join(__dirname, './src/view.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('Export', async function (event, data) {
    let filename = await dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(),
        {
            title: 'Export PNG',
            filters: [{ name: 'Bild', extensions: ['png'] }]
        }
    );
    if(!filename.canceled) {
        fs.writeFileSync(filename.filePath, Buffer.from(data, 'base64'), () => {
            console.log("attempted to write to the desktop");
        });
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
