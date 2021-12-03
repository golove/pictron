
<template>

  <page-component
    :pages="{
      name: 'Selfie',
      url: 'thread.php?fid=15',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageComponent from './pageComponent.vue'
export default defineComponent({
  name: 'Selfie',
  components: { pageComponent }
})
</script>
