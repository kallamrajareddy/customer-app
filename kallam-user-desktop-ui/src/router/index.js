import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/components/auth/Login'
import Options from '@/components/Options'
import Account from '@/components/account/Account'
import CreateAccount from '@/components/account/CreateAccount'
import UpdateAccount from '@/components/account/UpdateAccount'
import Booking from '@/components/bookings/Booking'
import BookingsView from '@/components/bookings/BookingsView'
import CreateBooking from '@/components/bookings/CreateBooking'
import ViewModifyBooking from '@/components/bookings/ViewModifyBooking'
import Recipts from '@/components/recipts/Recipts'
import NewRecipt from '@/components/recipts/NewRecipt'
import DeleteRecipt from '@/components/recipts/DeleteRecipt'
import store from '@/store/store'
// import axios from 'axios'

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
        path: '/updateAccount/',
        name: 'UpdateAccount',
        component: UpdateAccount,
        props: true,
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
        path: '/bookings-view',
        name: 'BookingsView',
        component: BookingsView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/create-booking',
        name: 'CreateBooking',
        component: CreateBooking,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/view-modify-booking',
        name: 'ViewModifyBooking',
        component: ViewModifyBooking,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/recipts',
        name: 'Recipts',
        component: Recipts,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/new-recipt',
        name: 'NewRecipt',
        component: NewRecipt,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/delete-recipt',
        name: 'DeleteRecipt',
        component: DeleteRecipt,
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


// axios.interceptors.response.use(
//     (response) => {
//         if (response.data.error != undefined && response.data.error != '') {
//             store.dispatch('logout').then(() => {
//                 router.push({ name: 'Home' })
//             }).catch(() => {
//                 router.push({ name: 'Home' })
//             })

//         }
//         return response
//     },
//     (error) => {
//         const originalRequest = error.config
//             // token expired
//         if (error.response.status === 401 && error.response.data.error == "token_expired") {
//             originalRequest._retry = true
//             store.dispatch('refreshToken').then((response) => {
//                 // console.log(response)
//                 let token = response.data.token
//                 let headerAuth = 'Bearer ' + response.data.token
//                 store.dispatch('saveToken', token)
//                 axios.defaults.headers['Authorization'] = headerAuth
//                 originalRequest.headers['Authorization'] = headerAuth
//                 return axios(originalRequest)
//             }).catch(() => {
//                 store.dispatch('logout').then(() => {
//                     router.push({ name: 'login' })
//                 }).catch(() => {
//                     router.push({ name: 'login' })
//                 })
//             })
//         }
//         return Promise.reject(error)
//     }
// )


export default router