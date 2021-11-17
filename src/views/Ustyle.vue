<template>

 <div v-masonry transition-duration="0.3s" item-selector=".item">
    <card
      v-masonry-tile class="item"
      v-for="(item,index) in arr"
      :key="item.title+index"
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
  name: 'Ustyle',
  components: { card },
  setup () {
    const arr = reactive([])
    const reload = ref(false)
    ipcRenderer.send('Ustyle-message', { url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=114', reload: reload.value })

    ipcRenderer.on('Ustyle-reply', (event, arg) => {
      // console.log(arg)
      if (arg) {
        arr.push(arg)
      }
    })
    ipcRenderer.on('Ustyle-replyFlag', (event, arg) => {
      reload.value = arg
    })
    function reloadMethod () {
      reload.value = true
      ipcRenderer.send('Ustyle-message', { url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=114', reload: reload.value })
    }
    return { reload, arr, reloadMethod }
  }
})
</script>
