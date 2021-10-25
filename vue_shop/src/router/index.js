import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Cate from '../components/goods/Cate'
import Params from '../components/goods/Params'
import List from '../components/goods/List'
import Add from '../components/goods/Add'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Home',
      component: Home,
      redirect: '/Welcome',
      children: [{
        path: '/Welcome',
        component: Welcome
      }, {
        path: '/users',
        component: Users
      },{
        path: '/rights',
        component: Rights
      },{
        path: '/roles',
        component: Roles
      },{
        path: '/categories',
        component: Cate
      },{
        path: '/params',
        component: Params
      },{
        path: '/goods',
        component: List
      },{
        path: '/goods/add',
        component: Add
      }]
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  //  next() 放行 next('/Login') 强制跳转
  if (to.path === '/Login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/Login');
  next();
})

export default router
