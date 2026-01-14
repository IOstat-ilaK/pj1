import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1/', // Будет проксироваться через Vite
  headers: {
    'Content-Type': 'application/json'
  }
})

// Обработчик ошибок
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        'Ошибка сети'
    console.error('API Error:', errorMessage)
    return Promise.reject(error)
  }
)

export default api