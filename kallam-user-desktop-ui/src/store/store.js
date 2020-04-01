import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    plugins: [createPersistedState()],
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, userDetaisl) {
            state.status = 'success'
            state.token = userDetaisl.token
            state.user = userDetaisl.user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                    //axios.defaults.headers.post['Content-Type'] = 'application/json';
                    //axios({ url: '/oauth/token', data: user, method: 'POST' })
                axios.post('/desktop/oauth/token', user
                        // {
                        //         withCredentials: true,
                        //         //crossdomain: true,
                        //         headers: {
                        //             "Accept": "application/json",
                        //             "Content-Type": "application/x-www-form-urlencoded"
                        //         }
                        //     }, 
                        // {
                        //     auth: {
                        //         username: 'kallam-client',
                        //         password: 'secret'
                        //     }
                        // }
                    )
                    .then(resp => {
                        const token = resp.data.body.details.tokenValue
                        const user = resp.data.body.userAuthentication.principal;
                        const userdetsils = {
                            token,
                            user
                        }
                        localStorage.setItem('token', token)
                            // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', userdetsils)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://localhost:8182/security/register', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                            // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})