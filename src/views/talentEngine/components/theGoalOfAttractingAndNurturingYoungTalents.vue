<template>
    <div class="left-card">
        <m-card title="青年人才引育目标">
            <div class="young-talent-container">
                <!-- 目标卡片 -->
                <div class="talent-goal-card">
                    <div class="goal-header">
                        <div class="goal-icon">
                            <i class="icon-youth">🎆</i>
                        </div>
                        <div class="goal-info">
                            <div class="goal-title">青年人才引育</div>
                            <div class="goal-desc">全年目标进度</div>
                        </div>
                    </div>
                    
                    <div class="goal-progress">
                        <div class="progress-circle">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" 
                                        fill="none" 
                                        stroke="rgba(255,255,255,0.1)" 
                                        stroke-width="6"/>
                                <circle cx="60" cy="60" r="50" 
                                        fill="none" 
                                        stroke="url(#gradient)" 
                                        stroke-width="6"
                                        stroke-linecap="round"
                                        :stroke-dasharray="circumference"
                                        :stroke-dashoffset="dashOffset"
                                        transform="rotate(-90 60 60)"
                                        class="progress-stroke">
                                </circle>
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="#8B5CF6"/>
                                        <stop offset="100%" stop-color="#30DCFF"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div class="progress-content">
                                <div class="progress-value">{{ progressPercentage }}%</div>
                                <div class="progress-label">完成率</div>
                            </div>
                        </div>
                        
                        <div class="goal-stats">
                            <div class="stat-item">
                                <div class="stat-label">已引育</div>
                                <div class="stat-value highlight">{{ currentValue }}人</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">目标总数</div>
                                <div class="stat-value">{{ maxValue }}人</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 分类统计 -->
                <!-- <div class="category-stats">
                    <div class="category-item" v-for="(item, index) in categories" :key="index">
                        <div class="category-name">{{ item.name }}</div>
                        <div class="category-bar">
                            <div class="bar-fill" 
                                    :style="{ width: item.percentage + '%', backgroundColor: item.color }"></div>
                            <span class="bar-text">{{ item.count }}人</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue"
import mCard from "@/components/mCard/index.vue"

// 定义组件属性
const props = defineProps({
    talentData: {
        type: Array,
        default: () => []
    }
})

const maxValue = 150
const currentValue = 55

// 计算进度百分比
const progressPercentage = computed(() => {
    return Math.round((currentValue / maxValue) * 100)
})

// 圆形进度条相关计算
const circumference = 2 * Math.PI * 50 // r=50
const dashOffset = computed(() => {
    return circumference - (circumference * progressPercentage.value) / 100
})

// 分类数据
const categories = ref([
    { name: '硕士研究生', count: 25, percentage: 45, color: '#30DCFF' },
    { name: '本科生', count: 20, percentage: 36, color: '#00FF88' },
    { name: '博士研究生', count: 10, percentage: 19, color: '#8B5CF6' }
])
</script>

<style scoped lang="scss">
.young-talent-container {
    padding: 16px;
    height: 100%;
    // position: relative;
    z-index: 2;
    box-sizing: border-box;
}

.talent-goal-card {
    background: rgba(139, 92, 246, 0.1);
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-radius: 16px;
    padding: 16px;
    // margin-bottom: 20px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    height: 100%;

    &:hover {
        border-color: rgba(139, 92, 246, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
    }

    .goal-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;

        .goal-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #8B5CF6, #6d28d9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .goal-info {
            .goal-title {
                font-size: 18px;
                color: #8B5CF6;
                font-weight: bold;
                text-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
            }

            .goal-desc {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
                margin-top: 4px;
            }
        }
    }

    .goal-progress {
        display: flex;
        align-items: center;
        gap: 30px;

        .progress-circle {
            position: relative;
            flex-shrink: 0;

            .progress-stroke {
                transition: stroke-dashoffset 2s ease;
            }

            .progress-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;

                .progress-value {
                    font-size: 24px;
                    color: #8B5CF6;
                    font-weight: bold;
                    text-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
                }

                .progress-label {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    margin-top: 4px;
                }
            }
        }

        .goal-stats {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;

            .stat-item {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .stat-label {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.7);
                }

                .stat-value {
                    font-size: 18px;
                    font-weight: bold;
                    color: #30DCFF;

                    &.highlight {
                        color: #00FF88;
                    }
                }
            }
        }
    }
}

.category-stats {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .category-item {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(48, 220, 255, 0.2);
        border-radius: 8px;
        padding: 15px;
        transition: all 0.3s ease;

        &:hover {
            border-color: rgba(0, 255, 136, 0.5);
            background: rgba(48, 220, 255, 0.05);
        }

        .category-name {
            font-size: 14px;
            color: #30DCFF;
            margin-bottom: 10px;
            font-weight: 500;
        }

        .category-bar {
            position: relative;
            width: 100%;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;

            .bar-fill {
                height: 100%;
                border-radius: 10px;
                transition: width 1.5s ease;
                position: relative;
            }

            .bar-text {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
            }
        }
    }
}
</style>