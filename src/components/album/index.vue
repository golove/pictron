<template>
  <div
    v-show="albumFlag"
    :class="bigPictureFlag ? 'albumBoxScrollHide' : 'albumBox'"
  >
    <big-picture
      v-if="bigPictureFlag"
      @changeFlag="showOrCloseBigPicture"
      @setPicIndex="setPicIndex"
      :pictures="albums"
      :picIndex="picIndex"
    />
    <div class="bar">
      <h2>golove</h2>
      <p class="title">{{ albumTitle }}</p>
      <div class="close" @click="changeAlbumFlag">
        <svg>
          <use xlink:href="#close" />
        </svg>
      </div>
    </div>
    <div class="albums">
      <div
        class="imgitem"
        @click="showOrCloseBigPicture(index)"
        :key="item + index"
        v-for="(item, index) in albums"
      >
        <img :src="item" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '../../store'
import bigPicture from './bigPicture.vue'

export default defineComponent({
  name: 'album',
  components: { bigPicture },
  setup () {
    // const internalInstance = getCurrentInstance()

    const store = useStore()
    const albumFlag = computed(() => store.state.albumFlag)
    const albums = computed(() => store.state.album)
    const albumTitle = computed(() => store.state.albumTitle)
    function changeAlbumFlag () {
      store.commit('SET_ALBUMFLAG', false)
    }

    const bigPictureFlag = ref(false)
    const picIndex = ref(0)
    function showOrCloseBigPicture (index:number) {
      picIndex.value = index
      bigPictureFlag.value = !bigPictureFlag.value
      // console.log('album:' + picIndex.value)
    }
    function setPicIndex (index:number) {
      picIndex.value = index
      // console.log('album:' + picIndex.value)
    }
    // const albumMasonryId = ref('album')
    // console.log(internalInstance.appContext.config.globalProperties.$redrawVueMasonry)
    // internalInstance.appContext.config.globalProperties.$redrawVueMasonry(albumMasonryId.value)
    // watchEffect(() => {
    //   console.log(albums)
    //   internalInstance.appContext.config.globalProperties.$redrawVueMasonry(
    //     albumMasonryId.value
    //   )
    // })
    // watch(albums, (n) => {
    //   // console.log(n)
    //   internalInstance.appContext.config.globalProperties.$redrawVueMasonry(
    //     albumMasonryId.value
    //   )
    // })

    return {
      changeAlbumFlag,
      albumFlag,
      bigPictureFlag,
      showOrCloseBigPicture,
      albums,
      albumTitle,
      picIndex,
      setPicIndex
    }
  }
})
</script>
