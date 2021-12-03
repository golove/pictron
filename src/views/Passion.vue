
<template>
  <page-component
    :pages="{
      name: 'Passion',
      url: 'thread.php?fid=16',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageComponent from './pageComponent.vue'
export default defineComponent({
  name: 'Passion',
  components: { pageComponent }
})
</script>
