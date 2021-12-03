
<template>
  <page-component
    :pages="{
      name: 'Leisi',
      url: 'thread.php?fid=21',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageComponent from './pageComponent.vue'
export default defineComponent({
  name: 'Leisi',
  components: { pageComponent }
})
</script>
