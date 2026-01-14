<template>
  <div class="edit-note max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Редактировать заметку</h1>

    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-gray-600">Загружаем заметку...</p>
    </div>

    <!-- Форма редактирования -->
    <form v-else @submit.prevent="updateNote" class="bg-white rounded-lg shadow p-6">
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
          :disabled="saving"
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <span v-if="saving">Сохранение...</span>
          <span v-else>Сохранить изменения</span>
        </button>
        <router-link 
          :to="`/notes/${id}`"
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
        >
          Отмена
        </router-link>
        <button
          type="button"
          @click="deleteNote"
          class="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Удалить
        </button>
      </div>

      <!-- Сообщения -->
      <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-600 rounded">
        {{ error }}
      </div>
      <div v-if="success" class="mt-4 p-3 bg-green-50 text-green-600 rounded">
        Заметка успешно обновлена!
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notesAPI } from '@/services/notes'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = reactive({
  title: '',
  content: '',
  status: 'draft'
})

const loading = ref(true)
const saving = ref(false)
const error = ref(null)
const success = ref(false)

// Загружаем заметку для редактирования
const fetchNote = async () => {
  try {
    loading.value = true
    const response = await notesAPI.getById(id)
    
    // Заполняем форму данными заметки
    form.title = response.data.title
    form.content = response.data.content
    form.status = response.data.status
    
  } catch (err) {
    error.value = 'Не удалось загрузить заметку для редактирования'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Сохраняем изменения
const updateNote = async () => {
  try {
    saving.value = true
    error.value = null
    success.value = false
    
    await notesAPI.update(id, form)
    success.value = true
    
    // Через 2 секунды переходим к заметке
    setTimeout(() => {
      router.push(`/notes/${id}`)
    }, 2000)
    
  } catch (err) {
    error.value = 'Ошибка при сохранении заметки'
    console.error(err)
  } finally {
    saving.value = false
  }
}

// Удаляем заметку
const deleteNote = async () => {
  if (!confirm('Вы уверены что хотите удалить эту заметку?')) return
  
  try {
    await notesAPI.delete(id)
    router.push('/notes')
  } catch (err) {
    error.value = 'Ошибка при удалении заметки'
    console.error(err)
  }
}

onMounted(() => {
  fetchNote()
})
</script>