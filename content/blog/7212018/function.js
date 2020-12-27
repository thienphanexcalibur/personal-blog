// Function mode
// Allow you to use route parameters and return the "shaped" props.
export const routers = [
    {
        path: '/users',
        component: () => import('@/components/ComponentA.vue')
    },
    {
        path: '/userDetails',
        component: () => import('@/components/ComponentB.vue'),
        props: route => ({filter: route.params.filter})
    }
]