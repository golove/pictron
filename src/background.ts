'use strict'

import { app, protocol, BrowserWindow, ipcMain, Notification } from 'electron'
// import { join } from 'path'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

import type ImgSpider from './model/JsSpider'
import MangeData from './model/Mange'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function showNotification (title:string, body:string) {
  new Notification({ title, body }).show()
}
type IContent={
  url:string,
  reload:boolean
}

async function ipcPublic (params:ImgSpider, event:Electron.IpcMainEvent, content:IContent, ipcName:string) {
  console.log(params.allImgData.length)
  if (params.allImgData.length > 0 && !content.reload) {
    for (const srcs of params.allImgData) {
      event.sender.send(ipcName + '-reply', srcs)
      if (srcs === params.allImgData[params.allImgData.length - 1]) {
        showNotification(ipcName + params.allImgData.length, '全部加载完成')
      }
    }
  } else {
    console.log('spider')
    const data = await params.getPage(content.url)

    const hrefs = params.findHref(data.res)
    for (const e of hrefs) {
      const html = await params.getPage(e)
      const srcs = params.findImgsrc(html.res, e)
      if (srcs) {
        event.sender.send(ipcName + '-reply', srcs)
        if (e === hrefs[hrefs.length - 1]) {
          showNotification(ipcName + hrefs.length, '全部加载完成')
        }
      }
    }
  }
  if (content.reload) {
    console.log('spider')
    const data = await params.getPage(content.url)

    const hrefs = params.findHref(data.res)
    if (hrefs.length > 0) {
      for (const e of hrefs) {
        const html = await params.getPage(e)
        const srcs = params.findImgsrc(html.res, e)
        if (srcs) {
          event.sender.send(ipcName + '-reply', srcs)
          if (e === hrefs[hrefs.length - 1]) {
            event.sender.send(ipcName + '-replyFlag', false)
            showNotification(ipcName + hrefs.length, '全部加载完成')
          }
        }
      }
    } else {
      showNotification(ipcName, '没有找到更多的资源')
      event.sender.send(ipcName + '-replyFlag', false)
    }
  }
}
const MangeImg = new MangeData()

ipcMain.on('Beauty-message', (event, content) => {
  ipcPublic(MangeImg.Beauty, event, content, 'Beauty')
})

ipcMain.on('Ustyle-message', (event, content) => {
  ipcPublic(MangeImg.Ustyle, event, content, 'Ustyle')
})

ipcMain.on('Carton-message', (event, content) => {
  ipcPublic(MangeImg.Carton, event, content, 'Carton')
})

ipcMain.on('Leisi-message', (event, content) => {
  ipcPublic(MangeImg.Leisi, event, content, 'Leisi')
})

ipcMain.on('Selfie-message', (event, content) => {
  ipcPublic(MangeImg.Selfie, event, content, 'Selfie')
})

ipcMain.on('Passion-message', (event, content) => {
  ipcPublic(MangeImg.Passion, event, content, 'Passion')
})
ipcMain.on('Collect-message', (event, content) => {
  console.log(content.url)
  const allCollect = MangeImg.getAllCollect()
  if (allCollect.length > 0) {
    for (const srcs of allCollect) {
      event.sender.send('Collect' + '-reply', srcs)
      if (srcs === allCollect[allCollect.length - 1]) {
        showNotification('My Collect' + allCollect.length, '全部加载完成')
      }
    }
  } else {
    showNotification('My Collect ' + allCollect.length, '收藏夹空空如也')
  }
})

ipcMain.on('changeActool', (event, content) => {
  MangeImg[content.classify].findImgCard(content.url, content.actName)
})

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    frame: false,
    // titleBarStyle: 'hidden',
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION

    }
  })

  ipcMain.on('windowTool', (event, content) => {
    if (content === 'min') {
      win.minimize()
    } else if (content === 'max') {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    } else {
      win.close()
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e)
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
