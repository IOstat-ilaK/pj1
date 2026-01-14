<template>
  <div id="app" class="min-h-screen bg-slavic-cream">
    <!-- Шапка в славянском стиле -->
    <header class="nav-slavic slavic-border-bottom">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <!-- Лого -->
          <router-link 
            to="/" 
            class="text-3xl font-bold text-slavic-red flex items-center space-x-3"
          >
            <span class="text-4xl">🌾</span>
            <span>Мои Письмена</span>
            <span class="text-4xl">🏺</span>
          </router-link>
          
          <!-- Навигация -->
          <nav class="flex space-x-2">
            <router-link 
              to="/" 
              class="nav-link-slavic"
              active-class="active"
            >
              🏠 Главная
            </router-link>
            <router-link 
              to="/notes" 
              class="nav-link-slavic"
              active-class="active"
            >
              📜 Заметки
            </router-link>
            <router-link 
              to="/create" 
              class="nav-link-slavic"
              active-class="active"
            >
              ✍️ Создать
            </router-link>
            <router-link 
              to="/about" 
              class="nav-link-slavic"
              active-class="active"
            >
              ℹ️ О нас
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Орнаментный разделитель -->
    <div class="divider-slavic"></div>

    <!-- Основной контент -->
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Подвал -->
    <footer class="bg-slavic-earth text-slavic-wheat py-6 mt-8">
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-center space-x-6 mb-4">
          <span>🌾</span>
          <span>🏺</span>
          <span>🕊️</span>
          <span>🌻</span>
          <span>🏺</span>
          <span>🌾</span>
        </div>
        <p class="text-lg">&copy; 2026 Мои Письмена</p>
        <p class="text-sm opacity-80 mt-2">Создано с душой и традициями</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Пустой скрипт
</script>