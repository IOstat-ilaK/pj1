import api from './api'

export const notesAPI = {
  // Получить все заметки
  getAll() {
    return api.get('/notes/')
  },
  
  // Получить одну заметку
  getById(id) {
    return api.get(`/notes/${id}/`)
  },
  
  // Создать заметку
  create(data) {
    return api.post('/notes/', data)
  },
  
  // Обновить заметку
  update(id, data) {
    return api.put(`/notes/${id}/`, data)
  },
  
  // Удалить заметку
  delete(id) {
    return api.delete(`/notes/${id}/`)
  }
}