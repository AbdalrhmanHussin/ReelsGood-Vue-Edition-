<template>
    <div class="adv">
       <div class="rg-container d-flex pt-5 pb-5" :class="{'flex-column align-items-center': windowWidth < 992}">
            <div class="img-holder pt-3 w-50 d-flex  justify-content-center">
                <img src="https://assets.reelgood.com/p/90ec3ad033b1f255b779a53bab8a2b59f6d42043/9a68f64e.png" alt="adv1.img.online" >
            </div>
            <div class="text-holder pt-3 w-50 d-flex flex-column justify-content-center align-items-start" :class="{'text-center w-100 align-items-center': windowWidth < 992}">
                <h3 class="color-wh fs-24 fw-bold">The Best Movie & TV Tracker</h3>
                <p  class="color-sv fs-15" :class="{'w-100 text-center': windowWidth < 992}">Track all the shows you watch & add movies you want to see and Reelgood will always have what you should watch next queued up!</p>
                <button>Create Account Now</button>
            </div>
       </div>
    </div>
</template>

<script>

export default ({
    data()
    {
        return {
            window: window,
            windowWidth: window.innerWidth,
        }
    },
    methods: {
        resizeHandler() {
            this.windowWidth = this.window.innerWidth;
            console.log(this.windowWidth)
        }

    },
    mounted()
    {
        window.addEventListener('resize', this.resizeHandler);
    }
})
</script>
