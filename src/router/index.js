import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/login.vue'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("jwt")) {
    next("/login");
    return;
  }

  next();
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/home',
    name: 'home ',
    beforeEnter: ifNotAuthenticated,
    component: () => import('../views/homeView.vue')
  },
  {
    path: '/detail',
    name: 'home ',
    beforeEnter: ifNotAuthenticated,
    component: () => import('../views/historyBooks.vue')
  }
]

const router = new VueRouter({ routes })

export default router
