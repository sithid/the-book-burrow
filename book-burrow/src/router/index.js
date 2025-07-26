import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import BookDetailsView from '../views/BookDetailsView.vue'
import BookshelfView from '../views/BookshelfView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/details',
      name: 'details',
      component: BookDetailsView,
    },
    {
      path: '/bookshelfs',
      name: 'bookshelfs',
      component: BookshelfView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    }
  ],
})

export default router
