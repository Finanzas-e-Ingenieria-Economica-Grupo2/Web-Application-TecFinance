// Routing Module
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/loan", name: "loan", component: () => import("../loan/pages/loan-content.component.vue")},
        {path: "/", redirect: "/loan"},
        {
            path: "/payments/:offerId",
            name: "payments",
            component: () => import("../payments/pages/payment-content.component.vue")
        },
    ]

});

export default router;
