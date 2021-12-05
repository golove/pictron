import Sqlite3 from './PictureDB'
import type { IData, IDataS } from './type'
import DownloadImage from './download'
class ImgSpider {
  url
  DB
  name
  urls: Array<string> = []
  allImgData: Array<IData> = []
  collectData:Array<IData> = []
  downloadData:Array<IData> = []
  deletedData:Array<IData> = []
  constructor (url: string, tableName: string) {
    this.name = tableName
    this.url = url
    this.DB = new Sqlite3(tableName)
    this.DB.getAllImages((e: any, a: Array<IDataS>) => {
      if (e) console.error(e)
      if (a) {
        for (const item of a) {
          const temItem: IData = {
            classify: '',
            title: '',
            url: '',
            href: [],
            star: 0,
            collect: false,
            deleted: false,
            download: false
          }
          temItem.href = item.href.split(',')
          temItem.title = item.title
          temItem.classify = item.classify
          temItem.url = item.url
          temItem.star = item.star
          temItem.collect = item.collect
          temItem.deleted = item.deleted
          temItem.download = item.download
          this.urls.push(item.url)
          if (temItem.collect) {
            this.collectData.push(temItem)
          }
          if (temItem.download) {
            this.downloadData.push(temItem)
          }
          if (temItem.deleted) {
            this.deletedData.push(temItem)
          } else {
            this.allImgData.push(temItem)
          }
        }
      }
    })
  }

  findHref (html: string, rootUrl:string): Array<string> {
    const hreflist: Array<string> = []
    const b = /html_data([^<>"]*)/gi
    const hrefs = html.match(b)
    if (hrefs) {
      for (const e of hrefs) {
        const href = rootUrl + e
        hreflist.push(href)
      }
    }

    const Hrefs = Array.from(new Set(hreflist))
    Hrefs.pop()

    if (this.urls.length > 0) {
      const array: string[] = []
      for (const item of Hrefs) {
        if (this.urls.includes(item)) {
          // console.log(item)
        } else {
          array.push(item)
          this.urls.push(item)
        }
      }

      return array
    } else {
      this.urls = Hrefs
      return Hrefs
    }
  }

  findImgsrc (html: string, url: string): IData | undefined {
    const b = /https:\/\/p99.ajpiczs.com\/([^<>"]*)\.jpg/gi
    const srcs = html.match(b)

    // 匹配 img 的 title 值
    const t = /<span id="subject_tpc">(.*?)<\/span>/gi

    const titles = t.exec(html)

    if (srcs && titles) {
      const hrefs: Array<string> = []
      srcs.forEach((e, i) => {
        if (i % 2 === 0) {
          hrefs.push(e)
        }
      })
      const obj: IData = { classify: this.name, title: titles[1], url, href: hrefs, star: 0, collect: false, deleted: false, download: false }
      this.allImgData.push(obj)
      this.DB.createImages(obj)
      if (obj) {
        return obj
      }
    }
  }

  findImgCard (url:string, actName:string):Promise<unknown> | boolean | undefined {
    const R = this.allImgData.find((e) => e.url === url)
    if (R !== undefined) {
      if (R[actName]) {
        R[actName] = false
        this[actName + 'Data'].splice(this[actName + 'Data'].findIndex((item:IData) => item === R), 1)
        this.DB.updateImg(`${actName}=0`, url)
        return false
      } else {
        R[actName] = true
        this[actName + 'Data'].push(R)
        this.DB.updateImg(`${actName}=1`, url)
        if (actName === 'download') {
          const getflag = new DownloadImage(R)
          const res = getflag.download()
          return res
        }
        return true
      }
    }
  }
}

export default ImgSpider
