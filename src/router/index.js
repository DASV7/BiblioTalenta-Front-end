import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({ routes })

export default router
