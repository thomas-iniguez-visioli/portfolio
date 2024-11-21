import { createRouter,createWebHistory} from 'vue-router'


const gen=(p,type)=>{
  console.log()
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
    },
    {
      path: '/cv',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, {
      path: '/projet/francenuit',
      name: 'projet-france-nuit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:(params)=>{return {name:gen("france-nuit",'projet')}}
    },{
      path: '/projet/RGPD',
      name: 'projet-RGPD',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:(params)=>{return {name:gen("RGPD",'projet')}}
    },
{
      path: '/situation/1',
      name: 'situation-1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:(params)=>{return {name:gen("1",'situation')}}
    }
  ]
})

export default router
