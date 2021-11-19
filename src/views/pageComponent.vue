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

  <button :class="reload?'btndisabledstyle':'loadMoreBtnStyle'" @click="reloadMethod" :disabled="reload">
    {{ reload ? "loading..." : "load more" }}
  </button>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import card from '../components/card/index.vue'
import { ipcRenderer } from 'electron'
// import { useStore } from '../store'

// import cardData from './imgData'
export default defineComponent({
  name: 'Beauty',
  components: { card },
  props: {
    pages: {
      type: Object,
      default: () => ({
        name: 'Beauty',
        url: 'https://k6.c5cbca7s.pw/pw/thread.php?fid=14'
      })
    }
  },
  setup (props) {
    const cardData = reactive([])
    const reload = ref(true)
    const page = computed(() => props.pages)

    ipcRenderer.send(page.value.name + '-message', {
      url: page.value.url
      // reload: reload.value
    })

    ipcRenderer.on(page.value.name + '-reply', (event, arg) => {
      // console.log(arg)
      if (arg) {
        cardData.push(arg)
      }
    })

    ipcRenderer.on(page.value.name + '-replyFlag', (event, arg) => {
      reload.value = arg
    })

    function reloadMethod () {
      reload.value = true
      ipcRenderer.send(page.value.name + '-message', {
        url: page.value.url + '&page=1',
        reload: reload.value
      })
    }

    return { cardData, reloadMethod, reload }
  }
})
</script>
