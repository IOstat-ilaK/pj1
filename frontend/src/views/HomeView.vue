<template>
  <div class="home">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Добро пожаловать в приложение заметок
      </h1>
      <p class="text-gray-600 text-lg">
        Создавайте, редактируйте и управляйте вашими заметками
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Карточка 1 -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-blue-500 text-3xl mb-4">📝</div>
        <h3 class="text-xl font-semibold mb-2">Создавайте заметки</h3>
        <p class="text-gray-600">
          Записывайте свои мысли, идеи и важную информацию
        </p>
      </div>

      <!-- Карточка 2 -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-green-500 text-3xl mb-4">🔐</div>
        <h3 class="text-xl font-semibold mb-2">Безопасность</h3>
        <p class="text-gray-600">
          Ваши данные защищены и доступны только вам
        </p>
      </div>

      <!-- Карточка 3 -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-purple-500 text-3xl mb-4">📱</div>
        <h3 class="text-xl font-semibold mb-2">Доступ везде</h3>
        <p class="text-gray-600">
          Доступ к заметкам с любого устройства
        </p>
      </div>
    </div>

    <div class="mt-12 text-center">
      <router-link 
        to="/notes" 
        class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Посмотреть все заметки
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Пустой скрипт для главной страницы
</script>