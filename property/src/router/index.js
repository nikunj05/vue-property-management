import Vue from 'vue'
import VueRouter from 'vue-router'
// import auth from '../middleware/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/',
    name: 'properties',
    component: () => import('../views/all-properties/AllProperties.vue'),
  },
  {
    path: '/properties',
    name: 'all-property',
    component: () => import('../views/all-properties/Properties.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/layout/TheBasicLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'properties',
        name: 'property',
        component: () => import('../views/properties/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'properties/create',
        name: 'property',
        component: () => import('../views/properties/Create.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // See if any of the matched routes has meta "requiresAuth"
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // Yes this route requires authentication. See if the user is authenticated.
    const token = localStorage.getItem('token')
    if (token) {
      // User is authenticated, we allow access.
      next()
    } else {
      // User is not authenticated. We can redirect her to
      // our login page. Or wherever we want.
      next('/login')
    }
  } else {
    next()
  }
})

export default router
