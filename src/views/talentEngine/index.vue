<template>
    <div class="large-screen">
        <talent-engine-background></talent-engine-background>
        <!--三级人才联通-->
<!--        <third-level-talent-connectivity></third-level-talent-connectivity>-->
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
                <mCountCard v-for="(item, index) in state.totalView" :info="item" :key="index"></mCountCard>
            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--人才总量与结构（人才联盟-人才联盟构成）-->
                    <!-- <enhanced-talent-overview 
                        title="人才总量与结构" 
                        :talent-data="state.talentData">
                    </enhanced-talent-overview> -->
                    <talent-union-structure
                        title="人才总量与结构" 
                        :talent-data="state.talentData">
                    </talent-union-structure>
                    <!--顶尖专家引进目标-->
                    <top-expert-introduction-target 
                        :talent-data="state.talentData">
                    </top-expert-introduction-target>
                    <!--青年人才引育目标-->
                    <the-goal-of-attracting-and-nurturing-young-talents 
                        :talent-data="state.talentData">
                    </the-goal-of-attracting-and-nurturing-young-talents>
                </div>
            </div>
            <!-- 中间布局 -->
            <div class="center-wrap">
                <!--三级人才联通-->
                <talent-engine-center3-d :talent-data="state.talentData"></talent-engine-center3-d>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--领军人才名录（人才联盟-联盟重点人才）-->
                    <key-talent 
                        title="领军人才名录" 
                        :height="272" 
                        :talent-data="state.talentData">
                    </key-talent>
                    <!--医疗领域人才TOP5-->
<!--                    <medical-field-talent-top5 -->
<!--                        :talent-data="state.talentData">-->
<!--                    </medical-field-talent-top5>-->
                    <!--医疗领域人才分布-->
                    <medical-field-talent-distribution
                        :talent-data="state.talentData">
                    </medical-field-talent-distribution>
                    <!--人才新增趋势-->
                    <talent-new-trend 
                        position="right" 
                        :talent-data="state.talentData">
                    </talent-new-trend>
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
import {shallowRef, ref, reactive, onMounted, onBeforeUnmount, nextTick} from "vue"
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
import EnhancedTalentOverview from "@/views/talentEngine/components/enhancedTalentOverview.vue";
import TalentUnionStructure from "@/views/talentUnion/components/TalentUnionStructure.vue";
import TopExpertIntroductionTarget from "@/views/talentEngine/components/topExpertIntroductionTarget.vue";
import TheGoalOfAttractingAndNurturingYoungTalents
    from "@/views/talentEngine/components/theGoalOfAttractingAndNurturingYoungTalents.vue";
import KeyTalent from "@/views/talentUnion/components/keyTalent.vue";
import TalentNewTrend from "@/views/talentUnion/components/TalentNewTrend.vue";
import MedicalFieldTalentTop5 from "@/views/talentEngine/components/medicalFieldTalentTop5.vue";
import ThirdLevelTalentConnectivity from "@/views/talentEngine/components/thirdLevelTalentConnectivity.vue";
import TalentEngineBackground from "@/views/talentEngine/components/talentEngineBackground.vue";
import TalentEngineCenter3D from "@/views/talentEngine/components/talentEngineCenter3D.vue";
import {listEnterpriseAll, listTalentAll} from '@/api/brain.js'
import {listDictData} from "@/api/system.js";
import MedicalFieldTalentDistribution from "@/views/talentEngine/components/medicalFieldTalentDistribution.vue";

const { currentTime } = useCurrentTime('YYYY-MM-DD HH:mm:ss')
const router = useRouter()
const state = reactive({
    // 进度
    progress: 0,
    // 当前顶部导航索引
    activeIndex: "right-1",
    // 卡片统计数据
    totalView: [
        {
            icon: "zongxiaoliang",
            zh: "专家院士",
            en: "Expert Academician",
            value: 3,
            unit: "位",
        },
        {
            icon: "xiaoshoujine",
            zh: "医疗领域",
            en: "Medical Field",
            value: 20,
            unit: "多个",
        },
        {
            icon: "zongxiaoliang",
            zh: "人才专家",
            en: "Talent Experts",
            value: 43,
            unit: "名",
        },
    ],
    // 人才数据
    talentData: [],
})

const enterpriseList = ref([])
const dictList = ref([{
    name: 'brain_talent_type', data: []
}])
onMounted(() => {
    init()
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

async function init() {
    await getListEnterpriseAll()
    await getListDictData('brain_talent_type', 0)
    await getListTalentAll()
}

const getListDictData = async (dictName, index) => {
    try {
        const response = await listDictData(dictName)
        let data = response.data.map((item, index) => {
            return {
                label: item.dictLabel,
                value: item.dictValue
            }
        });
        dictList.value[index].data = data
    } catch (error) {
        console.error('获取企业类别数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
};

async function getListEnterpriseAll() {
    try {
        const response = await listEnterpriseAll()
        enterpriseList.value = response
    } catch (error) {
        console.error('获取企业列表数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

async function getListTalentAll() {
    try {
        const response = await listTalentAll()
        // 根据position字段中是否包含"院士"来计算"专家院士"数量
        const expertAcademicianCount = response.filter(item => item.position && item.position.includes('院士')).length
        // 根据数据长度计算"人才专家"数量
        const talentExpertCount = response.length
        
        // 更新统计数据
        state.totalView[0].value = expertAcademicianCount
        state.totalView[2].value = talentExpertCount
        
        // 保存人才数据供子组件使用
        state.talentData = response.map(item => {
            return {
                ...item,
                typeName: dictList.value[0].data.find(type => type.value === item.type)?.label,
                enterpriseName: enterpriseList.value.find(enterprise => enterprise.id === item.enterpriseId)?.name,
            }
        })
    } catch (error) {
        console.error('获取人才数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

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