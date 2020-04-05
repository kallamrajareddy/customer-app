import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        master: {},
        selectedCompany: ''
    },
    plugins: [createPersistedState()],
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = '';
            state.token = '';
            state.user = {};
            state.master = {};
            state.selectedCompany = '';
        },
        masterData(state, master) {
            state.master = master;
        },
        userData(state, user) {
            state.user = user;
        },
        userComp(state, compSelected) {
            state.selectedCompany = compSelected;
        }
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
                        let token = resp.data.access_token;
                        token = 'Bearer ' + token;
                        localStorage.setItem('token', token)
                            // Add the following line:
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token)
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
        },
        userData({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/security/users/user-details')
                    .then(resp => {
                        commit('userData', resp.data);
                        resolve();
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        userComp({ commit }, paylod) {
            commit("userComp", paylod);
        },
        master({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/middleware/api/secured/get-masterdata')
                    .then(resp => {
                        commit('masterData', resp.data);
                        resolve(resp.data.company);
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        compStatus: state => !!state.selectedCompany,
        isAdmin: state => {
            if (state.user.roles.some(e => e === 'ROLE_SUPER') || state.user.roles.some(e => e === 'ROLE_ADMIN')) {
                return true;
            }
            return false;
        }
    }
})