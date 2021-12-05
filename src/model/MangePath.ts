import { createPathTable, savePathAndUrl, getPathAndUrl, updatePathAndUrl } from './PathAndUrlDB'
// type Ipath = {id:string, path:string, url:string}

class MangePath {
  url=''
  path = ''
  constructor () {
    createPathTable()
    getPathAndUrl((e, a) => {
      if (e) console.log(e)
      if (a) {
        console.log(a)
        this.url = a.url
        this.path = a.path
      } else { this.create() }
    })
  }

  create ():void{
    const TTo = setTimeout(() => {
      savePathAndUrl('Pictures', 'https://k6.hfv942p0.org/pw/')
      clearTimeout(TTo)
    }, 50)
  }

  update (setValue:string):void {
    updatePathAndUrl(setValue)
  }
}

export default MangePath
