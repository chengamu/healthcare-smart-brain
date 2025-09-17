<template>
    <div class="left-card">
        <m-card title="顶尖专家引进目标">
            <div class="expert-target-container">
                <!-- 主要指标卡片 -->
                <div class="main-target-card">
                    <div class="target-header">
                        <div class="target-icon">
                            <i class="icon-expert">🎖️</i>
                        </div>
                        <div class="target-info">
                            <div class="target-title">顶尖专家引进</div>
                            <div class="target-subtitle">本年度目标</div>
                        </div>
                    </div>
                    <div class="target-stats">
                        <div class="current-count">
                            <span class="number">{{ gaugeVal }}</span>
                            <span class="unit">人</span>
                        </div>
                        <div class="target-count">
                            <span class="label">目标:</span>
                            <span class="value">{{ gaugeMaxVal }}人</span>
                        </div>
                    </div>
                    <div class="progress-section">
                        <div class="progress-bar">
                            <div class="progress-fill" :style="{ width: (gaugeVal / gaugeMaxVal * 100) + '%' }">
                                <div class="progress-glow"></div>
                            </div>
                        </div>
                        <div class="progress-text">
                            <span class="percentage">{{ Math.round(gaugeVal / gaugeMaxVal * 100) }}%</span>
                            <span class="status">完成率</span>
                        </div>
                    </div>
                </div>

                <!-- 进度详情 -->
                <!-- <div class="progress-details">
                    <div class="detail-item">
                        <div class="detail-label">已引进</div>
                        <div class="detail-value highlight">{{ gaugeVal }}人</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">剩余目标</div>
                        <div class="detail-value">{{ gaugeMaxVal - gaugeVal }}人</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">预期完成</div>
                        <div class="detail-value success">Q4 2024</div>
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

const maxValue = 50

// 计算属性，根据props.talentData计算相关值
const gaugeVal = computed(() => {
    if (Array.isArray(props.talentData)) {
        return props.talentData.length || 0
    }
    return props.talentData || 0
})

const gaugeMaxVal = computed(() => maxValue)
</script>

<style scoped lang="scss">
.expert-target-container {
    padding: 16px;
    height: 100%;
    // position: relative;
    z-index: 2;
    box-sizing: border-box;
}

.main-target-card {
    background: rgba(48, 220, 255, 0.1);
    border: 2px solid rgba(48, 220, 255, 0.3);
    border-radius: 16px;
    padding: 16px;
    // margin-bottom: 20px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    height: 100%;

    &:hover {
        border-color: rgba(0, 255, 136, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(48, 220, 255, 0.2);
    }

    .target-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;

        .target-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .target-info {
            .target-title {
                font-size: 18px;
                color: #30DCFF;
                font-weight: bold;
                text-shadow: 0 0 8px rgba(48, 220, 255, 0.5);
            }

            .target-subtitle {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
                margin-top: 4px;
            }
        }
    }

    .target-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .current-count {
            .number {
                font-size: 36px;
                color: #00FF88;
                font-weight: bold;
                text-shadow: 0 0 12px rgba(0, 255, 136, 0.6);
            }

            .unit {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
                margin-left: 5px;
            }
        }

        .target-count {
            text-align: right;

            .label {
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
            }

            .value {
                color: #30DCFF;
                font-size: 16px;
                font-weight: bold;
                margin-left: 8px;
            }
        }
    }

    .progress-section {
        .progress-bar {
            width: 100%;
            height: 12px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
            overflow: hidden;
            position: relative;
            margin-bottom: 10px;

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00FF88, #30DCFF);
                border-radius: 6px;
                transition: width 2s ease;
                position: relative;

                .progress-glow {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
                    animation: shimmer 2s infinite;
                }
            }
        }

        .progress-text {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .percentage {
                font-size: 16px;
                color: #00FF88;
                font-weight: bold;
            }

            .status {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
            }
        }
    }
}

.progress-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    .detail-item {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(48, 220, 255, 0.2);
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        transition: all 0.3s ease;

        &:hover {
            border-color: rgba(0, 255, 136, 0.5);
            background: rgba(48, 220, 255, 0.05);
        }

        .detail-label {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 8px;
        }

        .detail-value {
            font-size: 14px;
            font-weight: bold;
            color: #30DCFF;

            &.highlight {
                color: #00FF88;
            }

            &.success {
                color: #00FF88;
            }
        }
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}
</style>
