<template>
    <div class="large-screen">
        <red-core-leadership-background ref="backgroundRef" @animationComplete="animationCompleteBg"></red-core-leadership-background>
        <div class="large-screen-wrap" id="large-screen">
            <!-- 顶部菜单 -->
            <top-menu :active-index="state.activeIndex"></top-menu>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">

            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--组织架构总览-->
                    <overview-of-organizational-structure></overview-of-organizational-structure>
                    <!--服务企业发展-->
                    <service-enterprise-development></service-enterprise-development>
                    <!--服务人才群众-->
                    <serve-talents-and-the-masses></serve-talents-and-the-masses>
                </div>
            </div>
            <!-- 中间布局 -->
            <div class="center-wrap">
                <!--“党建联建”组织架构光辉图-->
                <red-core-leadership-center-with-intro ref="centerRef" @animationComplete="animationCompleteC"></red-core-leadership-center-with-intro>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--党员先锋岗-->
                    <party-member-vanguard-post :height="272"></party-member-vanguard-post>
                    <!--党的动态-->
                    <party-building-leads-the-way></party-building-leads-the-way>
                    <!--强化理论学习-->
                    <reinforcement-theory-learning></reinforcement-theory-learning>
                </div>
            </div>
            <!-- 底部托盘 -->
            <bottom-tray></bottom-tray>
            <!-- 雷达 -->
            <div class="bottom-radar">
                <mRadar></mRadar>
            </div>
            <!-- 左右装饰线 -->
            <div class="large-screen-left-zsline"></div>
            <div class="large-screen-right-zsline"></div>
        </div>

        <!-- loading动画 -->
        <!-- <mLoading ref="loadingRef" :progress="state.progress"></mLoading> -->
    </div>
</template>
<script setup>
import {shallowRef, ref, reactive, onMounted, onBeforeUnmount} from "vue"
import mRadar from "@/components/mRadar/index.vue"
import topMenu from "@/components/topMenu/index.vue"
import bottomTray from "@/components/bottomTray/index.vue"
import mLoading from "@/components/mLoading/index.vue"

import gsap from "gsap"
import autofit from "autofit.js"
import RedCoreLeadershipCenterWithIntro from "@/views/redCoreLeadership/components/redCoreLeadershipCenterWithIntro.vue";
import OverviewOfOrganizationalStructure
    from "@/views/redCoreLeadership/components/overviewOfOrganizationalStructure.vue";
import ServiceEnterpriseDevelopment from "@/views/redCoreLeadership/components/serviceEnterpriseDevelopment.vue";
import ServeTalentsAndTheMasses from "@/views/redCoreLeadership/components/serveTalentsAndTheMasses.vue";
import PartyMemberVanguardPost from "@/views/redCoreLeadership/components/partyMemberVanguardPost.vue";
import ReinforcementTheoryLearning from "@/views/redCoreLeadership/components/reinforcementTheoryLearning.vue";
import PartyBuildingLeadsTheWay from "@/views/redCoreLeadership/components/partyBuildingLeadsTheWay.vue";
import RedCoreLeadershipBackground from "@/views/redCoreLeadership/components/redCoreLeadershipBackground.vue";

const loadingRef = ref(null)
const centerRef = ref(null)
const backgroundRef = ref(null)
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "right-3",
    // 是否初始化
    init: false
})

onMounted(() => {
    // 自动适配
    autofit.init({
        dh: 1080,
        dw: 1920,
        el: "#large-screen",
        resize: true,
    })
    
    // 模拟加载过程
    // simulateLoading()

    // 背景动画开启
    state.init = true
    animationStartBg()
})

// 模拟加载过程
function simulateLoading() {
    let progress = 0
    const interval = setInterval(async () => {
        progress += Math.floor(Math.random() * 10) + 1
        if (progress >= 100) {
            progress = 100
            clearInterval(interval)
            await hideLoading()
            // 加载完成后触发动画
            handlePageLoadComplete()
        }
        state.progress = progress
    }, 100)
}

// 隐藏loading
async function hideLoading() {
    if (loadingRef.value) {
        return await loadingRef.value.hide()
    }
}

// 背景动画
function animationStartBg() { 
    let backgroundRefInterval = setInterval(() => {
        if(backgroundRef.value) {
            backgroundRef.value.handlePageLoadComplete()
            clearInterval(backgroundRefInterval)
        }
    }, 100)
}

// 背景动画完成
function animationCompleteBg() {
    // if(state.init) {
    //     // 中心动画
    //     let centerRefInterval = setInterval(() => {
    //         if(centerRef.value) {
    //             centerRef.value.handlePageLoadComplete()
    //             clearInterval(centerRefInterval)
    //         }
    //     }, 100)
    // }
    if(state.init) {
        loadOtherComponents()
    }
}

// 中心动画完成
function animationCompleteC() {
    if(state.init) {
        loadOtherComponents()
    }
}

// 加载其他组件
function loadOtherComponents() {
    let tl = gsap.timeline({ paused: false })
    let leftCards = gsap.utils.toArray(".left-card")
    let rightCards = gsap.utils.toArray(".right-card")
    let countCards = gsap.utils.toArray(".count-card")
    
    tl.addLabel("start", 0)
    tl.addLabel("menu", 0.5)
    tl.addLabel("card", 1)
    tl.addLabel("countCard", 2)
    
    tl.to(".m-header", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "start")
    tl.to(".bottom-tray", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "start")
    tl.to(".top-menu", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
    }, "menu")
    tl.to(".bottom-radar", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "menu")
    tl.to(leftCards, { x: 0, opacity: 1, stagger: 0.2, duration: 1.5, ease: "power4.out" }, "card")
    tl.to(rightCards, { x: 0, opacity: 1, stagger: 0.2, duration: 1.5, ease: "power4.out" }, "card")
    if(countCards.length > 0) {
        tl.to(countCards, {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.5,
            ease: "power4.out",
        }, "countCard")
    }
    state.init = false
}
</script>

<style lang="scss">
@import "~@/assets/style/home.scss";
.bottom-radar {
    position: absolute;
    right: 500px;
    bottom: 100px;
    z-index: 3;
}
.main-btn-group {
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    z-index: 999;
    &.disabled {
        pointer-events: none;
    }
    .btn {
        margin-right: 10px;
    }
}

/* 初始化动画开始位置 */
.count-card {
    transform: translateY(150%);
    opacity: 0;
}
.left-card {
    transform: translateX(-150%);
    opacity: 0;
}
.right-card {
    transform: translateX(150%);
    opacity: 0;
}
.bottom-radar {
    transform: translateY(100%);
    opacity: 0;
}
</style>