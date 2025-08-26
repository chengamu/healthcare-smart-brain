<template>
    <div class="large-screen">
        <livable-ecosystem-background></livable-ecosystem-background>
        <!--“产城人文”融合魔方-->
<!--        <integration-of-industry-and-city></integration-of-industry-and-city>-->
        <div class="large-screen-wrap" id="large-screen">
            <m-header title="绍兴医疗健康产业大脑" sub-text="Shaoxing Medical And Health Industry Community">
                <!--右侧 日期 -->
                <template v-slot:right>
                    <div class="m-header-date">{{ currentTime }}</div>
                </template>
            </m-header>
            <!-- 顶部菜单 -->
            <div class="top-menu">
                <mMenu :default-active="state.activeIndex" @select="handleMenuSelect" large>
                    <mMenuItem index="left-1">总览 · 擘画蓝图</mMenuItem>
                    <mMenuItem index="left-2">聚链 · 产业集群</mMenuItem>
                    <mMenuItem index="left-3">策源 · 创新驱动</mMenuItem>
                    <div class="top-menu-mid-space"></div>
                    <mMenuItem index="right-1">引智 · 人才引擎</mMenuItem>
                    <mMenuItem index="right-2">融合 · 产城生态</mMenuItem>
                    <mMenuItem index="right-3">领航 · 红核强基</mMenuItem>
                </mMenu>
            </div>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">

            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--金融资本助力-->
                    <financial-capital-help></financial-capital-help>
                    <!--智慧城市服务-->
                    <smart-city-service></smart-city-service>
                    <!--关键技术攻坚-->
                    <technological-hurdles-overcome></technological-hurdles-overcome>
                </div>
            </div>
            <!-- 中间布局 -->
            <div class="center-wrap">
                <!--“产城人文”融合魔方-->
                <livable-ecosystem-center></livable-ecosystem-center>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--创新成果转化-->
                    <innovation-result-conversion></innovation-result-conversion>
                    <!--人才公寓使用率-->
                    <talent-apartment-usage-rate></talent-apartment-usage-rate>
                    <!--生活配套完善度（生态建设-生活服务满意度）-->
                    <satisfaction-with-life-services title="生活配套完善度"></satisfaction-with-life-services>
                </div>
            </div>
            <!-- 底部托盘 -->
            <div class="bottom-tray">
                <!-- svg线条动画 -->
                <mSvglineAnimation
                    class="bottom-svg-line-left"
                    :width="721"
                    :height="57"
                    color="#30DCFF"
                    :strokeWidth="2"
                    :dir="[0, 1]"
                    :length="50"
                    path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142"
                ></mSvglineAnimation>
                <mSvglineAnimation
                    class="bottom-svg-line-left bottom-svg-line-right"
                    :width="721"
                    :height="57"
                    color="#30DCFF"
                    :strokeWidth="2"
                    :dir="[0, 1]"
                    :length="50"
                    path="M1 56.6105C1 31.5123 185.586 10.0503 451.904 1.35519C458.942 1.12543 465.781 4.00883 470.505 9.22964L484.991 25.2383C487.971 28.4775 492.938 30.4201 498.254 30.4201H720.142"
                ></mSvglineAnimation>
            </div>
            <!-- 雷达 -->
            <div class="bottom-radar">
                <mRadar></mRadar>
            </div>
            <!-- 左右装饰线 -->
            <div class="large-screen-left-zsline"></div>
            <div class="large-screen-right-zsline"></div>
        </div>

        <!-- loading动画 -->
        <div class="loading">
            <div class="loading-text">
                <span style="--index: 1">L</span>
                <span style="--index: 2">O</span>
                <span style="--index: 3">A</span>
                <span style="--index: 4">D</span>
                <span style="--index: 5">I</span>
                <span style="--index: 6">N</span>
                <span style="--index: 7">G</span>
            </div>
            <div class="loading-progress">
                <span class="value">{{ state.progress }}</span>
                <span class="unit">%</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import {shallowRef, ref, reactive, onMounted, onBeforeUnmount} from "vue"
import mHeader from "@/components/mHeader/index.vue"
import mCountCard from "@/components/mCountCard/index.vue"
import mMenu from "@/components/mMenu/index.vue"
import mRadar from "@/components/mRadar/index.vue"
import mMenuItem from "@/components/mMenuItem/index.vue"
import mSvglineAnimation from "@/components/mSvglineAnimation/index.vue"

