<template>
  <div v-if="label && card.collect && !card.deleted" @click="showAll">
    <img :src="card.href[0]" :alt="card.title" />

    <div class="title">{{ card.title }}</div>
    <act-tool :acItem="item" />
  </div>

<div v-else-if="!card.deleted && !label" @click="showAll">
    <img :src="card.href[0]" :alt="card.title" />

    <div class="title">{{ card.title }}</div>
    <act-tool :acItem="item" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue'
import { useStore } from '../../store'
import actTool from './actronTool.vue'
// import { ipcRenderer } from 'electron'
import useRoute from '../../router'
export default defineComponent({
  name: 'Card',
  components: {
    actTool
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        title: 'Yura Kano 架乃',
        url: '',
        href: [
          'https://p99.ajpiczs.com/i/2021/10/11/p6y8du.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6y4wy.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6yjf9.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6yrdk.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6z0cd.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6z9ac.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6zotd.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6zops.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p6zx5w.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p70cpp.jpg',
          'https://p99.ajpiczs.com/i/2021/10/11/p70kgl.jpg'
        ],
        star: 0,
        collect: false,
        deleted: false,
        download: false
      })
    },
    label: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props) {
    const store = useStore()
    // const router = useRoute()
    const showFlag = ref(false)
    const card = computed(() => props.item)
    const hrefs = reactive([])
    const positionSrc = ref('')
    const showLgFlag = ref(false)
    function showAll (): void {
      useRoute.push('/album')
      store.commit('SET_ALBUM', {
        hrefs: card.value.href,
        title: card.value.title
      })
      store.commit('SET_ALBUMFLAG', true)
      // console.log(store.state.albumFlag)
      // ipcRenderer.send('newwindow')
    }

    const showlabel = computed(() => props.label)

    return {
      card,
      showAll,
      showFlag,
      hrefs,
      positionSrc,
      showLgFlag,
      showlabel
    }
  }
})
</script>
