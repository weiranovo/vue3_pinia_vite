export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        name: 'login'
    },
    {
        path: '/',
        component: () => import('@/views/home/home.vue'),
        name: 'layout'
    },
    {
        path: '/404',
        component: () => import('@/views/404/404.vue'),
        name: '404'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any'
    }
]