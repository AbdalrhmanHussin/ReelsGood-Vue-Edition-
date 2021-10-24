import axios from 'axios';
import { reject } from 'lodash';
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state: {
        genres: [],
        shows: []
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
        
        /**
         * 
         * @param {*} param0 
         */
        genres({state,commit})
        {
            axios.get('genre').then((res) => {
                commit('genre',res.data);
            })
        },

        /***
         * @param {payload.type payload.sort payload.page}
         * @return { promise } 
         */

        getShows({state,commit},payload)
        {
            return new Promise((resolve,reject) => {                
                axios.post(`show/${payload.type}/${payload.page}/${payload.sort}`).then((res) => {
                    resolve(res.data)
                })
            }).catch((err) => {
                 throw err;
            })
        }
    }
});
export default store;