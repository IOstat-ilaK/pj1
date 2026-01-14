<template>
  <div class="note-detail max-w-4xl mx-auto">
    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded p-4">
      <p class="text-red-600">{{ error }}</p>
      <button @click="fetchNote" class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Попробовать снова
      </button>
    </div>

    <!-- Заметка -->
    <div v-else-if="note" class="bg-white rounded-lg shadow p-8">
      <!-- Заголовок и действия -->
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ note.title }}</h1>
        <div class="space-x-2">
          <router-link 
            :to="`/edit/${note.id}`"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Редактировать
          </router-link>
          <button 
            @click="deleteNote"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>

      <!-- Мета-информация -->
      <div class="flex items-center space-x-4 mb-8 text-gray-600">
        <span class="px-3 py-1 bg-gray-100 rounded">
          {{ note.status === 'published' ? 'Опубликовано' : 'Черновик' }}
        </span>
        <span>Создано: {{ new Date(note.created_at).toLocaleString() }}</span>
        <span v-if="note.updated_at !== note.created_at">
          Обновлено: {{ new Date(note.updated_at).toLocaleString() }}
        </span>
      </div>

      <!-- Содержимое -->
      <div class="prose max-w-none">
        <div class="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {{ note.content }}
        </div>
      </div>

      <!-- Кнопка назад -->
      <div class="mt-12 pt-6 border-t">
        <router-link 
          to="/notes" 
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          ← Назад к списку
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notesAPI } from '@/services/notes'

const route = useRoute()
const router = useRouter()

const note = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchNote = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await notesAPI.getById(route.params.id)
    note.value = response.data
  } catch (err) {
    error.value = 'Не удалось загрузить заметку'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteNote = async () => {
  if (!confirm('Вы уверены что хотите удалить эту заметку?')) return
  
  try {
    await notesAPI.delete(route.params.id)
    router.push('/notes')
  } catch (err) {
    alert('Ошибка при удалении заметки')
    console.error(err)
  }
}

onMounted(() => {
  fetchNote()
})
</script>