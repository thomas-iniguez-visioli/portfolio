import { createRouter,createWebHistory} from 'vue-router'


const gen=(p,type)=>{
  console.log(type+"/"+p+".txt")
return type+"/"+p+".txt"
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('../views/HomeView.vue')
    }, {
      path: '/situation',
      name: 'situation',
      component:() => import('../views/situation.vue')
    },{
      path: '/suivi',
      name: 'veille',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/suiviView.vue')
    },
    {
      path: '/cv',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, {
      path: '/static/projet',
      name: 'static-projet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("projet",'static')}}
    },{
      path: '/static/situation',
      name: 'static-situation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("situation",'static')}}
    },
    {
      path: '/static',
      name: 'static',
      component: () => import('../components/static.vue'),
      props:()=>{return {name:gen("static",'static')}}
    }
  ]
})

export default router
