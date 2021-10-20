import axios from 'axios';
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state: {
        genres: [],
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
            console.log(state.genres['movies']);
        }
    },

    actions: {
        
        // Get All genres
        genres({state,commit})
        {
            axios.get('/genre').then((res) => {
                commit('genre',res.data);
            })
        }
    }
});
export default store;