<template>
  <div  class="contair" :class="albumFlag ? 'contextscrollhide' : 'context'" >
     <!-- <tab-bar /> -->
    <router-view />
  </div>
  <album class="album" />
</template>

<script>
import { computed, defineComponent } from 'vue'
// import sideItem from './sideItem.vue'
// import tabBar from '../components/tabBar/index.vue'
import { useStore } from '../store'
import album from '../components/album/index.vue'
export default defineComponent({
  name: 'Layout',
  components: { album },
  setup () {
    const store = useStore()
    const albumFlag = computed(() => store.state.albumFlag)
    return {
      albumFlag
    }
  }
})
</script>
