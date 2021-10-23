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
                    <med-box :show="show"></med-box>    
               </SplideSlide>
        </Splide>
       </transition>
   </div>
</template>

<script>
import axios from 'axios';
import swSkeleton from '../skeletons/sw-skeleton.vue'
import mdBox from '../Boxes/med-box.vue';

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
                perPage: 5,
                pagination: false,
                padding: { top: 10, bottom: 20 },
                breakpoints: {
                    1100: {
                        perPage: 5
                    },

                    992: {
                        perPage: 3
                    },

                   700: {
                        perPage: 2
                    },

                    580: {
                        perPage: 1
                    }
                }
            }
        }
    },

    components: {
        'sw-skeleton': swSkeleton,
        'med-box': mdBox
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
                console.log(this.shows);
                this.skeleton = false
            })
        }
    }, 

    mounted() {
        this.getShows();
    }
})
</script>
