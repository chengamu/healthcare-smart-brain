<template>
    <div class="large-screen">
        <!-- 地图 -->
        <mapScene ref="mapSceneRef"></mapScene>
        <div class="large-screen-wrap" id="large-screen">
            <m-header title="绍兴医疗健康产业大脑" sub-text="Shaoxing Medical And Health Industry Community">
                <!--右侧 日期 -->
                <template v-slot:right>
                    <div class="m-header-date">{{ currentTime }}</div>
                </template>
            </m-header>
            <!-- 顶部菜单 -->
            <div class="top-menu">
                <mMenu :default-active="state.activeIndex" @select="handleMenuSelect">
                    <mMenuItem index="left-1">产业全景</mMenuItem>
                    <mMenuItem index="left-2">产业联盟</mMenuItem>
                    <div class="top-menu-mid-space"></div>
                    <mMenuItem index="right-1">人才联盟</mMenuItem>
                    <mMenuItem index="right-2">生态建设</mMenuItem>
                </mMenu>
            </div>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">
                <corridor-gauge :current-value="175"></corridor-gauge>
            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--人才联盟构成-->
                    <talent-union-structure></talent-union-structure>
                    <!--人才引进进度-->
                    <talent-introduction-progress></talent-introduction-progress>
                    <!--人才新增趋势-->
                    <talent-new-trend></talent-new-trend>
                </div>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--联盟重点人才-->
                    <key-talent></key-talent>
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
import mapScene from "./map.vue"
import mHeader from "@/components/mHeader/index.vue"
import mMenu from "@/components/mMenu/index.vue"
import mRadar from "@/components/mRadar/index.vue"
import mMenuItem from "@/components/mMenuItem/index.vue"
import mSvglineAnimation from "@/components/mSvglineAnimation/index.vue"

import { Assets } from "./assets.js"
import emitter from "@/utils/emitter"
import gsap from "gsap"
import autofit from "autofit.js"
import { useCurrentTime } from "@/hooks/useCurrentTime.js"
import { useRouter } from "vue-router";
import KeyTalent from "@/views/talentUnion/components/keyTalent.vue";
import TalentUnionStructure from "@/views/talentUnion/components/TalentUnionStructure.vue";
import TalentIntroductionProgress from "@/views/talentUnion/components/TalentIntroductionProgress.vue";
import TalentNewTrend from "@/views/talentUnion/components/TalentNewTrend.vue";
import CorridorGauge from "@/views/industryPanorama/components/CorridorGauge.vue";

const assets = shallowRef(null)
const mapSceneRef = ref(null)
const { currentTime } = useCurrentTime('YYYY-MM-DD HH:mm:ss')
const router = useRouter()
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "right-1",
})
onMounted(() => {
    // 监听地图播放完成，执行事件
    emitter.$on("mapPlayComplete", handleMapPlayComplete)
    // 自动适配
    assets.value = autofit.init({
        dh: 1080,
        dw: 1920,
        el: "#large-screen",
        resize: true,
    })
    // 初始化资源
    initAssets(async () => {
        // 加载地图
        emitter.$emit("loadMap", assets.value)
        // 隐藏loading
        await hideLoading()
        // 播放场景
        mapSceneRef.value.play()
    })
})
onBeforeUnmount(() => {
    emitter.$off("mapPlayComplete", handleMapPlayComplete)
})
// 初始化加载资源
function initAssets(onLoadCallback) {
    assets.value = new Assets()
    // 资源加载进度
    let params = {
        progress: 0,
    }
    assets.value.instance.on("onProgress", (path, itemsLoaded, itemsTotal) => {
        let p = Math.floor((itemsLoaded / itemsTotal) * 100)
        gsap.to(params, {
            progress: p,
            onUpdate: () => {
                state.progress = Math.floor(params.progress)
            },
        })
    })
    // 资源加载完成
    assets.value.instance.on("onLoad", () => {
        onLoadCallback && onLoadCallback()
    })
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
    })
}

function handleMenuSelect(index) {
    if(state.activeIndex !== index) {
        // 根据菜单索引跳转到对应页面
        switch(index) {
            case 'left-1':
                router.push('/industryPanorama')
                break;
            case 'left-2':
                router.push('/industryUnion')
                break;
            case 'right-1':
                router.push('/talentUnion')
                break;
            case 'right-2':
                router.push('/innovationEcosystem')
                break;
        }
    }
}
// 地图开始动画播放完成
function handleMapPlayComplete(noCountCard = false) {
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
    if(!noCountCard) {
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
