import {createRouter, createWebHashHistory} from "vue-router"

/*
 * 20250821前版本
 */
const industryPanorama = () => import("@/views/industryPanorama/index.vue")
const industryUnion = () => import("@/views/industryUnion/index.vue")
const talentUnion = () => import("@/views/talentUnion/index.vue")
const innovationEcosystem = () => import("@/views/innovationEcosystem/index.vue")

/*
 * 20250821后版本
 */
const grandBlueprint = () => import("@/views/grandBlueprint/index.vue")
const industryCluster = () => import("@/views/industryCluster/index.vue")
const innovationDriven = () => import("@/views/innovationDriven/index.vue")
const talentEngine = () => import("@/views/talentEngine/index.vue")
const livableEcosystem = () => import("@/views/livableEcosystem/index.vue")
const redCoreLeadership = () => import("@/views/redCoreLeadership/index.vue")

const gdMap = () => import("@/views/gdMap/index.vue")
const login = () => import("@/views/login.vue")
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/grandBlueprint",
            component: grandBlueprint,
        },
        /*
         * 20250821前版本
         */
        {
            path: "/industryPanorama",
            component: industryPanorama,
        },
        {
            path: "/industryUnion",
            component: industryUnion,
        },
        {
            path: "/talentUnion",
            component: talentUnion,
        },
        {
            path: "/innovationEcosystem",
            component: innovationEcosystem,
        },
        /*
         * 20250821后版本
         */
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
            path: "/gdMap",
            component: gdMap,
        },
        {
            path: "/login",
            component: login,
        },
        {
            path: "/:pathMatch(.*)",
            redirect: "/",
        },
    ],
})

export default router
