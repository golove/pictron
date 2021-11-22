<template>
  <tab-bar />
  <router-view />
  <svgview />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import svgview from './svg.vue'
import tabBar from './components/tabBar/index.vue'

export default defineComponent({
  name: 'App',
  components: { svgview, tabBar }
})
</script>
