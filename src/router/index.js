// Routing Module
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/loan", name: "loan", component: () => import("../loan/pages/loan-content.component.vue")},
        {path: "/", redirect: "/loan"}
        /* Ejemplos
        {path:"/home", component:HomeComponent},
        {path:"/", redirect:"/home"},
        {path:"/medicalHistory", name:"medicalHistory", component: () => import("../docseeker/pages/medical-history.component.vue")}
        */
    ]

});

export default router;
