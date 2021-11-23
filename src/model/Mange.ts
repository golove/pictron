import ImgSpider from './JsSpider'
import type { IData } from './type'
class MangeData {
    Beauty:ImgSpider
    Ustyle:ImgSpider
    Carton:ImgSpider
    Leisi:ImgSpider
    Selfie:ImgSpider
    Passion:ImgSpider

    constructor () {
      this.Beauty = new ImgSpider('https://k6.c5cbca7s.pw/pw/thread.php?fid=14', 'Beauty')
      this.Ustyle = new ImgSpider('https://k6.c5cbca7s.pw/pw/thread.php?fid=114', 'Ustyle')
      this.Carton = new ImgSpider('https://k6.c5cbca7s.pw/pw/thread.php?fid=106', 'Carton')
      this.Leisi = new ImgSpider('https://k6.c5cbca7s.pw/pw/thread.php?fid=21', 'Leisi')
      this.Selfie = new ImgSpider('https://k6.c5cbca7s.pw/pw/thread.php?fid=15', 'Selfie')
      this.Passion = new ImgSpider('https://k6.c5cbca7s.pw/pw/thread.php?fid=16', 'Passion')
    }

    getAllCollect ():Array<IData> {
      return [...this.Beauty.collectData, ...this.Ustyle.collectData, ...this.Carton.collectData,
        ...this.Leisi.collectData, ...this.Selfie.collectData, ...this.Passion.collectData]
    }

    getAllDownload ():Array<IData> {
      return [...this.Beauty.downloadData, ...this.Ustyle.downloadData, ...this.Carton.downloadData,
        ...this.Leisi.downloadData, ...this.Selfie.downloadData, ...this.Passion.downloadData]
    }

    getAllDelete ():Array<IData> {
      return [...this.Beauty.deletedData, ...this.Ustyle.deletedData, ...this.Carton.deletedData,
        ...this.Leisi.deletedData, ...this.Selfie.deletedData, ...this.Passion.deletedData]
    }
}

export default MangeData
