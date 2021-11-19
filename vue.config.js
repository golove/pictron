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

        linux: {
        }
      }
    }
  }
}
