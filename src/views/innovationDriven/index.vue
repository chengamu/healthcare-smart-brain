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
                    <!--研发投入(R&D)增长（产业联盟-年R&D投入）-->
                    <annual-r-d-investment 
                        title="研发投入(R&D)增长" 
                        @update:yftrTypeData="handleYftrTypeData">
                    </annual-r-d-investment>
                    <!--创新平台支撑-->
                    <innovation-platform-support></innovation-platform-support>
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
                    :drug-value="drugValue"
                    ref="centerRef"
                    @animationComplete="animationCompleteC"
                ></innovation-molecule-center>
                
                <!-- 顶部数据大屏展示 -->
                <div class="top-data-dashboard">
                    <div class="dashboard-header">
                        <div class="title-section">
                            <div class="main-title">创新生态分子结构</div>
                            <div class="sub-title">绍兴医疗健康产业创新网络可视化</div>
                        </div>
                    </div>
                    
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-icon">⚡</div>
                            <div class="metric-content">
                                <div class="metric-label">研发投入核心</div>
                                <div class="metric-value">{{ yftrTypeData }}<span class="unit">亿元</span></div>
                                <!-- <div class="metric-trend">同比增长 12.5%</div> -->
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">💊</div>
                            <div class="metric-content">
                                <div class="metric-label">一类新药研发</div>
                                <div class="metric-value">{{ drugData }}<span class="unit">个</span></div>
                                <!-- <div class="metric-trend">在研项目 15 个</div> -->
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">🏥</div>
                            <div class="metric-content">
                                <div class="metric-label">医疗器械器械</div>
                                <div class="metric-value">{{ instrumentData }}<span class="unit">个</span></div>
                                <!-- <div class="metric-trend">二三类器械产品</div> -->
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <div class="metric-icon">🤝</div>
                            <div class="metric-content">
                                <div class="metric-label">技术合作网络</div>
                                <div class="metric-value">{{ technologyData }}<span class="unit">项</span></div>
                                <!-- <div class="metric-trend">涉及企业 28 家</div> -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 底部元素类型说明 -->
                <div class="bottom-molecule-legend">
                    <div class="legend-title">元素类型说明</div>
                    <div class="legend-elements">
                        <div class="element-item">
                            <div class="element-atom core">C</div>
                            <span>研发核心</span>
                        </div>
                        <div class="element-item">
                            <div class="element-atom platform">N</div>
                            <span>创新平台</span>
                        </div>
                        <div class="element-item">
                            <div class="element-atom tech">S</div>
                            <span>技术网络</span>
                        </div>
                        <div class="element-item">
                            <div class="element-atom drug">Au</div>
                            <span>新药研发</span>
                        </div>
                        <div class="element-item">
                            <div class="element-atom device">Fe</div>
                            <span>医疗器械</span>
                        </div>
                        <div class="element-item">
                            <div class="element-atom support">K</div>
                            <span>支撑设施</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右边布局 图表 -->
            <div class="right-wrap">
                <div class="right-wrap-3d">
                    <!--一类新药研发进度-->
                    <progress-of-new-drug-development @update:drugData="handleDrugData"></progress-of-new-drug-development>
                    <!--医疗器械获批进度-->
                    <progress-of-medical-device-approval @update:instrumentData="handleInstrumentData"></progress-of-medical-device-approval>
                    <!--共享设备使用率（生态建设-共享设备使用率）-->
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
import AnnualRDInvestment from "@/views/industryUnion/components/AnnualRDInvestment.vue";
import UtilizationRateOfSharedEquipment from "@/views/industryPanorama/components/UtilizationRateOfSharedEquipment.vue";
import ProgressOfMedicalDeviceApproval from "@/views/innovationDriven/components/progressOfMedicalDeviceApproval.vue";
import ProgressOfNewDrugDevelopment from "@/views/innovationDriven/components/progressOfNewDrugDevelopment.vue";
import InnovationPlatformSupport from "@/views/innovationDriven/components/innovationPlatformSupport.vue";
// 恢复背景组件，但在3D加载完成后才显示
import InnovationDrivenBackground from "@/views/innovationDriven/components/innovationDrivenBackground.vue";
import InnovationMoleculeCenter from "@/views/innovationDriven/components/innovationMoleculeCenter.vue";
import TechnologyCooperation from "@/views/innovationDriven/components/technologyCooperation.vue";

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
    tl.to(".bottom-molecule-legend", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out"
    }, "bottom")
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
/* 数据面板样式 */
.top-data-dashboard {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1400px;
    background: linear-gradient(135deg, 
        rgba(0, 0, 0, 0.85) 0%, 
        rgba(48, 220, 255, 0.08) 50%,
        rgba(0, 0, 0, 0.85) 100%);
    border: 2px solid rgba(48, 220, 255, 0.4);
    border-radius: 16px;
    padding: 24px 32px;
    backdrop-filter: blur(20px);
    box-shadow: 
        0 8px 32px rgba(48, 220, 255, 0.2),
        0 0 60px rgba(48, 220, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    z-index: 10;
    opacity: 0;
    transform: translateX(-50%) translateY(-100px);
    
    .dashboard-header {
        text-align: center;
        margin-bottom: 24px;
        
        .title-section {
            .main-title {
                font-size: 28px;
                font-weight: bold;
                color: #30DCFF;
                text-shadow: 
                    0 0 20px rgba(48, 220, 255, 0.8),
                    0 0 40px rgba(48, 220, 255, 0.4);
                margin-bottom: 8px;
                letter-spacing: 2px;
            }
            
            .sub-title {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 300;
            }
        }
    }
    
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        
        .metric-card {
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.03) 0%, 
                rgba(48, 220, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.03) 100%);
            border: 1px solid rgba(48, 220, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            position: relative;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            
            &:hover {
                transform: translateY(-2px);
                border-color: rgba(48, 220, 255, 0.4);
                box-shadow: 0 8px 25px rgba(48, 220, 255, 0.15);
            }
            
            &.primary {
                background: linear-gradient(135deg, 
                    rgba(48, 220, 255, 0.15) 0%, 
                    rgba(48, 220, 255, 0.08) 50%,
                    rgba(48, 220, 255, 0.15) 100%);
                border-color: rgba(48, 220, 255, 0.4);
                
                .metric-value {
                    font-size: 36px !important;
                    color: #30DCFF !important;
                }
            }
            
            .metric-icon {
                font-size: 24px;
                margin-bottom: 12px;
                opacity: 0.8;
            }
            
            .metric-content {
                .metric-label {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                
                .metric-value {
                    font-size: 28px;
                    font-weight: bold;
                    color: #30DCFF;
                    text-shadow: 0 0 15px rgba(48, 220, 255, 0.5);
                    margin-bottom: 6px;
                    
                    .unit {
                        font-size: 14px;
                        color: #00FF88;
                        margin-left: 4px;
                        font-weight: normal;
                    }
                }
                
                .metric-trend {
                    font-size: 12px;
                    color: rgba(0, 255, 136, 0.8);
                    font-weight: 400;
                }
            }
        }
    }
}

