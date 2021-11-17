/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'request-promise'
declare module 'sqlite3'
declare module 'vue-masonry'
declare module 'vue-masonry/src/masonry-vue3.plugin'