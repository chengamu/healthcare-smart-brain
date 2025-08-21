import { createRouter, createWebHashHistory } from "vue-router"

const gdMap = () => import("@/views/gdMap/index.vue")
const industryPanorama = () => import("@/views/industryPanorama/index.vue")
const industryUnion = () => import("@/views/industryUnion/index.vue")
const talentUnion = () => import("@/views/talentUnion/index.vue")
const innovationEcosystem = () => import("@/views/innovationEcosystem/index.vue")
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/gdMap",
      component: gdMap,
    },
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
    {
      path: "/gdMap",
      component: gdMap,
    },

    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
})

export default router
