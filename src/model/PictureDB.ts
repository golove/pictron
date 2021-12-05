import sqlite3 from 'sqlite3'
import type { IData, IDataS, Cb, Cd } from './type'
// const db = new sqlite3.Database('pictron_database.db')
class SqliteDB {
  tableName
  db
  constructor (tableName:string) {
    this.tableName = tableName
    this.db = new sqlite3.Database('pictron_database.db')
    this.db.run('PRAGMA foreign_keys = ON')
    // CONSTRAINT unique_username UNIQUE(username)  对username做了唯一约束
    // 创建accounts用户表格的命令
    // CreationTime为创建时间
    this.db.run(`
CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    classify TEXT,
    title TEXT,
    url TEXT,
    href BLOB,
    star INTEGER,
    collect NUMERIC,
    deleted NUMERIC,
    download NUMERIC,
    CONSTRAINT unique_url UNIQUE(url)
)
`)
  }

  createImages (obj: IData): void {
    // console.log(obj.title)
    const values = []

    for (const i in obj) {
      values.push(obj[i])
    }
    const query = `INSERT INTO ${this.tableName} (classify,title,url, href, star, collect, deleted, download) VALUES (?,?,?, ?, ?, ?, ?, ?)`
    // const values = [obj.title, obj.href, obj.star, obj.collect, obj.deleted, obj.download]
    this.db.run(query, values, (error: any) => {
      if (error) console.error(error)
    })
  }

  getImages (title: string, callback: Cd): void {
    const query = `SELECT * FROM ${this.tableName} WHERE title = ?`
    const values = [title]
    this.db.get(query, values, function (error: any, img: IDataS) {
      callback(error, img)
    })
  }

  getAllImages (callback: Cb): void {
    const query = `SELECT * FROM ${this.tableName}`

    this.db.all(query, function (error: any, allimg: Array<IDataS>) {
      callback(error, allimg)
    })
  }

  updateImg (setValue:string, url:string):void{
    const query = `UPDATE ${this.tableName} SET ${setValue} WHERE url = '${url}'`
    this.db.exec(query)
  }
}
export default SqliteDB
