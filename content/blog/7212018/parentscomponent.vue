<template>
    <user-detail name="user.name" id="user.id"></user-detail>
</template>

<script>
import { mapState } from 'vuex';
import UserDetail from '/components/UserDetail.vue';
export default {
    data () {
        return {
            // some variables
        }
    },

    components: {
        'user-detail': UserDetail    
    },

    computed: {
        // Map user object from state to component computed variable
        ...mapState({
            user: state => state.user
        })
    },

    beforeMount () {
        // Do some async work to retrieve user details data
        this.$store.dispatch('getUserDetail')
    }
}

</script>