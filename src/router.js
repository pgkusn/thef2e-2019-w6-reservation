import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/room/:id',
            name: 'room',
            component: () => import('./views/Room.vue')
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
});

// 清空預約時段
router.afterEach((to, from) => {
    if (to.name === 'room') {
        store.commit('setReserveDate', []);
    }
    else {
        store.commit('setRoom', null);
        store.commit('setBookingData', null);
    }
});

export default router;