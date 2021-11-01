import axios from 'axios';
import { reject } from 'lodash';
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state: {
        genres: [],
        shows: [],
        load: false,
        dropDown: false
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
                axios.post(`/show/find/${payload.type}/${payload.id}`,{provider: ['credits','videos','watch/providers','recommendations']}).then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((err) => {
                throw err
            })
        },

         /**
         * @param {payload.id}
         * @return {promise}
         */

        getShowsCat({},payload)
        {
            console.log(payload);

            return new Promise((resolve,reject) => {
                axios.post(`/show/category/${payload.type}/1/${payload.id}`).then((res) => {
                    console.log(res);
                    resolve(res.data)
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((err) => {
                console.error(err);
            })
        },

         /**
         * @param {payload.id}
         * @return {promise}
         */
        person({},payload)
        {
            return new Promise((resolve,reject) => {
                axios.post(`/show/person/${payload.id}`).then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((err) => {
                console.error(err);
            })
        },

          /**
         * @param {payload.id}
         * @return {promise}
         */
        getLoadCategory({},payload)
        {
            console.log('asd');
            return new Promise((resolve,reject)=> {
                let url = (payload.id > 0) ? `/show/category/${payload.type}/${payload.page}/${payload.id}` : `/show/category/${payload.type}/${payload.page}`;
                axios.post(`${url}`,{next:true}).then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error(error);
                })
            }).catch((error) => {
                console.error(error)
            })
        },

        searchGet({},payload)
        {
           return new Promise((resolve,reject) => {
                axios.get(`/show/search/multi/${payload.searchKey}/`).then((res) => {
                    resolve(res.data)
                }).catch((error) => {
                    console.error(error);
                })
           })
        }

    }
});
export default store;