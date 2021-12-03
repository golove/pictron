
<template>
  <page-component
    :pages="{
      name: 'Carton',
      url: 'thread.php?fid=106',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageComponent from './pageComponent.vue'
export default defineComponent({
  name: 'Carton',
  components: { pageComponent }
})
</script>
