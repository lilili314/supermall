import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const ShopCart = () => import('../views/shopcart/ShopCart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')

Vue.use(Router)
// 1.安装插件
// createApp.use(createRouter)

// 解决vue-router在3.0版本以上重复点击菜单报错的问题
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router

