import Vue from 'vue';
import VueRouter from 'vue-router';

import Signup from '../views/Signup.vue';
import Login from '../views/Login';
import Accueil from '../views/Accueil';

import Wall from '../views/Wall';
import User from '../views/User';

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      guest: true,
      title: 'Signup',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
      title: 'Login',
    },
  },
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
    meta: {
      guest: true,
      title: 'Groupomania',
    },
  },

  {
    path: '/profile',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true,
      title: 'Profile',
    },
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall,
    meta: {
      requiresAuth: true,
      title: 'Wall',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/// Title

//Controller les pages affichier par les utilisateurs
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next();
    } else {
      next({ name: 'Wall', params: { nextUrl: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
