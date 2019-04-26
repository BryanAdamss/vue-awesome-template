/**
 * @author ghchu
 * @description downloader-test 测试页
 */

const DownloaderTest = () =>
  import(/* webpackChunkName:'DownloaderTest' */ 'Views/DownloaderTest/DownloaderTest')

export default [
  {
    path: '/downloader-test',
    name: 'DownloaderTest',
    component: DownloaderTest,
    meta: {
      title: '测试DownloaderTest'
    }
  }
]
