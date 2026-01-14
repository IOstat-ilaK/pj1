<template>
  <div class="create-note max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Создать заметку</h1>

    <form @submit.prevent="createNote" class="bg-white rounded-lg shadow p-6">
      <!-- Заголовок -->
      <div class="mb-6">
        <label for="title" class="block text-gray-700 font-medium mb-2">
          Заголовок
        </label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите заголовок"
        >
      </div>

      <!-- Содержание -->
      <div class="mb-6">
        <label for="content" class="block text-gray-700 font-medium mb-2">
          Содержание
        </label>
        <textarea
          v-model="form.content"
          id="content"
          rows="8"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите текст заметки..."
        ></textarea>
      </div>

      <!-- Статус -->
      <div class="mb-8">
        <label class="block text-gray-700 font-medium mb-2">Статус</label>
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input 
              v-model="form.status" 
              type="radio" 
              value="draft" 
              class="mr-2"
            >
            <span>Черновик</span>
          </label>
          <label class="flex items-center">
            <input 
              v-model="form.status" 
              type="radio" 
              value="published" 
              class="mr-2"
            >
            <span>Опубликовано</span>
          </label>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex space-x-4">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <span v-if="loading">Создание...</span>
          <span v-else>Создать заметку</span>
        </button>
        <router-link 
          to="/notes" 
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          Отмена
        </router-link>
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-600 rounded">
        {{ error }}
      </div>

      <!-- Сообщение об успехе -->
      <div v-if="success" class="mt-4 p-3 bg-green-50 text-green-600 rounded">
        Заметка успешно создана! Перенаправляем...
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { notesAPI } from '@/services/notes'

const router = useRouter()

const form = reactive({
  title: '',
  content: '',
  status: 'draft'
})

const loading = ref(false)
const error = ref(null)
const success = ref(false)

const createNote = async () => {
  try {
    loading.value = true
    error.value = null
    success.value = false
    
    await notesAPI.create(form)
    success.value = true
    
    // Через 2 секунды перенаправляем на список заметок
    setTimeout(() => {
      router.push('/notes')
    }, 2000)
    
  } catch (err) {
    error.value = 'Ошибка при создании заметки. Проверьте данные.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>