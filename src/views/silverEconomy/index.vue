<template>
    <div class="large-screen">
        <!-- 地图 -->
        <mapScene ref="mapSceneRef" type="silverEconomy"></mapScene>
        <div class="large-screen-wrap" id="large-screen">
            <!-- 顶部菜单 -->
            <top-menu :active-index="state.activeIndex" :right-menu-items="[]" :left-menu-items="[]"></top-menu>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">

            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!-- 总体建设目标 -->
                    <overall-construction-objectives></overall-construction-objectives>
                    <!-- 现有能力平台 -->
                    <existing-ability-platform></existing-ability-platform>
                    <!-- 领域重点企业 -->
                    <domain-key-enterprise></domain-key-enterprise>
                </div>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!-- 建设内容台账 -->
                    <construction-content-ledger></construction-content-ledger>
                    <!-- 要素资源保障 -->
                    <elemental-resources-guarantee></elemental-resources-guarantee>
                    <!-- 生命健康产业链 -->
                    <life-health-industry-chain></life-health-industry-chain>
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
        <mLoading ref="loadingRef" :progress="state.progress"></mLoading>
    </div>
</template>
<script setup>
import {shallowRef, ref, reactive, onMounted, onBeforeUnmount} from "vue"
import mapScene from "@/views/gdMap/map.vue"
import mRadar from "@/components/mRadar/index.vue"
import topMenu from "@/components/topMenu/index.vue"
import bottomTray from "@/components/bottomTray/index.vue"

import { Assets } from "@/views/gdMap/assets.js"
import emitter from "@/utils/emitter"
import gsap from "gsap"
import autofit from "autofit.js"
import mLoading from "@/components/mLoading/index.vue";
import OverallConstructionObjectives from "@/views/silverEconomy/components/overallConstructionObjectives.vue";
import ExistingAbilityPlatform from "@/views/silverEconomy/components/existingAbilityPlatform.vue";
import DomainKeyEnterprise from "@/views/silverEconomy/components/domainKeyEnterprise.vue";
import ConstructionContentLedger from "@/views/silverEconomy/components/constructionContentLedger.vue";
import ElementalResourcesGuarantee from "@/views/silverEconomy/components/elementalResourcesGuarantee.vue";
import LifeHealthIndustryChain from "@/views/silverEconomy/components/lifeHealthIndustryChain.vue";

const assets = shallowRef(null)
const mapSceneRef = ref(null)
const loadingRef = ref(null)
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "left-1",
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
    if (loadingRef.value) {
        return await loadingRef.value.hide()
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
