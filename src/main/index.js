import { app, BrowserWindow, ipcMain, Menu } from "electron";
const PDFWindow = require("electron-pdf-window");
const ipc = require('electron').ipcRenderer;
const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    width: 1000,
    useContentSize: true,
    fullscreen: false,
    icon: path.join(__dirname, '../renderer/assets/icons/64x64.png')
    /*
    webPreferences: {
      devTools: true
    }
    */
  });

  mainWindow.maximize();
  mainWindow.loadURL(winURL);
  
  /*
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('checkUpdate', 'whoooooooh!')
  })
  */


  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  require("../renderer/electronApp/menu");

  /*
  ipcMain.on("printPdf", (event, data) => {

    const win = new PDFWindow({
      width: 800,
      height: 600
    })

    win.loadURL("http://localhost:3333/_4chi11zqs.pdf");
  });
  */
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    mainWindow.webContents.send('clearLocalStorage');
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
