<template>
    <vue-progress-bar></vue-progress-bar>
    <nav v-if="fixedNav || !navAction" :style="{'background-color': this.collector.getRandColor(),'height': navHeight + 'px'}"></nav>
    <transition name="navbar">
        <nav class="navbar navbar-expand-md navbar-light shadow-sm w-100" :class="{'position-fixed top-0 scrolled': fixedNav}" v-if="navAction" ref="nav">
            <div class="rg-container d-flex">
                <a class="navbar-brand d-flex" href="#">
                    <i class="ri-menu-2-line" @click="openNav =! openNav"></i>
                    <img src="/images/system/logo.svg" ult="Reelsgood">
                </a>
                <!-- Left Side Of Navbar -->
                <transition name="list">
                    <ul class="navbar-nav mr-auto menu" v-if="openNav || windowWidth > 992">
                        <div :class="{'rg-container d-flex flex-column justify-content-start align-items-start': windowWidth < 992}"
                            class="d-flex">
                            <a href="#">
                                <li class="menu-item position-relative">
                                    Tv Shows
                                    <!-- Drop Menu -->
                                    <div class="drop-genre position-absolute">
                                        <ul class="drop-menu d-grid gridx3 navbar-nav">
                                            <li class="nav-item fs-12" v-for="(gen,index) in genre['tv']" :key="index">
                                                {{ gen }}
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </a>
                            <a href="#">
                                <li class="menu-item position-relative">
                                    Movies
                                    <!-- Drop Menu -->
                                    <div class="drop-genre position-absolute ">
                                        <ul class="drop-menu d-grid gridx3 navbar-nav">
                                            <li class="nav-item fs-12" v-for="(gen,index) in genre['movie']" :key="index">
                                                {{ gen }}</li>
                                        </ul>
                                    </div>
                                </li>
                            </a>
                            <a href="#">
                                <li class="menu-item position-relative">
                                    Your List
                                </li>
                            </a>
                        </div>
                    </ul>
                </transition>

                <!-- Right Side Of Navbar -->

                <!--Toggle Btn-->
                <div class="toggler-btn d-flex ml-auto">
                    <button class="icon-user" v-if="windowWidth < 587">
                        <i class="ri-user-2-fill  pr-3"></i>
                    </button>

                    <button class="icon-search" v-if="windowWidth < 992" @click="search =! search">
                        <i class="ri-search-2-line ml-auto"></i>
                    </button>
                </div>

                <ul class="navbar-nav ml-auto menu" v-if="windowWidth > 587">
                    <!-- Authentication Links -->
                    <a href="#">
                        <li class="nav-item menu-item">
                            Login
                        </li>
                    </a>
                    <span class="menu-item">|</span>
                    <a href="#">
                        <li class="nav-item menu-item">
                            Register
                        </li>
                    </a>
                </ul>
                <form action="" class="search" :class="{'active': windowWidth < 992 && search}">
                    <div class="form-group w-100 h-100 position-relative m-0">
                        <label class="position-absolute right-0 color-wh p-3 close" @click="search =! search">
                            <i class="ri-close-circle-line ml-auto fs-15  color-wh "></i>
                        </label>
                        <input type="search" placeholder="Where To Stream Anything" class="search">
                        <div class="search-container p-2 position-absolute" :class="{'w-100': windowWidth < 922}"
                            v-if="searchArr.length > 0">
                            <div class="search-result mb-2">
                                <h3 class="fs-13 color-wh mb-0">League of leagend </h3>
                                <span class="d-flex fs-12 color-sv">Movie</span>
                            </div>
                            <div class="search-result mb-2">
                                <h3 class="fs-13 color-wh mb-0">Tommorrow land</h3>
                                <span class="d-flex fs-12 color-sv">Movie</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </nav>
    </transition>
</template>

<script>

 import {
     mapActions
 } from 'vuex';
 import {
     mapGetters
 } from 'vuex';

export default ({
    data() {
        return {
            window: window,
            windowWidth: window.innerWidth,
            openNav: false,
            search: false,
            navbar: true,
            windowScroll: 0,
            searchArr: [],
            fixedNav: false,
            navAction: true
        }
    },
    computed: {
        ...mapGetters([
            'genre'
        ]),

        navHeight()
        {
            return this.$refs.nav.clientHeight
        }

    },
    methods: {
        ...mapActions([
            'genres'
        ]),

        resizeHandler() {
            this.windowWidth = this.window.innerWidth;
        },

        scrollNav()
        {
            let oldScroll = this.window.scrollY;

            if(oldScroll < this.windowScroll && window.scrollY > 300)
            {
                this.navAction = true;
                this.fixedNav  = true;
            } else {
                this.fixedNav  = false;
            }

            if(!this.fixedNav && window.scrollY > 300) {
                this.navAction = false;
            };



            return this;
        },

        scrollSet()
        {
            this.navbar = true;
            this.windowScroll = this.window.scrollY;
        }

    },
    mounted() {
        this.genres();
        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener('scroll',() => {
            this.scrollNav().scrollSet(); 
        })
    }
 })
</script>

