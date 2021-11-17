<template>
  <div
    class="cardParent"
    v-masonry
    transition-duration="0.3s"
    item-selector=".item"
  >
    <card
      v-masonry-tile
      class="item"
      v-for="(item, index) in cardData"
      :key="item.title + index"
      :item="item"
    />
  </div>

  <button class="loadMoreBtnStyle" @click="reloadMethod" :disabled="reload">
    {{reload?"loading...":"load more"}}
  </button>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import card from '../components/card/index.vue'
import { ipcRenderer } from 'electron'
// import { useStore } from '../store'

// import cardData from './imgData'
export default defineComponent({
  name: 'Beauty',
  components: { card },
  setup () {
    const cardData = reactive([])
    const reload = ref(false)

    ipcRenderer.send('Beauty-message', {
      url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=14',
      reload: reload.value
    })

    ipcRenderer.on('Beauty-reply', (event, arg) => {
      // console.log(arg)
      if (arg) {
        cardData.push(arg)
      }
    })

    ipcRenderer.on('Beauty-replyFlag', (event, arg) => {
      reload.value = arg
    })

    function reloadMethod () {
      reload.value = true
      ipcRenderer.send('Beauty-message', {
        url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=14&page=1',
        reload: reload.value
      })
    }

    return { cardData, reloadMethod, reload }
  }
})
</script>
