import axios from 'axios';
import { reject } from 'lodash';
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state: {
        genres: [],
        shows: [],
        load: false
    },

    getters: {
        genre(state) {
            return state.genres;
        }
    },

    mutations: {
        genre(state,payload) 
        {
            state.genres = payload;
        }
    },

    actions: {

        genres({state,commit})
        {
            axios.post('/genre').then((res) => {
                commit('genre',res.data);
            })
        },

        /***
         * @param {payload.type payload.sort payload.page}
         * @return { promise } 
         */

        getShows({},payload)
        {
            console.log(payload);
            return new Promise((resolve,reject) => {                
                axios.post(`/show/${payload.type}/${payload.page}/${payload.sort}`).then((res) => {
                    resolve(res.data)
                })
            }).catch((err) => {
                 throw err;
            })
        },

        /**
         * @param {payload.type,payload.id}
         * @return {promise}
         */

        getShow({},payload)
        {
            return new Promise((resolve,reject)=>{
                axios.post(`/show/find/${payload.type}/${payload.id}`,{provider: ['credits','videos','watch/providers','similar']}).then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((err) => {
                throw err
            })
        },

        getShowsCat({},payload)
        {
            return new Promise((resolve,reject) => {
                axios.post(`/show/category/${payload.id}`).then((res) => {
                    resolve(res.data)
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((err) => {
                console.error(error);
            })
        }
    }
});
export default store;