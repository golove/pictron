
import request from 'request-promise'
import Sqlite3 from './db'
import type { IData, IDataS } from './type'

type Data = { res: any, url: string }

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
      if (a) {
        if (e) console.error(e)
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

  async getPage (url: string): Promise<Data> {
    const userAgents = [
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
      'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
      'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
      'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    ]
    const userAgent = userAgents[Math.floor((Math.random() * userAgents.length))]
    const headers = { 'User-Agent': userAgent }
    const opts = { url, headers }
    const data = { res: await request(opts), url }
    return data
  }

  findHref (html: string): Array<string> {
    const hreflist: Array<string> = []
    const b = /html_data([^<>"]*)/gi
    const hrefs = html.match(b)
    if (hrefs) {
      for (const e of hrefs) {
        const href = 'https://k6.c5cbca7s.pw/pw/' + e
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

  findImgCard (url:string, actName:string):void {
    this.allImgData.find((e) => {
      if (e.url === url) {
        if (e[actName]) {
          e[actName] = 0
          this[actName + 'Data'].splice(this[actName + 'Data'].findIndex((item:IData) => item === e), 1)
          this.DB.updateImg(`${actName}=0`, url)
        } else {
          e[actName] = 1
          this[actName + 'Data'].push(e)
          this.DB.updateImg(`${actName}=1`, url)
        }
      }
    })
  }
}

export default ImgSpider
