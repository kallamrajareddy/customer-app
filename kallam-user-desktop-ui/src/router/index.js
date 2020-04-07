import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/components/auth/Login'
import Options from '@/components/Options'
import Account from '@/components/account/Account'
import CreateAccount from '@/components/account/CreateAccount'
import UpdateAccount from '@/components/account/UpdateAccount'
import Booking from '@/components/bookings/Booking'
import store from '@/store/store'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/createAccount',
        name: 'CreateAccount',
        component: CreateAccount,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/updateAccount/:brokerNo',
        name: 'UpdateAccount',
        component: UpdateAccount,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/options',
        name: 'Options Master',
        component: Options,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bookings',
        name: 'Bookings',
        component: Booking,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            requiresAuth: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})


export default router