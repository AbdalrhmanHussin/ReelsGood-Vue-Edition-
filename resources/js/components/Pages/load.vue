<template>
    <div class="load d-flex justify-content-center align-items-center flex-column" v-if="$store.state.load">
        <img src="/images/system/load.gif" alt="load">
        <p class="fs-12  color-wh">Aww , Something Spice Here</p>
    </div>
</template>