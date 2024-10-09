<template>
  <div class="admin-view">
    <h1>Admin Panel</h1>
    <Button label="Add New Post" @click="showNewPostDialog = true" />
    
    <Dialog v-model:visible="showNewPostDialog" header="Add New Post" :modal="true">
      <div class="p-fluid">
        <div class="p-field">
          <label for="title">Title</label>
          <InputText id="title" v-model="newPost.title" required autofocus />
        </div>
        <div class="p-field">
          <label for="content">Content</label>
          <Textarea id="content" v-model="newPost.content" required rows="5" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="showNewPostDialog = false" class="p-button-text"/>
        <Button label="Save" icon="pi pi-check" @click="savePost" autofocus />
      </template>
    </Dialog>

    <DataTable :value="posts" :paginator="true" :rows="10">
      <Column field="id" header="ID"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="createdAt" header="Created At"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editPost(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deletePost(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useApi } from '@core/composables/useApi'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

export default defineComponent({
  name: 'AdminView',
  components: {
    Button,
    Dialog,
    InputText,
    Textarea,
    DataTable,
    Column,
  },
  setup() {
    const api = useApi()
    const posts = ref<Post[]>([])
    const showNewPostDialog = ref(false)
    const newPost = ref({ title: '', content: '' })

    onMounted(async () => {
      try {
        posts.value = await api.get('/admin/posts')
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    })

    const savePost = async () => {
      try {
        await api.post('/admin/posts', newPost.value)
        showNewPostDialog.value = false
        // Refresh posts list
        posts.value = await api.get('/admin/posts')
      } catch (error) {
        console.error('Failed to save post:', error)
      }
    }

    const editPost = (post: Post) => {
      // Implement edit functionality
    }

    const deletePost = async (post: Post) => {
      try {
        await api.post(`/admin/posts/${post.id}/delete`)
        // Refresh posts list
        posts.value = await api.get('/admin/posts')
      } catch (error) {
        console.error('Failed to delete post:', error)
      }
    }

    return {
      posts,
      showNewPostDialog,
      newPost,
      savePost,
      editPost,
      deletePost,
    }
  }
})
</script>