
<template>
  <div v-masonry transition-duration="0.3s" item-selector=".item">
    <card
      v-masonry-tile
      class="item"
      v-for="(item, index) in imgCard"
      :key="item.title + index"
      :item="item"
    />
  </div>

  <button class="loadMoreBtnStyle" @click="reloadMethod" :disabled="reload">load more</button>
</template>

<script >
import { defineComponent, reactive, ref } from 'vue'
import { ipcRenderer } from 'electron'
import card from '../components/card/index.vue'
export default defineComponent({
  name: 'Leisi',
  components: { card },
  setup () {
    const imgCard = reactive([])
    const reload = ref(false)
    ipcRenderer.send('Leisi-message', {
      url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=21',
      reload: reload.value
    })
    ipcRenderer.on('Leisi-reply', (event, arg) => {
      // console.log(arg)
      if (arg) {
        imgCard.push(arg)
      }
    })
    ipcRenderer.on('Leisi-replyFlag', (event, arg) => {
      reload.value = arg
    })
    function reloadMethod () {
      reload.value = true
      ipcRenderer.send('Leisi-message', {
        url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=21',
        reload: reload.value
      })
    }
    // const imgCard = computed(() => imgData)

    return {
      reload,
      imgCard,
      reloadMethod
    }
  }
})
</script>
