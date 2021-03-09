import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/Index',
    component: Home,
    children: [
      {
        path: '/Index',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/ChargeMonitoring',
        name: 'ChargeMonitoring',
        component: () => import('../views/chargeMonitoring.vue')
      },
      {
        path: '/Order',
        name: 'Order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/Message',
        name: 'Message',
        component: () => import('../views/Message.vue')
      },
      {
        path: '/RealtimeReport',
        name: 'RealtimeReport',
        component: () => import('../views/RealtimeReport.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') {
    next();
  } else {
    let token = Cookies.get('token');
    if(token === 'null' || token === '' || token === undefined) {
      next('/login');
    } else {
      next();
    }
  }
})

export default router