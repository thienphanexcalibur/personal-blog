<template>
</template>
<script>
import { eventBus } from 'path/event-bus.js';

export default {
    methods: {
        listenGlobalEvent () {
            eventBus.$on('INIT_USER', (message) => {
                // Do something
            })
        }
    },

    mounted () {
        this.listenGlobalEvent();
    }
}
</script>