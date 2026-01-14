<template>
  <div class="notes">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Все заметки</h1>
      <router-link 
        to="/create" 
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Создать заметку
      </router-link>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-gray-600">Загружаем заметки...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded p-4">
      <p class="text-red-600">{{ error }}</p>
      <button @click="fetchNotes" class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Попробовать снова
      </button>
    </div>

    <!-- Список заметок -->
    <div v-else-if="notes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="note in notes" 
        :key="note.id" 
        class="card-slavic p-6 mb-6"
      >
        <h3 class="text-xl font-semibold mb-2">{{ note.title }}</h3>
        <p class="text-gray-600 mb-4 line-clamp-3">
          {{ note.content.substring(0, 150) }}...
        </p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">
            {{ new Date(note.created_at).toLocaleDateString() }}
          </span>
          <div class="space-x-2">
            <router-link 
              :to="`/notes/${note.id}`"
              class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              Читать
            </router-link>
            <router-link 
              :to="`/edit/${note.id}`"
              class="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
            >
              Редактировать
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Нет заметок -->
    <div v-else class="text-center py-12 bg-white rounded-lg shadow">
      <div class="text-5xl mb-4">📝</div>
      <h3 class="text-xl font-semibold mb-2">Нет заметок</h3>
      <p class="text-gray-600 mb-4">Создайте свою первую заметку!</p>
      <router-link 
        to="/create" 
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Создать заметку
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { notesAPI } from '@/services/notes'

const notes = ref([])
const loading = ref(true)
const error = ref(null)

const fetchNotes = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await notesAPI.getAll()
    notes.value = response.data
  } catch (err) {
    error.value = 'Не удалось загрузить заметки. Проверьте подключение к серверу.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNotes()
})
</script>