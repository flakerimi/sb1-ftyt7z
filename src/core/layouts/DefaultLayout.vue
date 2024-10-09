<template>
  <div class="default-layout">
    <header>
      <!-- Add header content -->
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <!-- Add footer content -->
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
})
</script>