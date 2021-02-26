import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
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
    path: '/OrderDetail',
    name: 'OrderDetail',
    component: () => import('../views/OrderDetail.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
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