
<template>
  <div class="cardParent" v-masonry transition-duration="0.3s" item-selector=".item">
    <card
      v-masonry-tile
      class="item"
      v-for="(item, index) in imgCard"
      :key="item.title + index"
      :item="item"
      :label="true"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { ipcRenderer } from 'electron'
import card from '../components/card/index.vue'
export default defineComponent({
  name: 'Collect',
  components: { card },
  setup () {
    const imgCard = reactive([])
    const reload = ref(false)
    ipcRenderer.send('Collect-message', {
      url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=15',
      reload: reload.value
    })
    ipcRenderer.on('Collect-reply', (event, arg) => {
      if (arg) {
        imgCard.push(arg)
      }
    })

    return {
      imgCard
    }
  }
})
</script>
