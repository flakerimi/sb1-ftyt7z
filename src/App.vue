<template>
  <div>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@core/layouts/DefaultLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout,
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => {
      return (route.meta.layout || 'DefaultLayout') + 'Layout'
    })

    return { layout }
  }
})
</script>