import { Menu, shell } from 'electron'
import store from '../../renderer/store'

import navigate from '../index'

const path = require('path')
const fs = require('fs')
const os = require('os')

const pathDownload = path.join(os.homedir(), '/Downloads') // For Ubuntu
const file = path.join(pathDownload, 'characters.json')
const date = Date.now()
const charactersData = store.getters['characters/characters']
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Download',
        click: () => {
          if (charactersData) {
            fs.writeFile(
              file,
              JSON.stringify({
                date,
                charactersData
              })
            )
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
    label: 'Navigation',
    submenu: [
      {
        label: 'Main',
        click: () => {
          navigate('/')
        }
      },
      {
        label: 'Settings',
        click: () => {
          navigate('/settings')
        }
      },
      {
        label: 'Game',
        click: () => {
          navigate('/game')
        }
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

export default Menu.setApplicationMenu(Menu.buildFromTemplate(template))
