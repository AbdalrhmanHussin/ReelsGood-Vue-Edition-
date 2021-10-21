<template>
    <div class="sw-splider">
        <!-- Loader -->
        <transition name="list">
            <pr-skeleton v-if="skeleton"></pr-skeleton>
        </transition>
        <!-- Data Slider-->
        <transition name="list">
            <Splide :options="options" v-if="!skeleton">
                <SplideSlide v-for="(show,index) in shows" :key="index">
                    <div class="collection ml-2" v-for="(collection,index) in show" :key="index">
                        <div class="actor-circle mb-2 d-flex  align-items-center">
                            <div class="letters d-flex justify-content-center align-items-center fs-12 color-wh"
                                :style="{'background-color': this.collector.getRandColor()}">
                                {{ collector.getFirstLetters(collection['name']) }}
                            </div>
                            <p class="mb-0 pl-2 fs-12">{{collection['name']}}</p>
                        </div>
                    </div>
                </SplideSlide>
            </Splide>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';
import prSkeleton from '../skeletons/pr-skeleton.vue'
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
                breakpoints: {
                    1400: {
                        perPage: 5,
                    },

                    1100: {
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
        'pr-skeleton': prSkeleton,
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
                this.shows = res.data;
                                console.log(this.shows)
                this.skeleton = false
            })
        }
    }, 

     mounted() {
        this.getShows();
    }
})
</script>
