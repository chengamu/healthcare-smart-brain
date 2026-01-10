<template>
    <m-header title="银发经济生命健康产业社区智慧大脑" sub-text="The Silver Economy Life And Health Industry Community">
        <!--右侧 日期 -->
        <template v-slot:right>
            <div class="m-header-date">{{ currentTime }}</div>
        </template>
    </m-header>
    
    <!-- 顶部菜单 - 非首页模式 -->
    <div class="top-menu" :class="{isIndex: isIndex}" v-if="!isIndex">
        <mMenu :default-active="activeIndex" @select="handleMenuSelect" large>
            <div
                v-for="item in leftMenuItems"
                :key="item.index"
                class="menu-item-wrapper"
                @mouseenter="() => showTooltip(item.index)"
                @mouseleave="hideTooltip"
            >
                <mMenuItem :index="item.index">
                    {{ item.title }}
                </mMenuItem>
                <div
                    class="menu-tooltip"
                    :class="{ visible: tooltipVisible === item.index }"
                >
                    {{ item.description }}
                </div>
            </div>
            <div class="top-menu-mid-space"></div>
            <div
                v-for="item in rightMenuItems"
                :key="item.index"
                class="menu-item-wrapper"
                @mouseenter="() => showTooltip(item.index)"
                @mouseleave="hideTooltip"
            >
                <mMenuItem :index="item.index">
                    {{ item.title }}
                </mMenuItem>
                <div
                    class="menu-tooltip"
                    :class="{ visible: tooltipVisible === item.index }"
                >
                    {{ item.description }}
                </div>
            </div>
        </mMenu>
    </div>
    
    <!-- 全屏菜单 - 首页模式 -->
    <div class="fullscreen-menu" v-if="isIndex">
        <div class="menu-grid">
            <div 
                v-for="item in allMenuItems" 
                :key="item.index" 
                class="menu-card"
                :class="{ active: activeIndex === item.index }"
                @click="handleMenuSelect(item.index)"
            >
                <div class="menu-card-content">
                    <div class="menu-card-icon">{{ item.icon }}</div>
                    <div class="menu-card-title">{{ item.title }}</div>
                    <div class="menu-card-subtitle">{{ item.subtitle }}</div>
                    <div class="menu-card-description">{{ item.description }}</div>
                </div>
                <div class="menu-card-glow"></div>
            </div>
        </div>
        
        <!-- 悬停提示 -->
        <div 
            class="fullscreen-tooltip" 
            :class="{ visible: tooltipVisible }"
        >
            {{ getCurrentTooltipContent() }}
        </div>
    </div>
</template>

<script setup>
import mHeader from "@/components/mHeader/index.vue"
import mMenu from "@/components/mMenu/index.vue"
import mMenuItem from "@/components/mMenuItem/index.vue"
import { useCurrentTime } from "@/hooks/useCurrentTime.js"
import { useRouter } from "vue-router"
import { ref } from "vue"

const { currentTime } = useCurrentTime('YYYY-MM-DD HH:mm:ss')
const router = useRouter()

// 悬停提示显示状态
const tooltipVisible = ref(null)

const props = defineProps({
    activeIndex: {
        type: String,
        default: ''
    },
    isIndex: {
        type: Boolean,
        default: false
    },
    leftMenuItems: {
        type: Array,
        default: () => [
            { 
                index: 'left-1', 
                title: '总览 · 擘画蓝图',
                subtitle: '产业发展蓝图',
                icon: '🎨',
                description: '🎨 展示银发经济生命健康产业发展的整体规划与战略蓝图，包含产业布局、发展目标和核心指标'
            },
            { 
                index: 'left-2', 
                title: '聚链 · 产业集群',
                subtitle: '产业生态圈',
                icon: '🌐',
                description: '🌐 聚焦产业链上下游企业集聚发展，打造生命健康产业生态圈和创新集群'
            },
            { 
                index: 'left-3', 
                title: '策源 · 创新驱动',
                subtitle: '科技创新引擎',
                icon: '🚀',
                description: '🚀 以科技创新为核心驱动力，推动生命健康产业发展'
            }
        ]
    },
    rightMenuItems: {
        type: Array,
        default: () => [
            { 
                index: 'right-1', 
                title: '引智 · 人才引擎',
                subtitle: '人才发展体系',
                icon: '🎆',
                description: '🎆 汇聚高端医疗健康人才，构建人才引进、培养和激励机制'
            },
            { 
                index: 'right-2', 
                title: '融合 · 产城生态',
                subtitle: '产城融合发展',
                icon: '🌳',
                description: '🌳 推进产业与城市融合发展，打造宜居宜业的生命健康产业生态环境'
            },
            { 
                index: 'right-3', 
                title: '领航 · 红核强基',
                subtitle: '党建引领保障',
                icon: '⭐',
                description: '⭐ 发挥党建引领作用，夯实生命健康产业发展的组织基础和政治保障'
            }
        ]
    },
})