import gsap from "gsap"
import autofit from "autofit.js"
import { useCurrentTime } from "@/hooks/useCurrentTime.js"
import { useRouter } from "vue-router"
import SatisfactionWithLifeServices from "@/views/innovationEcosystem/components/SatisfactionWithLifeServices.vue";
import TalentApartmentUsageRate from "@/views/livableEcosystem/components/talentApartmentUsageRate.vue";
import SmartCityService from "@/views/livableEcosystem/components/smartCityService.vue";
import FinancialCapitalHelp from "@/views/innovationEcosystem/components/FinancialCapitalHelp.vue";
import InnovationResultConversion from "@/views/innovationEcosystem/components/InnovationResultConversion.vue";
import TechnologicalHurdlesOvercome from "@/views/innovationEcosystem/components/TechnologicalHurdlesOvercome.vue";
import IntegrationOfIndustryAndCity from "@/views/livableEcosystem/components/integrationOfIndustryAndCity.vue";
import LivableEcosystemBackground from "@/views/livableEcosystem/components/livableEcosystemBackground.vue";
import LivableEcosystemCenter from "@/views/livableEcosystem/components/livableEcosystemCenter.vue";

const { currentTime } = useCurrentTime('YYYY-MM-DD HH:mm:ss')
const router = useRouter()
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "right-2",
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
    simulateLoading()
})

// 模拟加载过程
function simulateLoading() {
    let progress = 0
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1
        if (progress >= 100) {
            progress = 100
            clearInterval(interval)
            hideLoading()
        }
        state.progress = progress
    }, 100)
}

// 隐藏loading
async function hideLoading() {
    return new Promise((resolve, reject) => {
        let tl = gsap.timeline()
        tl.to(".loading-text span", {
            y: "200%",
            opacity: 0,
            ease: "power4.inOut",
            duration: 2,
            stagger: 0.2,
        })
        tl.to(".loading-progress", { opacity: 0, ease: "power4.inOut", duration: 2 }, "<")
        tl.to(
            ".loading",
            {
                opacity: 0,
                ease: "power4.inOut",
                onComplete: () => {
                    resolve()
                },
            },
            "-=1"
        )
        // 加载完成后触发动画
        tl.eventCallback("onComplete", handlePageLoadComplete)
    })
}

function handleMenuSelect(index) {
    if(state.activeIndex !== index) {
        // 根据菜单索引跳转到对应页面
        switch(index) {
            case 'left-1':
                router.push('/grandBlueprint')
                break;
            case 'left-2':
                router.push('/industryCluster')
                break;
            case 'left-3':
                router.push('/innovationDriven')
                break;
            case 'right-1':
                router.push('/talentEngine')
                break;
            case 'right-2':
                router.push('/livableEcosystem')
                break;
            case 'right-3':
                router.push('/redCoreLeadership')
                break;
        }
    }
}

// 页面加载完成
function handlePageLoadComplete() {
    // 触发自定义事件，通知子组件开始动画
    const event1 = new CustomEvent('backgroundLoaded');
    window.dispatchEvent(event1);

    const event2 = new CustomEvent('pageLoaded');
    window.dispatchEvent(event2);

    let tl = gsap.timeline({ paused: false })
    let leftCards = gsap.utils.toArray(".left-card")
    let rightCards = gsap.utils.toArray(".right-card")
    let countCards = gsap.utils.toArray(".count-card")
    tl.addLabel("start", 0.5)
    tl.addLabel("menu", 0.5)
    tl.addLabel("card", 1)
    tl.addLabel("countCard", 3)
    tl.to(".m-header", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "start")
    tl.to(".bottom-tray", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "start")
    tl.to(
        ".top-menu",
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
        },
        "-=1"
    )
    tl.to(".bottom-radar", { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }, "-=2")
    tl.to(leftCards, { x: 0, opacity: 1, stagger: 0.2, duration: 1.5, ease: "power4.out" }, "card")
    tl.to(rightCards, { x: 0, opacity: 1, stagger: 0.2, duration: 1.5, ease: "power4.out" }, "card")
    if(countCards.length > 0) {
        tl.to(
            countCards,
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1.5,
                ease: "power4.out",
            },
            "card"
        )
    }
}
</script>

<style lang="scss">
@import "~@/assets/style/home.scss";
.m-header-weather,
.m-header-date {
    span {
        padding-right: 10px;
        color: #c4f3fe;
        font-size: 14px;
    }
}
.top-menu {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 40px;
    z-index: 3;
    display: flex;
    justify-content: center;
    .top-menu-mid-space {
        width: 800px;
    }
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
.bottom-svg-line-left,
.bottom-svg-line-right {
    position: absolute;
    right: 50%;
    width: 721px;
    height: 57px;
    margin-right: -5px;
    bottom: -21px;
}
.bottom-svg-line-right {
    transform: scaleX(-1);
    left: 50%;
    right: inherit;
    margin-right: inherit;
    margin-left: -5px;
}
/* 初始化动画开始位置 */
.m-header {
    transform: translateY(-100%);
    opacity: 0;
}
.top-menu {
    transform: translateY(-250%);
    opacity: 0;
}
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
.bottom-tray {
    transform: translateY(100%);
    opacity: 0;
}
.bottom-radar {
    transform: translateY(100%);
    opacity: 0;
}
</style>