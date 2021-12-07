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
        copyright: 'copyright 2021 golove',
        dmg: {
          icon: 'public/icons/icon.icns',
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
          category: 'public.app-category.utility'
        },
        linux: {
          category: 'Utility',
          target: [
            'AppImage',
            'deb'
          ]
        },
        directories: {
          buildResources: 'public'
        }
      }
    }
  }
}
