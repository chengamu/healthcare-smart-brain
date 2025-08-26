<template>
    <div class="large-screen">
        <!-- 地图 -->
        <mapScene ref="mapSceneRef" show-enterprise show-park></mapScene>
        <div class="large-screen-wrap" id="large-screen">
            <m-header title="绍兴医疗健康产业大脑" sub-text="Shaoxing Medical And Health Industry Community">
                <!--左侧 天气 -->
                <template v-slot:left>
                    <!--          <div class="m-header-weather"><span>小雨</span><span>27℃</span></div>-->
                </template>
                <!--右侧 日期 -->
                <template v-slot:right>
                    <div class="m-header-date">{{ currentTime }}</div>
                </template>
            </m-header>
            <!-- 顶部菜单 -->
            <div class="top-menu">
                <mMenu :default-active="state.activeIndex" @select="handleMenuSelect">
                    <mMenuItem index="1">产业全景</mMenuItem>
                    <mMenuItem index="2">产业联盟</mMenuItem>
                    <!--          <mMenuItem index="3">导航栏</mMenuItem>-->
                    <div class="top-menu-mid-space"></div>
                    <mMenuItem index="4">人才联盟</mMenuItem>
                    <mMenuItem index="5">生态建设</mMenuItem>
                    <!--          <mMenuItem index="6">导航栏</mMenuItem>-->
                </mMenu>
            </div>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">
                <corridor-gauge :current-value="175"></corridor-gauge>
                <!--        <mCountCard v-for="(item, index) in state.totalView" :info="item" :key="index"></mCountCard>-->
            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div v-if="state.activeIndex === '1'" class="left-wrap-3d">
                    <!--产业联盟构成-->
                    <industry-union></industry-union>
                    <!--人才联盟概况-->
                    <talent-union></talent-union>
                    <!--共享设备使用率-->
                    <utilization-rate-of-shared-equipment></utilization-rate-of-shared-equipment>
                </div>
                <div v-if="state.activeIndex === '2'" class="left-wrap-3d">
                    <!--产业链群发展-->
                    <industry-union-development></industry-union-development>
                    <!--项目引进情况-->
                    <project-introduction></project-introduction>
                    <!--年R&D投入-->
                    <annual-r-d-investment></annual-r-d-investment>
                </div>
                <div v-if="state.activeIndex === '4'" class="left-wrap-3d">
                    <!--人才联盟构成-->
                    <talent-union-structure></talent-union-structure>
                    <!--人才引进进度-->
                    <talent-introduction-progress></talent-introduction-progress>
                    <!--人才新增趋势-->
                    <talent-new-trend></talent-new-trend>
                </div>
                <div v-if="state.activeIndex === '5'" class="left-wrap-3d">
                    <!--金融资本助力-->
                    <financial-capital-help></financial-capital-help>
                    <!--关键技术攻坚-->
                    <technological-hurdles-overcome></technological-hurdles-overcome>
                    <!--医企合作项目-->
                    <medical-enterprise-cooperation-project></medical-enterprise-cooperation-project>
                </div>
                <!--        <div class="left-wrap-3d">-->
                <!--          &lt;!&ndash; 大宗商品销售额 &ndash;&gt;-->
                <!--          <BulkCommoditySalesChart></BulkCommoditySalesChart>-->
                <!--          &lt;!&ndash; 年度经济增长点 &ndash;&gt;-->
                <!--          <YearlyEconomyTrend></YearlyEconomyTrend>-->
                <!--          &lt;!&ndash; 近年经济情况 &ndash;&gt;-->
                <!--          <EconomicTrendChart></EconomicTrendChart>-->
                <!--          &lt;!&ndash; 各区经济收益 &ndash;&gt;-->
                <!--          <DistrictEconomicIncome></DistrictEconomicIncome>-->
                <!--        </div>-->
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div v-if="state.activeIndex === '1'" class="right-wrap-3d">
                    <!--强链补链进度-->
                    <strong-chain-supply-chain-progress></strong-chain-supply-chain-progress>
                    <!--新药/器械获批进度-->
                    <new-drugs-approval-progress></new-drugs-approval-progress>
                    <!--高新企业增长-->
                    <high-tech-enterprise-growth></high-tech-enterprise-growth>
                </div>
                <div v-if="state.activeIndex === '2'" class="right-wrap-3d">
                    <!--联盟重点企业-->
                    <key-enterprise></key-enterprise>
                </div>
                <div v-if="state.activeIndex === '4'" class="right-wrap-3d">
                    <!--联盟重点人才-->
                    <key-talent></key-talent>
                </div>
                <div v-if="state.activeIndex === '5'" class="right-wrap-3d">
                    <!--创新成果转化-->
                    <innovation-result-conversion></innovation-result-conversion>
                    <!--专项政策支持-->
                    <special-policy-support></special-policy-support>
                    <!--生活服务满意度-->
                    <satisfaction-with-life-services></satisfaction-with-life-services>
                </div>
                <!--        <div class="right-wrap-3d">-->
                <!--          &lt;!&ndash; 专项资金用途 &ndash;&gt;-->
                <!--          <PurposeSpecialFunds> </PurposeSpecialFunds>-->
                <!--          &lt;!&ndash; 人群消费占比 &ndash;&gt;-->
                <!--          <ProportionPopulationConsumption></ProportionPopulationConsumption>-->
                <!--          &lt;!&ndash; 用电情况 &ndash;&gt;-->
                <!--          <ElectricityUsage></ElectricityUsage>-->
                <!--          &lt;!&ndash; 各季度增长情况 &ndash;&gt;-->
                <!--          <QuarterlyGrowthSituation></QuarterlyGrowthSituation>-->
                <!--        </div>-->
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
                <!--        &lt;!&ndash; 做箭头 &ndash;&gt;-->
                <!--        <div class="bottom-tray-arrow">-->
                <!--          <img src="@/assets/images/bottom-menu-arrow-big.svg" alt="" />-->
                <!--          <img src="@/assets/images/bottom-menu-arrow-small.svg" alt="" />-->
                <!--        </div>-->
                <!--        &lt;!&ndash; 底部菜单 &ndash;&gt;-->
                <!--        <div class="bottom-menu">-->
                <!--          <div class="bottom-menu-item is-active"><span>人口概览</span></div>-->
                <!--          <div class="bottom-menu-item"><span>小标题</span></div>-->
                <!--          <div class="bottom-menu-item"><span>小标题</span></div>-->
                <!--          <div class="bottom-menu-item"><span>小标题</span></div>-->
                <!--        </div>-->
                <!--        &lt;!&ndash; 右箭头 &ndash;&gt;-->
                <!--        <div class="bottom-tray-arrow is-reverse">-->
                <!--          <img src="@/assets/images/bottom-menu-arrow-big.svg" alt="" />-->
                <!--          <img src="@/assets/images/bottom-menu-arrow-small.svg" alt="" />-->
                <!--        </div>-->
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
import {shallowRef, ref, reactive, onMounted, onBeforeUnmount, nextTick} from "vue"
import mapScene from "./map.vue"
import mHeader from "@/components/mHeader/index.vue"
import mCountCard from "@/components/mCountCard/index.vue"
import mMenu from "@/components/mMenu/index.vue"
import mRadar from "@/components/mRadar/index.vue"
import mMenuItem from "@/components/mMenuItem/index.vue"
import mSvglineAnimation from "@/components/mSvglineAnimation/index.vue"
import BulkCommoditySalesChart from "./components/BulkCommoditySalesChart.vue"
import YearlyEconomyTrend from "./components/YearlyEconomyTrend.vue"
import EconomicTrendChart from "./components/EconomicTrendChart.vue"
import DistrictEconomicIncome from "./components/DistrictEconomicIncome.vue"
import PurposeSpecialFunds from "./components/PurposeSpecialFunds.vue"
import ProportionPopulationConsumption from "./components/ProportionPopulationConsumption.vue"
import ElectricityUsage from "./components/ElectricityUsage.vue"
import QuarterlyGrowthSituation from "./components/QuarterlyGrowthSituation.vue"

