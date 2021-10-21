<template>
    <div class="p-discover">
        <x-loginask1></x-loginask1>
    </div>
</template>
<script>

import Login1 from '../Fragments/LoginAsk1.vue';

export default ({
    components: {
        'x-loginask1': Login1
    },
})
</script>
