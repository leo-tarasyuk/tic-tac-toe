'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import './helpers/menu'

const path = require('path')
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let window
let characters

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

function createWindow () {
  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')
  }

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

  window.on('closed', () => (window = null))

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

ipcMain.on('close-app', () => app.quit())

ipcMain.on('close-character', (event) => {
  event.preventDefault()
  characters.hide()
})

ipcMain.on('change-character', (event, arg) => {
  characters.show()
  characters.webContents.send('characters', arg)
})
