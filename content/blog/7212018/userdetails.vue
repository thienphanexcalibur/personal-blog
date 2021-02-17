<template>
    <main>
        <span> user {{ name }} </span>
        <span> Identity Number {{ id }} </span>
    </main>
</template>
<script>
export default {
    name: 'UserDetails',
    props: {
        name: {
            type: String
        },
        id: {
            type: Number
        }
    }
}
</script>