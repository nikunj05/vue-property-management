import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthMiddleware from '../middleware/auth'

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
    component: () => import('../components/layout/TheBasicLayout.vue'),
    meta: {
      middlware: [AuthMiddleware],
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: 'properties',
        name: 'property',
        component: () => import('../views/properties/Index.vue'),
      },
      {
        path: 'properties/create',
        name: 'property',
        component: () => import('../views/properties/Create.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
