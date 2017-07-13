import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Favorites from '@/components/Favorites'
import Detail from '@/components/Detail'
import Stats from '@/components/Stats'
import Comments from '@/components/Comments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    }
  ]
})