// 合并所有菜单项用于全屏展示
const allMenuItems = [...props.leftMenuItems, ...props.rightMenuItems]

// 显示提示
function showTooltip(index) {
    tooltipVisible.value = index
}

// 隐藏提示
function hideTooltip() {
    tooltipVisible.value = null
}

// 获取当前悬停提示内容
function getCurrentTooltipContent() {
    if (!tooltipVisible.value) return ''
    const item = allMenuItems.find(item => item.index === tooltipVisible.value)
    return item?.description || ''
}

function handleMenuSelect(index) {
    console.log('点击菜单项:', index); // 调试信息
    if(props.activeIndex !== index) {
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

/* 非首页模式的顶部菜单 */
.top-menu {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 40px;
    z-index: 5;
    display: flex;
    justify-content: center;
    transform: translateY(-250%);
    opacity: 0;
    
    .top-menu-mid-space {
        width: 800px;
    }
}

/* 菜单项包装器 */
.menu-item-wrapper {
    position: relative;
    display: inline-block;
}

/* 悬停提示样式 */
.menu-tooltip {
    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, 
        rgba(15, 23, 42, 0.95) 0%, 
        rgba(30, 41, 59, 0.98) 50%, 
        rgba(15, 23, 42, 0.95) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #e2e8f0;
    padding: 20px 32px 24px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.7;
    min-width: 320px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    z-index: 9999;
    
    /* 发光边框效果 */
    box-shadow: 
        0 0 0 1px rgba(59, 130, 246, 0.2),
        0 4px 32px rgba(59, 130, 246, 0.15),
        0 8px 64px rgba(30, 58, 138, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    /* 顶部装饰线 */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.8) 50%, 
            transparent 100%);
        border-radius: 1.5px;
    }
    
    /* 底部装饰点 */
    &::after {
        content: '';
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 5px;
        height: 5px;
        background: rgba(59, 130, 246, 0.6);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
    }
    
    /* 显示状态 */
    &.visible {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-4px);
        animation: tooltipGlow 2s ease-in-out infinite alternate;
    }
}

/* 发光动画 */
@keyframes tooltipGlow {
    0% {
        box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.2),
            0 4px 32px rgba(59, 130, 246, 0.15),
            0 8px 64px rgba(30, 58, 138, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    100% {
        box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.4),
            0 4px 32px rgba(59, 130, 246, 0.25),
            0 8px 64px rgba(30, 58, 138, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
}

.m-header {
    transform: translateY(-100%);
    opacity: 0;
}

/* 全屏菜单样式 */
.fullscreen-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* 去掉背景色 */
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    
    /* 初始状态，为 GSAP 动画做准备 */
    opacity: 0;
    transform: scale(0.9);
    filter: blur(10px);
    
    /* 去掉背景装饰 */
    &::before {
        display: none;
    }
}

/* 菜单网格 */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    max-width: 1200px;
    width: 100%;
    position: relative;
    z-index: 2;
}

/* 菜单卡片 */
.menu-card {
    position: relative;
    background: linear-gradient(
        135deg,
        rgba(15, 23, 42, 0.4) 0%,
        rgba(30, 41, 59, 0.5) 50%,
        rgba(15, 23, 42, 0.4) 100%
    );
    border: 2px solid rgba(59, 130, 246, 0.2);
    border-radius: 24px;
    padding: 40px 30px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
    /* 初始状态，为 GSAP 动画做准备 */
    transform: translateY(80px) scale(0.7) rotateX(20deg);
    opacity: 0;
    
    /* 确保点击事件可以触发 */
    pointer-events: auto;
    
    /* 默认阴影 */
    box-shadow: 
        0 4px 24px rgba(15, 23, 42, 0.4),
        0 8px 48px rgba(59, 130, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    
    /* 悬停效果 */
    &:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: rgba(59, 130, 246, 0.5);
        box-shadow: 
            0 8px 40px rgba(15, 23, 42, 0.6),
            0 16px 80px rgba(59, 130, 246, 0.2),
            0 0 0 1px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        
        .menu-card-glow {
            opacity: 1;
            animation: cardGlow 2s ease-in-out infinite alternate;
        }
        
        .menu-card-icon {
            transform: scale(1.1) rotate(5deg);
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6));
        }
        
        .menu-card-title {
            color: #60a5fa;
        }
        
        .menu-card-description {
            color: #cbd5e1;
            opacity: 0.95;
        }
    }
    
    /* 激活状态 */
    &.active {
        border-color: rgba(34, 197, 94, 0.6);
        background: linear-gradient(
            135deg,
            rgba(34, 197, 94, 0.05) 0%,
            rgba(15, 23, 42, 0.5) 50%,
            rgba(34, 197, 94, 0.05) 100%
        );
        
        .menu-card-title {
            color: #4ade80;
        }
    }
}

