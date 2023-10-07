import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'
import AdminEbook from '../views/admin/admin-ebook.vue'
import store from "@/store";
import {Tool} from "../../util/tool";



// @ts-ignore
// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/about.vue')
  },
  {
    path: '/doc',
    name: 'Doc',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/doc.vue')
  },
  {
    path: '/admin/ebook',
    name: 'AdminEbook',
    component: () => import('../views/admin/admin-ebook.vue'),
    meta:{
      loginRequire : true
    }
  },
  {
    path: '/admin/category',
    name: 'AdminCategory',
    component: () => import('../views/admin/admin-category.vue'),
    meta:{
      loginRequire : true
    }
  },
  {
    path: '/admin/doc',
    name: 'AdminDoc',
    component: () => import('../views/admin/admin-doc.vue'),
    meta:{
      loginRequire : true
    }
  },
  {
    path: '/admin/user',
    name: 'AdminUser',
    component: () => import('../views/admin/admin-user.vue'),
    meta:{
      loginRequire : true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//这是一个模板
// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    console.log(item, "是否需要登录校验：", item.meta.loginRequire);
    return item.meta.loginRequire
  })) {
    const loginUser = store.state.user;
    if (Tool.isEmpty(loginUser)) {
      console.log("用户未登录！");
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
