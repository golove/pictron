import sqlite3 from 'sqlite3'
type Ipath = {id:string, path:string, url:string}

const db = new sqlite3.Database('path_database.db')
export function createPathTable (): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS Pathandurl (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT,
        url TEXT,
        CONSTRAINT unique_url UNIQUE(url)
    )
    `)
}

export function savePathAndUrl (path:string, url:string): void {
  const query = 'INSERT INTO Pathandurl (path, url) VALUES (?,?)'
  const values = [path, url]
  db.run(query, values, (error: any) => {
    if (error) console.error(error)
  })
}

export function getPathAndUrl (callback: (e: any, args: Ipath) => void): void {
  const query = 'SELECT * FROM Pathandurl WHERE id = 1'
  db.get(query, function (error: any, all: Ipath) {
    callback(error, all)
  })
}

export function updatePathAndUrl (updatValue: string): void {
  const query = `UPDATE Pathandurl SET ${updatValue} WHERE id = '1'`
  db.exec(query)
}
