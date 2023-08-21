import store from '@/store/index'
import {
  createRouter, createWebHashHistory 
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
  path: '/',
  name: 'HomeView',
  component: HomeView,
},
{
  path: '/member',
  name: 'Member',
  redirect: '/member/reserve',
  meta: { requireMemberAuth: true },
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/MemberView.vue'),
  children: [{
    path: 'reserve',
    name: 'Member-Reserve',
    component: () =>
      import ('../components/member/Member-Reserve.vue'),
  },
  {
    path: 'information',
    name: 'Member-Information',
    component: () =>
      import ('../components/member/Member-Information.vue'),
  },
  {
    path: 'edit',
    name: 'Member-Password',
    component: () =>
      import ('../components/member/Member-Password.vue'),
  },
  ],
},
{
  path: '/admin',
  name: 'Admin',
  redirect: '/admin/reserve',
  meta: { requireAdminAuth: true },
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/AdminView.vue'),
  children: [{
    path: 'reserve',
    name: 'Admin-Reserve',
    component: () =>
      import ('../components/admin/Admin-Reserve.vue'),
  }, {
    path: 'memberList',
    name: 'Admin-MemberList',
    component: () =>
      import ('../components/admin/Admin-MemberList.vue'),
  } ],
}, {
  path: '/reserve',
  name: 'ReserveView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/ReserveView.vue'),
}, {
  path: '/point',
  name: 'Point',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/PointView.vue'),
}, {
  path: '/news',
  name: 'News',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/NewsView.vue'),
}, {
  path: '/new/:id',
  name: 'New',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/NewView.vue'),
}, {
  path: '/menu',
  name: 'Menu',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import ( /* webpackChunkName: "about" */ '../views/MenuView.vue'),
},
{
  path: '/:catchAll(.*)',
  redirect: '/',
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if ((to.meta.requireMemberAuth && !store.state.isLoginSuccess) ||
        (to.meta.requireAdminAuth && !store.state.isAdiminsLogin)) {
    store.commit('SetIsShowLogin', true)
    $(document).bind('scroll', function() { $(document).scrollTop($(document).scrollTop()) })

    if (from.name === undefined) {
      next('/')
      return
    }
    next(from.path)
    return
  }
  if (to.meta.requireMemberAuth || to.meta.requireAdminAuth) {
    next()
    return
  }

  // 換頁動畫
  store.dispatch('updateIsChangePageAnim', true)
  if (store.state.isFirstEnterWeb && to.name === 'HomeView') {
    next()
    return
  }
  store.dispatch('updateIsFirstEnterWeb', false)
  const timeout = setTimeout(() => {
    next()
    clearTimeout(timeout)
  }, 600)
})

export default router