/* 卡片内容 */
.menu-card-content {
    text-align: center;
    position: relative;
    z-index: 2;
}

/* 卡片图标 */
.menu-card-icon {
    font-size: 48px;
    margin-bottom: 20px;
    display: block;
    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
}

/* 卡片标题 */
.menu-card-title {
    font-size: 36px;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 8px;
    transition: color 0.3s ease;
    letter-spacing: 1px;
}

/* 卡片副标题 */
.menu-card-subtitle {
    font-size: 22px;
    color: #cbd5e1;
    font-weight: 400;
    opacity: 0.9;
    margin-bottom: 12px;
}

/* 卡片描述信息 */
.menu-card-description {
    font-size: 18px;
    color: #94a3b8;
    font-weight: 400;
    line-height: 1.5;
    opacity: 0.85;
    margin-top: 8px;
    padding: 0 8px;
    text-align: center;
    max-width: 280px;
    
    /* 文字省略处理 */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    /* 悬停时的效果 */
    transition: all 0.3s ease;
}

/* 卡片发光效果 */
.menu-card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        135deg,
        rgba(59, 130, 246, 0.1) 0%,
        transparent 50%,
        rgba(147, 51, 234, 0.08) 100%
    );
    border-radius: 22px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

@keyframes cardGlow {
    0% {
        background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1) 0%,
            transparent 50%,
            rgba(147, 51, 234, 0.08) 100%
        );
    }
    100% {
        background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2) 0%,
            rgba(147, 51, 234, 0.1) 50%,
            rgba(34, 197, 94, 0.1) 100%
        );
    }
}

/* 全屏悬停提示 */
.fullscreen-tooltip {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, 
        rgba(15, 23, 42, 0.95) 0%, 
        rgba(30, 41, 59, 0.98) 50%, 
        rgba(15, 23, 42, 0.95) 100%);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(59, 130, 246, 0.4);
    color: #e2e8f0;
    padding: 24px 40px 28px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
    max-width: 600px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
    z-index: 10000;
    
    /* 增强发光效果 */
    box-shadow: 
        0 0 0 1px rgba(59, 130, 246, 0.3),
        0 8px 40px rgba(59, 130, 246, 0.2),
        0 16px 80px rgba(30, 58, 138, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    /* 顶部装饰线 */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        height: 4px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.9) 50%, 
            transparent 100%);
        border-radius: 2px;
    }
    
    /* 底部装饰 */
    &::after {
        content: '';
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        background: rgba(59, 130, 246, 0.7);
        border-radius: 50%;
        box-shadow: 
            0 0 15px rgba(59, 130, 246, 0.5),
            0 0 30px rgba(59, 130, 246, 0.3);
    }
    
    /* 显示状态 */
    &.visible {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-8px);
        animation: fullscreenTooltipGlow 3s ease-in-out infinite alternate;
    }
}

/* 全屏提示发光动画 */
@keyframes fullscreenTooltipGlow {
    0% {
        box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.3),
            0 8px 40px rgba(59, 130, 246, 0.2),
            0 16px 80px rgba(30, 58, 138, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    100% {
        box-shadow: 
            0 0 0 1px rgba(59, 130, 246, 0.5),
            0 8px 40px rgba(59, 130, 246, 0.35),
            0 16px 80px rgba(30, 58, 138, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
}

/* 响应式设计 */
@media (max-width: 1400px) {
    .menu-grid {
        gap: 30px;
        max-width: 1000px;
    }
    
    .menu-card {
        padding: 35px 25px;
        min-height: 260px;
    }
    
    .menu-card-icon {
        font-size: 42px;
    }
    
    .menu-card-title {
        font-size: 22px;
    }
}

@media (max-width: 1200px) {
    .menu-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
        max-width: 800px;
    }
    
    .fullscreen-tooltip {
        max-width: 500px;
        font-size: 16px;
        padding: 20px 32px 24px;
    }
}

@media (max-width: 768px) {
    .fullscreen-menu {
        padding: 20px;
    }
    
    .menu-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        max-width: 400px;
    }
    
    .menu-card {
        padding: 30px 20px;
        min-height: 240px;
    }
    
    .menu-card-icon {
        font-size: 36px;
        margin-bottom: 15px;
    }
    
    .menu-card-title {
        font-size: 20px;
    }
    
    .fullscreen-tooltip {
        bottom: 60px;
        max-width: 90%;
        font-size: 15px;
        padding: 18px 28px 22px;
    }
    
    .menu-card-description {
        font-size: 12px;
        -webkit-line-clamp: 2;
        max-width: 240px;
    }
}
</style>
