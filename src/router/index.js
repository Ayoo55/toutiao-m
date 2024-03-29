import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path:'/login',
    name:'login',
    component: ()=> import('@/views/login')
  },
  {
    path:'/',
    // name:'layout',
    // 当路径为 / 时，显示layout组件
    component:()=>import('@/views/layout'),
    children:[
      {
        path:'', //默认子路由
        name:'home',
        component: ()=> import('@/views/home')
      },
      {
        path:'/qa', 
        name:'qa',
        component: ()=> import('@/views/qa')
      },{
        path:'/video', 
        name:'video',
        component: ()=> import('@/views/video')
      },{
        path:'/my',
        name:'my',
        component: ()=> import('@/views/my')
      },
    ]
  },
  // 搜索路由
  {
    path:'/search',
    name:'search',
    component: ()=> import('@/views/search')
  },
  // 文章内容路由
  {
    path:'/article/:articleId',
    name:'article',
    component: ()=> import('@/views/article'),
    props : true
  },
  // 用户个人资料
  {
    path:'/user/profile',
    name:'user-profile',
    component: ()=> import('@/views/user-profile'),
  },
 
]

const router = new VueRouter({
  routes
})

export default router
