import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/views/NotesView.vue')
  },
  {
    path: '/notes/:id',
    name: 'NoteDetail',
    component: () => import('@/views/NoteDetailView.vue')
  },
  {
    path: '/create',
    name: 'CreateNote',
    component: () => import('@/views/CreateNoteView.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditNote',
    component: () => import('@/views/EditNoteView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router