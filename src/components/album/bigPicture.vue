<template>
  <div class="bigPicture">
    <div class="close" @click="closeBigPicture">
      <svg>
        <use xlink:href="#close" />
      </svg>
    </div>

      <svg class="playstyle arrowright" @click="arrowpicture(true, pindex)">
        <use xlink:href="#circle-right" />
      </svg>

    <svg class="playstyle play" @click="play(pindex)">
      <use :xlink:href="playFlag ? '#pause' : '#play'" />
    </svg>

      <svg class="playstyle arrowleft" @click="arrowpicture(false, pindex)">
        <use xlink:href="#circle-left" />
      </svg>

    <div class="imgstyle">
      <transition :name="arrowFlag ? 'slide-trans' : 'slide-fade'">
        <img
          v-if="isShow"
          :class="playFlag ? 'moreBig' : 'bigBit'"
          :src="pictureList[pindex]"
          alt=""
        />
      </transition>
      <transition :name="arrowFlag ? 'slide-trans-old' : 'slide-fade-old'">
        <img
          v-if="!isShow"
          :class="playFlag ? 'moreBig' : 'bigBit'"
          :src="pictureList[pindex]"
          alt=""
        />
      </transition>
    </div>
    <div
      class="smPicture"
      :class="playFlag ? 'hideSmPicture' : 'showSmPicture'"
    >
      <img
        @click="showthis(i)"
        v-for="(e, i) in pictureList"
        :class="pindex == i ? 'activeImg' : ''"
        :src="e"
        :key="e + i"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'bigPicture',
  props: {
    pictures: {
      type: Array
    },
    picIndex: {
      type: Number
    }
  },
  setup (props, context) {
    const pictureList = computed(() => props.pictures)
    const pindex = computed(() => props.picIndex)
    function showthis (i) {
      i < pindex.value ? (arrowFlag.value = false) : (arrowFlag.value = true)
      goto(i)
    }

    const playFlag = ref(false)
    function closeBigPicture () {
      context.emit('changeFlag', 0)
      if (playFlag.value) {
        play()
      }
    }
    function play (picIndex) {
      playFlag.value = !playFlag.value
      arrowFlag.value = true
      const interval = setInterval(() => {
        if (playFlag.value) {
          picIndex++
          if (picIndex === pictureList.value.length) {
            picIndex = 0
          }
          goto(picIndex)
        } else {
          clearInterval(interval)
        }
      }, 5000)
    }

    const arrowFlag = ref(false)
    function arrowpicture (flag, picIndex) {
      arrowFlag.value = flag
      if (flag) {
        picIndex++
        if (picIndex === pictureList.value.length) {
          picIndex = 0
        }
      } else {
        picIndex--
        if (picIndex < 0) {
          picIndex = pictureList.value.length - 1
        }
      }
      goto(picIndex)
    }

    const isShow = ref(true)
    function goto (index) {
      isShow.value = false

      const tout = setTimeout(() => {
        isShow.value = true
        context.emit('setPicIndex', index)
        clearTimeout(tout)
      }, 10)
    }

    function setScrollLeft (n) {
      const actDom = document.getElementsByClassName('smPicture')[0]
      actDom.scrollLeft = n * 45
    }
    watch(pindex, (n) => {
      setScrollLeft(n)
    })

    onMounted(() => {
      setScrollLeft(pindex.value)
    })

    return {
      isShow,
      pictureList,
      pindex,
      showthis,
      closeBigPicture,
      play,
      playFlag,
      arrowpicture,
      arrowFlag
    }
  }
})
</script>