import { Assets } from "./assets.js"
import emitter from "@/utils/emitter"
import gsap from "gsap"
import autofit from "autofit.js"
import { useCurrentTime } from "@/hooks/useCurrentTime.js"
import IndustryUnion from "@/views/industryPanorama/components/IndustryUnion.vue";
import TalentUnion from "@/views/industryPanorama/components/TalentUnion.vue";
import FinancialCapitalHelp from "@/views/innovationEcosystem/components/FinancialCapitalHelp.vue";
import UtilizationRateOfSharedEquipment
    from "@/views/industryPanorama/components/UtilizationRateOfSharedEquipment.vue";
import StrongChainSupplyChainProgress
    from "@/views/industryPanorama/components/StrongChainSupplyChainProgress.vue";
import NewDrugsApprovalProgress from "@/views/industryPanorama/components/NewDrugsApprovalProgress.vue";
import HighTechEnterpriseGrowth from "@/views/industryPanorama/components/HighTechEnterpriseGrowth.vue";
import SatisfactionWithLifeServices from "@/views/innovationEcosystem/components/SatisfactionWithLifeServices.vue";
import KeyEnterprise from "@/views/industryUnion/components/KeyEnterprise.vue";
import IndustryUnionDevelopment from "@/views/industryUnion/components/IndustryUnionDevelopment.vue";
import ProjectIntroduction from "@/views/industryUnion/components/ProjectIntroduction.vue";
import AnnualRDInvestment from "@/views/industryUnion/components/AnnualRDInvestment.vue";
import KeyTalent from "@/views/talentUnion/components/keyTalent.vue";
import TalentUnionStructure from "@/views/talentUnion/components/TalentUnionStructure.vue";
import TalentIntroductionProgress from "@/views/talentUnion/components/TalentIntroductionProgress.vue";
import TalentNewTrend from "@/views/talentUnion/components/TalentNewTrend.vue";
import TechnologicalHurdlesOvercome
    from "@/views/innovationEcosystem/components/TechnologicalHurdlesOvercome.vue";
import MedicalEnterpriseCooperationProject
    from "@/views/innovationEcosystem/components/MedicalEnterpriseCooperationProject.vue";
import InnovationResultConversion from "@/views/innovationEcosystem/components/InnovationResultConversion.vue";
import SpecialPolicySupport from "@/views/innovationEcosystem/components/SpecialPolicySupport.vue";
import CorridorGauge from "@/views/industryPanorama/components/CorridorGauge.vue";

const assets = shallowRef(null)
const mapSceneRef = ref(null)
const { currentTime } = useCurrentTime('YYYY-MM-DD HH:mm:ss')
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "1",
    // 卡片统计数据
    totalView: [
        {
            icon: "xiaoshoujine",
            zh: "2024年生产总值",
            en: "Gross Domestic Product in 2024",
            value: 128.5,
            unit: "亿元",
        },
        {
            icon: "zongxiaoliang",
            zh: "产业联盟成员数",
            en: "industrial alliance",
            value: 37,
            unit: "家",
        },
        {
            icon: "zongxiaoliang",
            zh: "人才联盟成员数",
            en: "talent alliance",
            value: 43,
            unit: "人",
        },
    ],
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
    state.activeIndex = index
    // 如果切换回产业全景，重新触发动画
    nextTick(() => {
        handleMapPlayComplete(true)
    })
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
