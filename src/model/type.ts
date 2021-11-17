export type IData = {
  classify:string,
    title: string,
    url:string,
    href: Array<string>,
    star: number,
    collect: boolean,
    deleted: boolean,
    download: boolean
  }
export type IDataS = {
  classify:string,
    title: string,
    url:string,
    href: string,
    star: number,
    collect: boolean,
    deleted: boolean,
    download: boolean
  }
export type Cb = (e: any, a: Array<IDataS>) => void;
export type Cd = (e: any, a: IDataS) => void;
