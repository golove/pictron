<template>
  <div class="actTool">
 <!-- <div class="count">
      {{ actool.href.length }}
    </div> -->
    <svg
      @click.stop="collectMethod"
      :class="actool.collect ? 'collectstyled' : 'collectstyle'"
    >
      <use xlink:href="#heart" />
    </svg>
    <!-- <svg :class="actool.star?'collectstyled':'collectstyle'">
      <use xlink:href="#star" />
    </svg> -->
     <div>
      <svg
        @click.stop="downloadMethod"
        :class="actool.download ? 'collectstyled' :downloadflag? 'svgAnimate' :'collectstyle'"
      >
        <use v-if="actool.download" xlink:href="#check_circle" />
        <use v-else :xlink:href="downloadflag?'#refresh':'#download_circle'" />
      </svg>
      <svg
        @click.stop="deleteMethod"
        :class="actool.deleted ? 'collectstyled' : 'collectstyle'"
      >
        <use xlink:href="#trash" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ipcRenderer } from 'electron'

export default defineComponent({
  name: 'ActTool',
  props: {
    acItem: {
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
    }
  },
  setup (props) {
    const actool = computed(() => props.acItem)
    const downloadflag = ref(false)
    const collectflag = ref(false)
    const deletedflag = ref(false)

    function collectMethod () {
      actool.value.collect = !actool.value.collect
      ipcRenderer.send('changeActool', {
        url: actool.value.url,
        actName: 'collect',
        classify: actool.value.classify
      })
      ipcRenderer.on('collect-reply', (event, arg) => {
        // actool.value.collect = arg
        console.log('collect:' + arg)
      })
    }

    function downloadMethod () {
      if (!actool.value.download) {
        downloadflag.value = true
        ipcRenderer.send('changeActool', {
          url: actool.value.url,
          actName: 'download',
          classify: actool.value.classify
        })
        ipcRenderer.on('download-reply', (event, arg) => {
          actool.value.download = arg
          console.log('collect:' + arg)
        })
      }
    }

    function deleteMethod () {
      actool.value.deleted = !actool.value.deleted
      ipcRenderer.send('changeActool', {
        url: actool.value.url,
        actName: 'deleted',
        classify: actool.value.classify
      })
      ipcRenderer.on('deleted-reply', (event, arg) => {
        // actool.value.collect = arg
        console.log('delete:' + arg)
      })
    }

    return {
      collectMethod,
      downloadMethod,
      deleteMethod,
      actool,
      downloadflag,
      deletedflag,
      collectflag
    }
  }
})
</script>
