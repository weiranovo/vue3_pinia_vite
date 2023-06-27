export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        name: 'login',
        meta: {
            title: '登陆',
            hidden: true,
            icon: 'plus'
        }
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta: {
            title: '数据大屏',
            icon: 'plus'
        }
    },
    {
        path: '/',
        component: () => import('@/views/layout/layout.vue'),
        name: 'layout',
        meta: {
            title: 'layout',
            icon: 'plus'
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/home.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'plus'
                }
            }
        ]
    },
    {
        path: '/acl',
        component: () => import('@/views/layout/layout.vue'),
        name: 'acl',
        meta: {
            title: '权限管理',
            icon: 'plus'
        },
        redirect:'/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/user.vue'),
                name: 'user',
                meta: {
                    title: '用户管理',
                    icon: 'plus'
                },
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'role',
                meta: {
                    title: '角色管理',
                    icon: 'plus'
                },
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'permission',
                meta: {
                    title: '菜单管理',
                    icon: 'plus'
                },
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/views/layout/layout.vue'),
        name: 'Product',
        meta: {
          title: '商品管理',
          icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
          {
            path: '/product/trademark',
            component: () => import('@/views/product/trademark/index.vue'),
            name: 'Trademark',
            meta: {
              title: '品牌管理',
              icon: 'ShoppingCartFull',
            },
          },
          {
            path: '/product/attr',
            component: () => import('@/views/product/attr/index.vue'),
            name: 'Attr',
            meta: {
              title: '属性管理',
              icon: 'ChromeFilled',
            },
          },
          {
            path: '/product/spu',
            component: () => import('@/views/product/spu/index.vue'),
            name: 'Spu',
            meta: {
              title: 'SPU管理',
              icon: 'Calendar',
            },
          },
          {
            path: '/product/sku',
            component: () => import('@/views/product/sku/index.vue'),
            name: 'Sku',
            meta: {
              title: 'SKU管理',
              icon: 'Orange',
            },
          },
        ],
      },
    {
        path: '/404',
        component: () => import('@/views/404/404.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true
        }
        // children:[
        //     {
        //         path:'/ceshi111',
        //         component: ()=>import('@/views/home/home.vue'),
        //         meta:{
        //             title:"ceshi1111111"
        //         },
        //         children: [
        //             {
        //                 path: '/ceshi1',
        //                 component: () => import('@/views/home/home.vue'),
        //                 meta: {
        //                     title: '测试1'
        //                 },
        //                 children: [
        //                     {
        //                         path: '/ceshi4',
        //                         component: () => import('@/views/home/home.vue'),
        //                         meta: {
        //                             title: '测试4'
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 path: '/ceshi2',
        //                 component: () => import('@/views/home/home.vue'),
        //                 meta: {
        //                     title: '测试2'
        //                 }
        //             }
        //         ]
        //     }
        // ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: '任意路由',
            hidden: true
        }
    }
]