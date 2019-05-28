import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/Index.vue'
import Film from '../views/index/Film.vue'
import Cinema from '../views/index/Cinema.vue'
import Sale from '../views/index/Sale.vue'
import Center from '../views/index/Center.vue'
import City from '../views/city/City.vue'
import Detail from '../views/detail/index.vue'
import Home from '../views/index/Home.vue'
import Search from '../views/search/search.vue'
import Movie from '../views/detail/movie.vue'
import Cat from '../views/index/Cat.vue'
import List from '../views/index/List.vue'
import Map from '../views/city/map.vue'

Vue.use(VueRouter)
window.isto = true
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        { path: 'list', name: 'lists', component: List, meta: { tabNumber: 0 } },
        { path: 'film/:filmType', name: 'films', component: Film, meta: { tabNumber: 0 } },
        {
          path: 'cinema', name: 'cinemas', component: Cinema, meta: { tabNumber: 1 }
          // children: [
          //   { path: '/search', name: 'rearch', component: Rearch }
          // ]
        },
        { path: 'sale/:brandId', name: 'sales', component: Sale, meta: { tabNumber: 2 } },
        { path: 'center', name: 'centers', component: Center, meta: { tabNumber: 3 } },
        {
          path: 'home',
          name: 'homes',
          component: Home,
          meta:
            { tabNumber: 4 }
        },
        { path: '', redirect: '/film/nowPlaying' }
      ]
    },
    { path: '/city', name: 'centers', component: City,
      beforeEnter: (to, from, next) => {
        if (isto) {
          next('/map')
      }else{
        next()
      }
    } },
    { path: '/map', name: 'maps', component: Map },
    { path: '/films/:filmId', name: 'filmDetail', component: Detail },
    // { path: '/detail/:id', name: 'detail', component: () => import('../views/detail/Index.vue') },
    { path: '/cinema/search', name: 'search', component: Search },
    { path: '/cinema/:cityId/film', name: 'Movies', component: Movie },
    { path: '/cat', name: 'Cats', component: Cat, meta: { tabNumber: 0 } },
    { path: 'detail/:id', name: 'detail', component: () => import('../views/detail/food.vue') },
    { path: '*', redirect: '/film/nowPlaying' }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
})
