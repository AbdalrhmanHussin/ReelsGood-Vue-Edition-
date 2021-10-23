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
                <sw-box :show="show" :type="type"></sw-box>
            </SplideSlide>
        </Splide>
       </transition>
   </div>
</template>

<script>
import axios from 'axios';
import swSkeleton from '../skeletons/sw-skeleton.vue'
import swBox from '../Boxes/sw-box.vue';
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
                rewind: true,
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
        'sw-box': swBox
    },

    computed: {
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