/* 底部元素说明 */
.bottom-molecule-legend {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, 
        rgba(0, 0, 0, 0.9) 0%, 
        rgba(0, 255, 136, 0.08) 50%,
        rgba(0, 0, 0, 0.9) 100%);
    border: 2px solid rgba(0, 255, 136, 0.3);
    border-radius: 16px;
    padding: 16px 32px;
    backdrop-filter: blur(15px);
    box-shadow: 0 6px 24px rgba(0, 255, 136, 0.15);
    z-index: 10;
    opacity: 0;
    transform: translateX(-50%) translateY(100px);
    
    .legend-title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #00FF88;
        margin-bottom: 16px;
        text-shadow: 0 0 12px rgba(0, 255, 136, 0.6);
    }
    
    .legend-elements {
        display: flex;
        gap: 32px;
        align-items: center;
        
        .element-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            
            .element-atom {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                font-family: 'Consolas', monospace;
                margin-bottom: 8px;
                text-shadow: 0 0 10px currentColor;
                
                &.core {
                    background: linear-gradient(135deg, #30DCFF, #1a8cff);
                    color: white;
                    box-shadow: 0 0 20px rgba(48, 220, 255, 0.6);
                }
                
                &.platform {
                    background: linear-gradient(135deg, #00FF88, #00cc6a);
                    color: white;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
                }
                
                &.tech {
                    background: linear-gradient(135deg, #8B5CF6, #6d28d9);
                    color: white;
                    box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
                }
                
                &.drug {
                    background: linear-gradient(135deg, #FFD700, #f59e0b);
                    color: #000;
                    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
                }
                
                &.device {
                    background: linear-gradient(135deg, #FF6B6B, #ef4444);
                    color: white;
                    box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
                }
                
                &.support {
                    background: linear-gradient(135deg, #4ECDC4, #06b6d4);
                    color: white;
                    box-shadow: 0 0 20px rgba(78, 205, 196, 0.6);
                }
            }
            
            span {
                font-size: 11px;
                text-align: center;
                white-space: nowrap;
            }
        }
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