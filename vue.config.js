module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      enableRemoteModule: true,
      builderOptions: {

        electronDownload: {
          mirror: 'https://npm.taobao.org/mirrors/electron/'
        },
        productName: 'pictron',
        appId: 'com.golove.pictron',
        copyright: 'copyright 2021 golve',
        asar: true,
        dmg: {
          icon: 'dist_electron/pictron.icns',
          contents: [
            {
              x: 192,
              y: 344
            },
            {
              x: 448,
              y: 344,
              type: 'link',
              path: '/Applications'
            }
          ]
        },
        mac: {
          target: [
            {
              target: 'dmg',
              arch: [
                'x64',
                'arm64',
                'universal'
              ]
            }
          ],
          category: 'public.app-category.music'
        },
        linux: {
          icon: 'dist_electron/pictron.icns'
        },
        nsis: {
          runAfterFinish: false,
          deleteAppDataOnUninstall: true,
          allowToChangeInstallationDirectory: true,
          oneClick: false,
          installerLanguages: 'zh_CN',
          language: 2052,
          perMachine: true,
          createDesktopShortcut: true
        },

        win: {
          target: [
            {
              target: 'nsis',
              arch: [
                'x64',
                'ia32'
              ]
            },
            {
              target: '7z',
              arch: [
                'x64',
                'ia32'
              ]
            }
          ],
          icon: 'dist_electron/pictron.ico'
        }

      }
    }
  }
}
