<template>
</template>
<script>
import { eventBus } from 'path/event-bus.js';

export default {
    data () {
        return {
            message: 'Hello World'
        }
    },

    methods: {
        emitGlobalEvent () {
            eventBus.$emit('INIT_USER', this.message)
        }
    },

    mounted () {
        this.emitGlobalEvent();
    }
}
</script>