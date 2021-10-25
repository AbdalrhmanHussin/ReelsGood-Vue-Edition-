<template>
    <div class="sw-box-md position-relative w-100 p-2">
        <div class="sw-card-container position-relative w-100">
            <img :src="'http://image.tmdb.org/t/p/w500/'+show.poster_path" alt="show-img" class="w-100 h-100">

            <!-- Box information -->
            <div class="position-absolute top-0 w-100 h-100 top-0 p-2 d-flex justify-content-between align-items-start sw-box-layer">
                <router-link :to="{name:'show', params: {id:show.id,type:type}}" class="w-100 h-100 position-absolute top-0 left-0 zIndex2 dir-link">
                    <div class="position-absolute h-100 d-flex justify-content-end flex-column p-2 fs-12 color-wh">
                        <p class="fs-12 fw-600 mb-0" v-if="show['title']">{{ show['title'] }}</p>
                        <p class="fs-12 fw-600 mb-0" v-if="show['name']">{{ show['name'] }}</p>
                        <ul class="genre p-0 nav">
                            <li v-for="(gen,index) in show['genre_ids']" :key="index" class="fs-10 color-sv  mb-0 fit-it d-inline-block">
                                <span v-if="genre[type] && genre[type][gen]">{{ genre[type][gen] }}</span>
                                <span class="pr-1 pl-0"></span>
                            </li>
                        </ul>
                        <span class="fs-10 color-sv pr-1 mb-0 fit-it d-inline-block" v-if="show['genre_ids'].length == 0">No Genre</span>
                    </div>
                </router-link>

                <!-- Action Btns -->
                <div class="position-absolute top-0 p-1 mini-container">
                    <div class="position-relative zIndex3">
                        <div class="mini d-flex align-items-center pl-2 pr-2 align-items-center  mb-1 action" v-if="type == 'tv'">
                            <i class="ri-send-plane-line fw-bold fs-10"></i>
                            <span class="pl-3 mr-3 fs-11 ">Track</span>
                        </div>
                        <div class="mini d-flex align-items-center pl-2 pr-2 align-items-center  mb-1 action" v-if="type == 'movie'">
                            <i class="ri-add-line fw-bold"></i>
                            <span class="pl-3 mr-3 fs-11 ">Want to see</span>
                        </div>
                        <div class="mini d-flex align-items-center pl-2 pr-2 align-items-center  mb-1 action"
                            v-if="type == 'movie'">
                            <i class="ri-check-line fw-bold"></i>
                            <span class="pl-3 mr-3 fs-11 ">Seen it</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        'show': {
            'required': true
        },
        'type': {
            'required': true
        }
    },
    computed: {
        ...mapGetters([
            'genre'
        ]),
    },
    mounted() {
       
    }
}
</script>
