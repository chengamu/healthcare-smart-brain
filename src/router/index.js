import {createRouter, createWebHashHistory} from "vue-router"

const grandBlueprint = () => import("@/views/grandBlueprint/index.vue")
const industryCluster = () => import("@/views/industryCluster/index.vue")
const innovationDriven = () => import("@/views/innovationDriven/index.vue")
const talentEngine = () => import("@/views/talentEngine/index.vue")
const livableEcosystem = () => import("@/views/livableEcosystem/index.vue")
const redCoreLeadership = () => import("@/views/redCoreLeadership/index.vue")

const silverEconomy = () => import("@/views/silverEconomy/index.vue")

const gdMap = () => import("@/views/gdMap/index.vue")
const login = () => import("@/views/login.vue")
const index = () => import("@/views/index.vue")
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/index",
            component: index,
        },
        {
            path: "/grandBlueprint",
            component: grandBlueprint,
        },
        {
            path: "/industryCluster",
            component: industryCluster,
        },
        {
            path: "/innovationDriven",
            component: innovationDriven,
        },
        {
            path: "/talentEngine",
            component: talentEngine,
        },
        {
            path: "/livableEcosystem",
            component: livableEcosystem,
        },
        {
            path: "/redCoreLeadership",
            component: redCoreLeadership,
        },

        {
            path: "/silverEconomy",
            component: silverEconomy,
        },

        {
            path: "/gdMap",
            component: gdMap,
        },
        {
            path: "/login",
            component: login,
        },
        {
            path: "/index",
            component: index,
        },
        {
            path: "/:pathMatch(.*)",
            redirect: "/",
        },
    ],
})

export default router
