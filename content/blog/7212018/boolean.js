// Boolean mode
// Component B's props are any parameters passed by routing from Component A

export const routers = [
    {
        path: '/users',
        component: () => import('@/components/ComponentA.vue')
    },
    {
        path: '/userDetails',
        component: () => import('@/components/ComponentB.vue'),
        props: true
    }
]