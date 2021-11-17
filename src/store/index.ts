// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  album: Array<string>,
  albumTitle:string,
  albumFlag:boolean
}

interface IAlbum{
  hrefs:Array<string>,
  title:string,
}

// define injection key
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    album: [''],
    albumTitle: '',
    albumFlag: false

  },
  getters: {
  },
  mutations: {
    SET_ALBUM (state, data: IAlbum) {
      state.album = data.hrefs
      state.albumTitle = data.title
    },
    SET_ALBUMFLAG (state, data:boolean) {
      state.albumFlag = data
    }
  },
  actions: {

  }
})

// define your own `useStore` composition function
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore () {
  return baseUseStore(key)
}
