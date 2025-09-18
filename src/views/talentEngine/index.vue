<template>
    <div class="large-screen">
        <talent-engine-background ref="backgroundRef" @animationComplete="animationCompleteBg"></talent-engine-background>
        <div class="large-screen-wrap" id="large-screen">
            <!-- 顶部菜单 -->
            <top-menu :active-index="state.activeIndex"></top-menu>
            <!-- 顶部统计卡片 -->
            <div class="top-count-card">
                <!-- <mCountCard v-for="(item, index) in state.totalView" :info="item" :key="index"></mCountCard> -->
            </div>
            <!-- 左边布局 图表 -->
            <div class="left-wrap">
                <div class="left-wrap-3d">
                    <!--人才总量与结构-->
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
                <talent-engine-center3-d :talent-data="state.talentData" ref="centerRef" @animationComplete="animationCompleteC"></talent-engine-center3-d>
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
import {ref, reactive, onMounted} from "vue"
import mCountCard from "@/components/mCountCard/index.vue"
import mRadar from "@/components/mRadar/index.vue"
import topMenu from "@/components/topMenu/index.vue"
import bottomTray from "@/components/bottomTray/index.vue"
import mLoading from "@/components/mLoading/index.vue"

import gsap from "gsap"
import autofit from "autofit.js"
import TalentUnionStructure from "@/views/talentEngine/components/TalentUnionStructure.vue";
import TopExpertIntroductionTarget from "@/views/talentEngine/components/topExpertIntroductionTarget.vue";
import TheGoalOfAttractingAndNurturingYoungTalents
    from "@/views/talentEngine/components/theGoalOfAttractingAndNurturingYoungTalents.vue";
import KeyTalent from "@/views/talentEngine/components/keyTalent.vue";
import TalentNewTrend from "@/views/talentEngine/components/TalentNewTrend.vue";
import TalentEngineBackground from "@/views/talentEngine/components/talentEngineBackground.vue";
import TalentEngineCenter3D from "@/views/talentEngine/components/talentEngineCenter3D.vue";
import {listEnterpriseAll, listTalentAll} from '@/api/brain.js'
import {listDictData} from "@/api/system.js";
import MedicalFieldTalentDistribution from "@/views/talentEngine/components/medicalFieldTalentDistribution.vue";

const loadingRef = ref(null)
const centerRef = ref(null)
const backgroundRef = ref(null)
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
    // 是否初始化
    init: false
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
    // simulateLoading()

    // 背景动画开启
    state.init = true
    animationStartBg()
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