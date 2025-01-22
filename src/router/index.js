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
      path: '/projet/RGPD',
      name: 'projet-RGPD',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("RGPD",'projet')}}
    },{
      path: '/projet/francenuit',
      name: 'projet-france-nuit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("france-nuit",'projet')}}
    },{
      path: '/projet/uptime',
      name: 'projet-uptime',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("uptime",'projet')}}
    },{
      path: '/projet/youtube',
      name: 'projet-youtube',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("youtube",'projet')}}
    },
{
      path: '/situation/tp',
      name: 'situation-tp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("tp",'situation')}}
    },{
      path: '/situation/tp1',
      name: 'situation-tp1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/projectView.vue'),
      props:()=>{return {name:gen("tp1",'situation')}}
    },
    {
      path: '/lettre_de_motivation',
      name: 'lettre_de_motivation',
      component: () => import('../components/lettre_de_motivation.vue'),
      props:()=>{return {name:gen("lettre_de_motivation",'lettre_de_motivation')}}
    },
{
      path: '/projet',
      name: 'projet',
      component: () => import('../components/projet.vue'),
      props:()=>{return {name:gen("projet",'projet')}}
    },
{
      path: '/situation',
      name: 'situation',
      component: () => import('../components/situation.vue'),
      props:()=>{return {name:gen("situation",'situation')}}
    }
  ]
})

export default router
