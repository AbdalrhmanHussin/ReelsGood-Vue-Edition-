<template>
    <vue-progress-bar></vue-progress-bar>
    <nav class="nav-clone"></nav>
    <transition name="navbar">
        <nav class="navbar navbar-expand-md navbar-light shadow-sm w-100 position-absolute top-0" :class="{'position-fixed top-0 scrolled': fixedNav}" v-if="navAction" ref="nav">
            <div class="rg-container d-flex">
                <div class="navbar-brand d-flex" href="#">
                    <i class="ri-menu-2-line" @click="openNav =! openNav"></i>
                    <img src="/images/system/logo.svg" ult="Reelsgood">
                </div>
                <!-- Left Side Of Navbar -->
                <transition name="list">
                    <ul class="navbar-nav mr-auto menu" v-if="openNav || windowWidth > 992">
                        <div :class="{'rg-container d-flex flex-column justify-content-start align-items-start': windowWidth < 992}"
                            class="d-flex">
                            <router-link :to="{name:'display',params:{type:'tv'}}">
                                <li class="menu-item position-relative">
                                    Tv Shows
                                    <!-- Drop Menu -->
                                    <div class="drop-genre position-absolute">
                                        <ul class="drop-menu d-grid gridx3 navbar-nav zIndex5">
                                           <router-link v-for="(gen,index) in genre['tv']" :key="index" :to="{name:'display',params:{type:'tv',id: index}}">
                                                <li class="nav-item fs-12" >
                                                    {{ gen }}
                                                </li>
                                           </router-link>
                                        </ul>
                                    </div>
                                </li>
                            </router-link>
                            <router-link :to="{name:'display',params:{type:'movie'}}">
                                <li class="menu-item position-relative">
                                    Movies
                                    <!-- Drop Menu -->
                                    <div class="drop-genre position-absolute ">
                                        <ul class="drop-menu d-grid gridx3 navbar-nav zIndex5">
                                            <router-link v-for="(gen,index) in genre['movie']" :key="index" :to="{name:'display',params:{type:'movie',id: index}}">
                                                <li class="nav-item fs-12" >
                                                    {{ gen }}
                                                </li>
                                           </router-link>
                                        </ul>
                                    </div>
                                </li>
                            </router-link>
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
                    <button class="icon-user" v-if="windowWidth < 992">
                        <i class="ri-user-2-fill  pr-3"></i>
                    </button>

                    <button class="icon-search" v-if="windowWidth < 992" @click="search =! search">
                        <i class="ri-search-2-line ml-auto"></i>
                    </button>
                </div>

                <ul class="navbar-nav ml-auto menu" v-if="windowWidth > 992">
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
                        <transition name="list">
                            <input type="search" placeholder="Where To Stream Anything" class="search" v-model="searchKey" @keyup="searchIt()">
                        </transition>
                        <div class="search-container p-2 position-absolute zIndex5" :class="{'w-100': windowWidth < 922}"
                            v-if="searchArr.length > 0 && searchKey.length > 0">
                            <div class="search-result mb-2" v-for="(search,index) in searchArr" :key="index">
                                <h3 class="fs-13 color-wh mb-0" v-if="search.name">{{ search.name }}</h3>
                                <h3 class="fs-13 color-wh mb-0" v-if="search.title">{{ search.title }}</h3>
                                <span class="d-flex fs-12 color-sv" v-if="search.media_type">{{ search.media_type }}</span>
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
            navbarFirstFix: true,
            windowScroll: 0,
            searchArr: [],
            fixedNav: false,
            navAction: true,
            searchKey: ''
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
            'genres',
            'searchGet'
        ]),

        resizeHandler() {
            this.windowWidth = this.window.innerWidth;
        },

        scrollNav()
        {
            let oldScroll = this.window.scrollY;
            if(oldScroll < this.windowScroll)
            {
                this.navAction = true;
                this.fixedNav  = true
            } else if (oldScroll > this.windowScroll) {
                if(this.fixedNav && this.windowScroll > 0){
                    this.fixedNav = false;
                }
            }

            if(!this.fixedNav && window.scrollY > 100) {
                this.navAction = false;
            };
            return this;
        },

        scrollSet()
        {
            this.navbar = true;
            this.windowScroll = this.window.scrollY;
        },

        searchIt()
        {
            if(this.searchKey.length > 0)
            {
                this.searchGet({searchKey: this.searchKey}).then((res) => {
                    console.log(res);
                    this.searchArr = res;
                })
            }
        }

    },
    mounted() {
        this.genres();
        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener('scroll',() => {
            this.scrollNav().scrollSet(); 
        });
    }
 })
</script>

