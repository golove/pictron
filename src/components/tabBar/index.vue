<template>
  <div class="tabbar">
    <div class="icon">
      <svg v-if="albumFlag"  @click="goback">
      <use xlink:href="#arrowLeft" />
    </svg>
      <h2>golove</h2>
    </div>
    <div class="menu">
      <sideItem
        v-for="e in sideItem"
        :key="e.title"
        :class="{ active: num === e.path }"
        :side-item-value="e"
      />
    </div>

    <windowTool class="windowTool" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import sideItem from './sideItem.vue'
import windowTool from './windowTool.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../../store'
export default defineComponent({
  components: { sideItem, windowTool },
  setup () {
    const num = ref('/beauty')
    const sideItem = [
      { title: '唯美', path: '/', icon: '#beauty' },
      { title: '欧美', path: '/ustyle', icon: '#female' },
      { title: '漫画', path: '/carton', icon: '#carton' },
      { title: '美腿', path: '/leisi', icon: '#foot' },
      { title: '自拍', path: '/selfie', icon: '#camera' },
      { title: '露出', path: '/passion', icon: '#tree' },
      { title: '收藏', path: '/collect', icon: '#heart' },
      { title: '设置', path: '/setting', icon: '#setting' }
    ]
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // console.log(route)
    const albumFlag = computed(() => store.state.albumFlag)
    watch(route, (n) => {
      // console.log(n.path, o)
      num.value = n.path
    })
    const goback = () => {
      router.go(-1)
      store.commit('SET_ALBUMFLAG', false)
    }

    return {
      sideItem,
      num,
      goback,
      albumFlag
    }
  }
})
</script>
