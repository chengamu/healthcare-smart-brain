<template>
    <div class="large-screen">
        <!-- 背景组件初始隐藏，3D加载完成后显示 -->
        <innovation-driven-background ref="backgroundRef" @animationComplete="animationCompleteBg"></innovation-driven-background>
        <div class="large-screen-wrap" id="large-screen">
            <!-- 顶部菜单 -->
            <top-menu :active-index="state.activeIndex"></top-menu>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">

            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--一类创新药研发进度-->
                    <progress-of-new-drug-development @update:drugData="handleDrugData"></progress-of-new-drug-development>
                    <!--医疗器械获批进度-->
                    <progress-of-medical-device-approval @update:instrumentData="handleInstrumentData"></progress-of-medical-device-approval>
                    <!--研发投入(R&D)增长-->
<!--                    <annual-r-d-investment -->
<!--                        title="研发投入(R&D)增长" -->
<!--                        @update:yftrTypeData="handleYftrTypeData">-->
<!--                    </annual-r-d-investment>-->
                    <!--创新平台支撑-->
<!--                    <innovation-platform-support></innovation-platform-support>-->
                    <!--技术合作-->
                    <technology-cooperation @update:technologyData="handleTechnologyData"></technology-cooperation>
                </div>
            </div>
            <!-- 中间布局：满屏3D分子结构背景 -->
            <div class="center-wrap">
                <!--全链条创新转化分子结构背景-->
                <innovation-molecule-center
                    :rd-investment-value="yftrTypeData"
                    :instrument-value="instrumentData"
                    :technology-value="technologyData"
                    :drug-value="drugData"
                    ref="centerRef"
                    @animationComplete="animationCompleteC"
                ></innovation-molecule-center>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--研究院-->
                    <research-institute></research-institute>
                    <!--技术平台-->
                    <technology-platform></technology-platform>
                    <!--共享设备使用率-->
                    <utilization-rate-of-shared-equipment position="right"></utilization-rate-of-shared-equipment>
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
import {ref, reactive, onMounted, onBeforeUnmount} from "vue"
import mRadar from "@/components/mRadar/index.vue"
import topMenu from "@/components/topMenu/index.vue"
import bottomTray from "@/components/bottomTray/index.vue"
import mLoading from "@/components/mLoading/index.vue"

import gsap from "gsap"
import autofit from "autofit.js"
import AnnualRDInvestment from "@/views/innovationDriven/components/AnnualRDInvestment.vue";
import UtilizationRateOfSharedEquipment from "@/views/innovationDriven/components/UtilizationRateOfSharedEquipment.vue";
import ProgressOfMedicalDeviceApproval from "@/views/innovationDriven/components/progressOfMedicalDeviceApproval.vue";
import ProgressOfNewDrugDevelopment from "@/views/innovationDriven/components/progressOfNewDrugDevelopment.vue";
import InnovationPlatformSupport from "@/views/innovationDriven/components/innovationPlatformSupport.vue";
// 恢复背景组件，但在3D加载完成后才显示
import InnovationDrivenBackground from "@/views/innovationDriven/components/innovationDrivenBackground.vue";
import InnovationMoleculeCenter from "@/views/innovationDriven/components/innovationMoleculeCenter.vue";
import TechnologyCooperation from "@/views/innovationDriven/components/technologyCooperation.vue";
import ResearchInstitute from "@/views/innovationDriven/components/researchInstitute.vue";
import TechnologyPlatform from "@/views/innovationDriven/components/technologyPlatform.vue";

const loadingRef = ref(null)
const centerRef = ref(null)
const backgroundRef = ref(null)
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "left-3",
    // 是否初始化
    init: false
})

// 存储从子组件传递来的yftrTypeData数据
const yftrTypeData = ref('')
// 存储从子组件传递来的technologyData数据
const technologyData = ref('')
// 存储从子组件传递来的drugData数据
const drugData = ref('')
// 存储从子组件传递来的instrumentData数据
const instrumentData = ref('')

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
                centerRef.value.handlePageLoadComplete()
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

// 显示背景和UI元素的动画
function loadOtherComponents() {
    let tl = gsap.timeline({ paused: false })
    let leftCards = gsap.utils.toArray(".left-card")
    let rightCards = gsap.utils.toArray(".right-card")
    let countCards = gsap.utils.toArray(".count-card")
    
    tl.addLabel("start", 0)
    tl.addLabel("menu", 0.5)
    tl.addLabel("card", 1)
    tl.addLabel("countCard", 2)
    tl.addLabel("bottom", 2)
    
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

// 处理从AnnualRDInvestment组件传递来的yftrTypeData数据
function handleYftrTypeData(data) {
    yftrTypeData.value = data
    console.log('接收到的yftrTypeData数据:', data)
}

// 处理从technologyCooperation组件传递来的technologyData数据
function handleTechnologyData(data) {
    technologyData.value = data
    console.log('接收到的technologyData数据:', data)
}

// 处理从progressOfNewDrugDevelopment组件传递来的drugData数据
function handleDrugData(data) {
    drugData.value = data
    console.log('接收到的drugData数据:', data)
}

// 处理从progressOfMedicalDeviceApproval组件传递来的instrumentData数据
function handleInstrumentData(data) {
    instrumentData.value = data
    console.log('接收到的instrumentData数据:', data)
}
</script>

<style lang="scss">
@import "~@/assets/style/home.scss";

/* 整体页面纯黑色背景，无任何装饰 */
.large-screen {
    background: #000000 !important;
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
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
/* 中心组件初始可见，让分子结构作为背景 */
.center-wrap {
    opacity: 1;
    transform: scale(1);
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