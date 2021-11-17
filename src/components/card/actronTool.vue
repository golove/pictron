<template>
  <div class="actTool">
 <!-- <div class="count">
      {{ actool.href.length }}
    </div> -->
    <svg
      @click.stop="submit('collect')"
      :class="actool.collect ? 'collectstyled' : 'collectstyle'"
    >
      <use xlink:href="#heart" />
    </svg>
    <!-- <svg :class="actool.star?'collectstyled':'collectstyle'">
      <use xlink:href="#star" />
    </svg> -->
     <div>
      <svg
        @click.stop="submit('download')"
        :class="actool.download ? 'collectstyled' : 'collectstyle'"
      >
        <use xlink:href="#download_circle" />
      </svg>
      <svg
        @click.stop="submit('deleted')"
        :class="actool.deleted ? 'collectstyled' : 'collectstyle'"
      >
        <use xlink:href="#trash" />
      </svg>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { ipcRenderer } from 'electron'

export default defineComponent({
  name: 'ActTool',
  props: {
    acItem: { type: Object }
  },
  setup (props) {
    const actool = computed(() => props.acItem)
    function submit (e) {
      if (actool.value[e]) {
        actool.value[e] = 0
      } else {
        actool.value[e] = 1
      }
      // console.log(e)
      ipcRenderer.send('changeActool', {
        url: actool.value.url,
        actName: e,
        classify: actool.value.classify
      })
    }

    return {
      actool,
      submit
    }
  }
})
</script>
