<template>
    <div class="">
        <header
            :style="{'background': linearImage , 'background-size': 'cover' }"
            class="w-100 position-relative">
            <div class="container d-flex pt-5  h-100">
                <img :src="'https://image.tmdb.org/t/p/w500/' + show.poster_path" class="poster">
                <div class="display-info pl-5 ml-2">
                    <h3 v-if="show.name" class="h3 fw-bold text-white mb-3">{{ show.name }}</h3>
                    <h3 v-if="show.title" class="h3 fw-bold text-white mb-3">{{ show.title }}</h3>
                    <div class="toggler mb-3 action-container">
                        <button class="silver-btn  action actionbtn fs-13 fw-600">Watch Later</button>                        
                        <button class="silver-btn action actionbtn fs-13" v-if="type == 'tv'">Seen All</button>
                        <button class="silver-btn action actionbtn fs-13" v-if="type == 'tv'">Track</button>
                        <button class="silver-btn action actionbtn fs-13" v-if="type == 'movie'">Love</button>
                        <button class="silver-btn action actionbtn fs-13" v-if="type == 'movie'">Watched</button>
                    </div>
                </div>
            </div>
            <div class="rg-container">
                <!-- people -->
                <section class="sec mt-5 position-relative">
                  
                </section>
            </div>
        </header>
    </div>
</template>

<script>
import { mapActions } from "vuex"

    export default ({
        props: ['id','type'],
        data() {
            return {
                show: ''
            }
        },

        methods: {
            ...mapActions([
                'getShow'
            ])
        },

        computed: {
            linearImage() {
                return `linear-gradient(357deg,#0a1016,#0a1016db,#0a1016b8),url('https://image.tmdb.org/t/p/w1280/${this.show.backdrop_path}')`
            }
        },

        mounted() {
            this.getShow({
                type: this.type,
                id: this.id
            }).then((res) => {
                this.show = res;
                console.log(this.show);
            });
        }
    })

</script>
