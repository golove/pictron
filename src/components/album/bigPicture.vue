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

<script lang="ts">

import { computed, defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'bigPicture',
  props: {
    pictures: {
      type: Array,
      default: () => [
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
      ]
    },
    picIndex: {
      type: Number,
      default: () => 0
    }
  },
  setup (props, context) {
    const pictureList = computed(() => props.pictures)
    const pindex = computed(() => props.picIndex)
    function showthis (i:number) {
      // i < pindex.value ? (arrowFlag.value = false) : (arrowFlag.value = true)
      if (i < pindex.value) {
        arrowFlag.value = false
        goto(i)
      } else if (i > pindex.value) {
        arrowFlag.value = true
        goto(i)
      } else {
        return false
      }
    }

    const playFlag = ref(false)
    function closeBigPicture () {
      context.emit('changeFlag', 0)
      if (playFlag.value) {
        play(0, false)
      }
    }

    const delay = ref(3000)
    function play (picIndex:number, flag?:boolean) {
      if (flag === undefined) {
        playFlag.value = !playFlag.value
      } else {
        playFlag.value = flag
      }

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
      }, delay.value)
    }

    const arrowFlag = ref(false)
    function arrowpicture (flag:boolean, picIndex:number) {
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
    function goto (index:number) {
      isShow.value = false

      const tout = setTimeout(() => {
        isShow.value = true
        context.emit('setPicIndex', index)
        clearTimeout(tout)
      }, 10)
    }

    function setScrollLeft (n:number) {
      const actDom = document.getElementsByClassName('smPicture')[0]
      const step = (actDom.scrollWidth) / (pictureList.value.length)
      actDom.scrollLeft = n * step
    }
    watch(pindex, (n) => {
      setScrollLeft(n)
    })

    onMounted(() => {
      setScrollLeft(pindex.value)
    })

    document.onkeydown = function (e) {
      // console.log(e)
      if (e.code === 'ArrowRight') {
        arrowpicture(true, pindex.value)
      } else if (e.code === 'ArrowLeft') {
        arrowpicture(false, pindex.value)
      } else if (e.code === 'Enter' || e.code === 'Space') {
        play(pindex.value)
      }
      // else if (typeof parseInt(e.key) === 'number') {
      // showthis(parseInt(e.key))
      // delay.value = 500 + (parseInt(e.key) * 500)
      // play(pindex.value)
      // console.log(delay.value)
      // }
    }

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
