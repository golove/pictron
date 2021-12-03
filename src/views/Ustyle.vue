<template>
  <page-component
    :pages="{
      name: 'Ustyle',
      url: 'thread.php?fid=114',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageComponent from './pageComponent.vue'
export default defineComponent({
  name: 'Ustyle',
  components: { pageComponent }
})
</script>
