import { createRouter, createWebHashHistory,createMemoryHistory,createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const gen=(p)=>{
return ""+p.params.name+".txt"
}
const router = createRouter({
  history: createWebHistory("https://thomas-iniguez-visioli.github.io/portfolio"),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, {
      path: '/project/:name',
      name: 'temp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:(params)=>{return {name:gen(params)}}
    }
  ]
})

export default router
