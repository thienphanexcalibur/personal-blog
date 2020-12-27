<template>
    <button @click="emitEvent"></button>
</template>
<script>
export default {
    data () {
        return {
            message: 'Hello World'
        }
    },

    methods: {
        emitEvent () {
            // some work before emit an event
            func()
            this.$emit('INIT_USER', this.message)
        },
        listenEvent () {
            this.$on('INIT_USER', (val) => {
                // Do something meaningful
            })
        }
    },

    mounted () {
        this.listenEvent();
    }
}
</script>