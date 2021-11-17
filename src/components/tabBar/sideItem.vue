<template>
  <router-link class="sideItem" :to="itemValue.path">
    <svg>
      <use :xlink:href="itemValue.icon" />
    </svg>
    {{ itemValue.title }}
  </router-link>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SideItem',
  props: {
    sideItemValue: {
      type: Object,
      default: () => ({ title: 'home', path: '/home', icon: '#home' })
    }
  },
  setup (props) {
    const itemValue = computed(() => props.sideItemValue)

    return {
      itemValue
    }
  }
})
</script>
