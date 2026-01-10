<template>
    <div class="large-screen">
        <industry-cluster-background ref="backgroundRef" @animationComplete="animationCompleteBg"></industry-cluster-background>
        <div class="large-screen-wrap" id="large-screen">
            <!-- 顶部菜单 -->
            <top-menu :active-index="state.activeIndex"></top-menu>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">

            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--产业规模增长曲线-->
                    <industry-union-development></industry-union-development>
                    <!--产业联盟构成-->
                    <industry-union></industry-union>
                    <!--银发企业细分赛道-->
                    <development-direction-top5></development-direction-top5>
                </div>
            </div>
            <!-- 中间布局 -->
            <div class="center-wrap">
                <industry-cluster-center ref="centerRef" @animationComplete="animationCompleteC"></industry-cluster-center>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--总投资完成情况-->
                    <completion-status-of-total-investment :current-value="175"></completion-status-of-total-investment>
                    <!--项目引进情况-->
                    <project-introduction></project-introduction>
                    <!--企业规模形态-->
                    <special-policy-support></special-policy-support>
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
import {ref, reactive, onMounted, nextTick} from "vue"
import mRadar from "@/components/mRadar/index.vue"
import topMenu from "@/components/topMenu/index.vue"
import bottomTray from "@/components/bottomTray/index.vue"
import mLoading from "@/components/mLoading/index.vue"

import gsap from "gsap"
import autofit from "autofit.js"
import CompletionStatusOfTotalInvestment
    from "@/views/industryCluster/components/CompletionStatusOfTotalInvestment.vue";
import ProjectIntroduction from "@/views/industryCluster/components/ProjectIntroduction.vue";
import IndustryUnion from "@/views/industryCluster/components/IndustryUnion.vue";
import SpecialPolicySupport from "@/views/industryCluster/components/SpecialPolicySupport.vue";
import IndustryUnionDevelopment from "@/views/industryCluster/components/IndustryUnionDevelopment.vue";
import DevelopmentDirectionTop5 from "@/views/industryCluster/components/developmentDirectionTop5.vue";
import IndustryClusterBackground from "@/views/industryCluster/components/industryClusterBackground.vue";
import IndustryClusterCenter from "@/views/industryCluster/components/industryClusterCenter.vue";

const loadingRef = ref(null)
const centerRef = ref(null)
const backgroundRef = ref(null)
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "left-2",
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
            animationStartBg()
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
    if(state.init) {
        // 中心动画
        let centerRefInterval = setInterval(() => {
            if(centerRef.value) {
                // 使用 nextTick 确保组件完全渲染后再调用
                nextTick(() => {
                    centerRef.value.handlePageLoadComplete()
                })
                clearInterval(centerRefInterval)
            }
        }, 100)
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
.large-screen-wrap {
    pointer-events: auto;
}
</style>
