import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { userInfo } from '@/service/api'
import Store from '@/store'

import Home from '@/views/home/Home.vue'

import Login from '@/views/user-login/index.vue'
import Detail from '@/views/detail/detail.vue'
import Create from '@/views/create/create.vue'
import Edit from '@/views/user-space/edit.vue'

const Recipe = () => import('@/views/recipe/recipe.vue');
const Space = () => import(/* webpackChunkName: "space" */ '@/views/user-space/space.vue');
const MenuList = () => import(/* webpackChunkName: "space" */ '@/views/user-space/menu-list.vue');
const Fans = () => import(/* webpackChunkName: "space" */ '@/views/user-space/fans.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    title: '首页',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      login: true
    }
  },
  {
    path: '/recipe',
    name: 'recipe',
    title: '菜谱大全',
    component: Recipe
  },
  {
    path: '/detail',
    name: 'detail',
    title: '菜谱详情',
    component: Detail
  },
  {
    path: '/space',
    name: 'space',
    title: '个人空间',
    component: Space,
    meta: {
      login: true
    },
    redirect: {
      name: 'works'
    },
    children: [
      {
        path: '/works',
        name: 'works',
        title: '作品',
        component: MenuList,
        meta: {
          login: true
        }
      },
      {
        path: 'fans',
        name: 'fans',
        title: '我的粉丝',
        component: Fans,
        meta: {
          login: true
        }
      },
      {
        path: 'following',
        name: 'following',
        title: '我的关注',
        component: Fans,
        meta: {
          login: true
        }
      },
      {
        path: 'collection',
        name: 'collection',
        title: '收藏',
        component: MenuList,
        meta: {
          login: true
        }
      }
    ]
  },
  {
    path: '/create',
    name: 'create',
    title: '发布菜谱',
    component: Create,
    meta: {
      login: true
    }
  },
  {
    path: '/edit',
    name: 'edit',
    title: '编辑个人资料',
    component: Edit,
    meta: {
      login: true
    }
  },
  {
    path: '*',
    name: 'noFound',
    title: '未找到',
    redirect: {
      name: 'home'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const isLogin = !!token;//判断登录状态
  /**
   * 1.进入路由时，都要向后端发送token，验证是否合法
   * 2.不管路由需不需要登录，都需要展示用户信息
   */
  const data = await userInfo();
  Store.commit('changeUserInfo',data.data)
  // console.log(data);
  // console.log(to);
  if (to.matched.some(item => item.meta.login)) {//访问的路由需要登录
    if (isLogin) {//有登录状态
      if (data.error === 400) {//后端验证登录有错
        next({ name: 'login' });
        localStorage.removeItem('token');
        return;
      }
      if (to.name === 'login') {//进入login，跳转到home
        next({name:'home'})
      } else {//进入的不是login，直接next
        next();
      }
      return;
    }
    if (!isLogin && to.name === 'login') {//没登录，进入login，直接next
      next();
    }
    if (!isLogin && to.name !== 'login') {//没登录，进入的不是login，跳转到login
      next({name:'login'})
    }
  } else {//访问的路由不需要登录
    next();
  }
})

export default router;
