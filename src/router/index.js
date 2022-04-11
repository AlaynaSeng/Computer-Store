import {createRouter, createWebHistory} from "vue-router"
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component: () => import('../components/Home.vue')
        },
        {
            path:'/customer',
            name:'customer',
            component: () => import('../components/Customer.vue')
        },
        {
            path:'/employee',
            name:'employee',
            component: () => import('../components/Employee.vue')
        },
        {
            path:'/category',
            name:'category',
            component: () => import('../components/Category.vue')
        },
        {
            path:'/product',
            name:'product',
            component: () => import('../components/Product.vue')
        },
        {
            path:'/supplier',
            name:'supplier',
            component: () => import('../components/Supplier.vue')
        },
        {
            path:'/shipper',
            name:'shipper',
            component: () => import('../components/Shipper.vue')
        },
        {
            path:'/create',
            name:'create',
            component: () => import('../components/CreateOrder.vue')
        },
        {
            path:'/orders',
            name:'orders',
            component: () => import('../components/Orders.vue')
        },
    ]
})

export default router