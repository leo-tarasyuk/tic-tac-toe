'use strict'

import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import store from '../renderer/store'

const path = require('path')
const fs = require('fs')
const os = require('os')

const pathDownload = path.join(os.homedir(), '/Downloads') // For Ubuntu

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Download',
        click: () => {
          if (store.getters['characters/characters']) {
            fs.writeFile(path.join(pathDownload, 'characters.txt'), JSON.stringify(store.getters['characters/characters']))
          }
        },
        accelerator: 'CmdOrCtrl + D'
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

let window
let characters

function createWindow () {
  BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')

  window = new BrowserWindow({
    width: 1000,
    height: 563,
    useContentSize: true
  })

  characters = new BrowserWindow({
    width: 500,
    height: 490,
    parent: window,
    show: false
  })

  window.loadURL(winURL)
  characters.loadURL(winURL + '/#/characters')

  window.on('closed', () => {
    window = null
  })

  characters.on('close', (event) => {
    event.preventDefault()
    characters.hide()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (window === null) createWindow()
})

ipcMain.on('close-app', () => {
  app.quit()
})

ipcMain.on('close-character', (event) => {
  event.preventDefault()
  characters.hide()
})

ipcMain.on('change-character', (event, arg) => {
  characters.show()
  characters.webContents.send('characters', arg)
})
