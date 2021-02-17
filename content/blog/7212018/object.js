// Object mode
export const routers = [
    {
        path: '/users',
        component: () => import('@/components/ComponentA.vue')
    },
    {
        path: '/userDetails',
        component: () => import('@/components/ComponentB.vue'),
        props: { show: true, default: false }
    }
]
