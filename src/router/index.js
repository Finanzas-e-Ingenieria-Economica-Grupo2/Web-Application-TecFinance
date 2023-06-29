// Routing Module
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/loan/:userId",
            name: "loan",
            component: () => import("../loan/pages/loan-content.component.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../login/pages/login-content.component.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../register/pages/register-content.component.vue")
        },
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/payments/:offerId",
            name: "payments",
            component: () => import("../payments/pages/payment-content.component.vue")
        }
    ]

});

export default router;
