<template>
  <div class="windowTool">
    <div class="min svgparent" @click="sendIpc('min')">
      <svg>
        <use xlink:href="#minus" />
      </svg>
    </div>
    <div class="max svgparent" @click="sendIpc('max')">
      <svg>
        <use xlink:href="#max" />
      </svg>
    </div>
    <div class="close svgparent" @click="sendIpc('close')">
      <svg>
        <use xlink:href="#close" />
      </svg>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ipcRenderer } from 'electron'
export default defineComponent({
  name: 'windowTool',
  setup () {
    function sendIpc (tag) {
      ipcRenderer.send('windowTool', tag)
    }
    return {
      sendIpc
    }
  }
})
</script>
