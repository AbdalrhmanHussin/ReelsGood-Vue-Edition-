<template>
   <div class="sw-splider">
        <!-- Loader -->
        <transition name="list">
            <sw-skeleton v-if="skeleton"></sw-skeleton>
        </transition>
        <!-- Data Slider -->
       <transition name="list">
        <Splide :options="options" v-if="!skeleton">
            <SplideSlide v-for="(show,index) in shows" :key="index">
                <div class="sw-box-md position-relative w-100 p-2">
                    <div class="sw-card-container position-relative w-100">
                        <img :src="'http://image.tmdb.org/t/p/w500/'+show.poster_path" alt="show-img" class="w-100 h-100">
                        <div class="position-absolute top-0 w-100 h-100 top-0 p-2 d-flex justify-content-between align-items-start sw-box-layer">
                            <a href="#" class="w-100 h-100 position-absolute top-0 left-0 zIndex2 dir-link">
                                <div class="position-absolute h-100 d-flex justify-content-end flex-column p-2 fs-12 color-wh"> 
                                    <p class="fs-12 fw-600 mb-0" v-if="show['title']">{{ show['title'] }}</p>
                                    <p class="fs-12 fw-600 mb-0" v-if="show['name']">{{ show['name'] }}</p>
                                    <ul class="genre p-0 nav">
                                        <li v-for="(gen,index) in show['genre_ids']" :key="index" class="fs-10 color-sv pr-1 mb-0 fit-it d-inline-block"> 
                                            <span v-if="genre[type][gen]">{{ genre[type][gen] }}</span>
                                            <span class="p-1" v-if="index !== show['genre_ids'].length - 1">,</span>
                                        </li>
                                    </ul>
                                    <span class="fs-10 color-sv pr-1 mb-0 fit-it d-inline-block" v-if="show['genre_ids'].length == 0">No Genre</span>
                                </div>
                            </a>
                            <div class="position-absolute top-0 p-2 mini-container">
                                <div class="position-relative zIndex3">
                                    <div class="mini d-flex align-items-center pl-2 pr-2 align-items-center  mb-1 action">
                                        <i class="ri-send-plane-line"></i>
                                        <span class="pl-3 mr-3 fs-11 ">Track</span>
                                    </div>
                                </div>
                            </div>
                            <p class="mb-0 type"></p>
                        </div>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
       </transition>
   </div>
</template>

<script>
import axios from 'axios';
import swSkeleton from '../skeletons/sw-skeleton.vue'
import { mapGetters } from 'vuex'

export default ({
    props: {
        'type': {
            'required': true,
            validator(value) {
              let arr = ['person','movie','tv'];
              let check = arr.find((x) => {return x == value })   
              if(check == undefined) {
                throw 'Not a valid type valid types =>  [tv,movie,person]'
              }
            }
        },
        'sort': {

        }
    },
    data() {
        return {
            shows: [],
            genraSet: {18:'Action'},
            skeleton: true,
            options: {
                rewind: false,
                perPage: 8,
                pagination: false,
                breakpoints: {
                    1400: {
                        perPage: 7,
                    },

                    1200: {
                        perPage: 6
                    },

                    1100: {
                        perPage: 5
                    },

                    992: {
                        perPage: 4
                    },

                   700: {
                        perPage: 3
                    },

                    580: {
                        perPage: 2
                    }
                }
            }
        }
    },

    components: {
        'sw-skeleton': swSkeleton,
    },

    computed: {
        ...mapGetters([
            'genre'
        ]),

        chunkedItems () {
            
        },

        sortBy() {
            if(this.sort == undefined) {
                return 'popular'
            } else {
                return this.sort;
            }
        }
    },

    methods: {
        getShows() 
        {
            /** get the decalred show */
            axios.post(`show/${this.type}/1/${this.sortBy}`).then((res) => {
                this.shows = res.data.results;
                this.skeleton = false
            })
        }
    }, 

    mounted() {
        this.getShows();
    }
})
</script>
