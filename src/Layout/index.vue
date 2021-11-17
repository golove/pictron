<template>
  <div class="contair" :class="albumFlag ? 'contextscrollhide' : 'context'">
    <router-view />
  </div>
  <album class="album" />
</template>

<script>
import { computed, defineComponent } from 'vue'
// import sideItem from './sideItem.vue'
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

<style lang='scss'>
.contair {
  position: absolute;
  top: 37px;
  height: 96vh;
  width: 100vw;

}

.contextscrollhide {
  overflow: hidden;
}
.context {
  overflow: scroll;
  &::-webkit-scrollbar {
    position: absolute;
    width: 10px;
    height: 0px;
    &:hover {
      width: 15px;
    }
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(212, 228, 231);

  }
  &::-webkit-scrollbar-thumb {
    background-color:  rgb(255, 0, 106);;
    border-radius: 5px;
    cursor: pointer;

  }
}
</style>
