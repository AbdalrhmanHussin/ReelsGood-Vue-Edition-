<template>
    <div class="layout">
        <x-navbar></x-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '../Fragments/Navbar.vue';

export default ({
    components: {
        'x-navbar': Navbar,
    }
});

</script>
