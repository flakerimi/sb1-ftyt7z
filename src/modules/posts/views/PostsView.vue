<template>
  <div class="posts-view">
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.excerpt }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useApi } from '@core/composables/useApi'

interface Post {
  id: number
  title: string
  excerpt: string
}

export default defineComponent({
  name: 'PostsView',
  setup() {
    const api = useApi()
    const posts = ref<Post[]>([])

    onMounted(async () => {
      try {
        posts.value = await api.get('/posts')
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    })

    return { posts }
  }
})
</script>