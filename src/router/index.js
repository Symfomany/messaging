import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Favorites from '@/components/Favorites'
import Detail from '@/components/Detail'
import Twitter from '@/components/Twitter'
import Comments from '@/components/Comments'
import Comment from '@/components/Comment'

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
      path: '/twitter',
      name: 'Twitter',
      component: Twitter
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: Comment
    }
  ]
})
