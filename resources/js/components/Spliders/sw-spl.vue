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
import { mapActions, mapGetters } from 'vuex'

export default ({
    props: {
        'type': {
            'required': false,
            validator(value) {
              let arr = ['person','movie','tv'];
              let check = arr.find((x) => {return x == value })   
              if(check == undefined) {
                throw 'Not a valid type valid types =>  [tv,movie,person]'
              }
            }
        },
        'sort': {
            default: 'popular'
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
        ...mapActions([
            'getShows'
        ])
    }, 

    mounted() {
        this.getShows({
            type: this.type,
            sort: this.sort,
            page: 1
        }).then((res) => {
            console.log(res);
            this.skeleton = false;
            this.shows = res.results;
        });
    }
})
</script>
