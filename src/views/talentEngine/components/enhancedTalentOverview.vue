<template>
    <div class="left-card enhanced-card">
        <m-card :title="title" class="talent-overview-card">
            <div class="card-content">
                <div class="card-background">
                    <div class="glow-effect"></div>
                    <div class="scan-line"></div>
                </div>
                <div class="ambient-glow"></div>
                
                <div class="talent-overview-container">
                    <!-- 人才总量中心显示 -->
                    <div class="center-stats">
                        <div class="main-number">
                            <span class="number">{{ totalTalentCount }}</span>
                            <span class="unit">位</span>
                        </div>
                        <div class="main-label">医疗健康人才总量</div>
                    </div>

                    <!-- 人才结构分布 - 改为进度条形式 -->
                    <div class="talent-structure">
                        <div class="structure-item" v-for="(item, index) in talentStructure" :key="index">
                            <div class="structure-header">
                                <div class="structure-icon" :class="item.type">
                                    <i :class="item.icon"></i>
                                </div>
                                <div class="structure-info">
                                    <div class="structure-name">{{ item.name }}</div>
                                    <div class="structure-stats">
                                        <span class="structure-count">{{ item.count }}位</span>
                                        <span class="structure-percentage">{{ item.percentage }}%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" 
                                     :style="{ width: item.percentage + '%', backgroundColor: item.color }"
                                     :data-percentage="item.percentage + '%'">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 增长趋势指示器 -->
                    <div class="growth-indicators">
                        <div class="indicator-item">
                            <div class="indicator-icon trend-up">
                                <i class="icon-trend-up">↗</i>
                            </div>
                            <div class="indicator-text">
                                <span class="growth-rate">+15.2%</span>
                                <span class="growth-label">同比增长</span>
                            </div>
                        </div>
                        <div class="indicator-item">
                            <div class="indicator-icon trend-target">
                                <i class="icon-target">🎯</i>
                            </div>
                            <div class="indicator-text">
                                <span class="target-rate">85%</span>
                                <span class="target-label">年度目标</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pulse-ring"></div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import mCard from "@/components/mCard/index.vue"

// 移除环形图表相关代码
const props = defineProps({
    title: {
        type: String,
        default: "人才总量与结构"
    },
    talentData: {
        type: Array,
        default: () => []
    }
})

// 计算总人才数量
const totalTalentCount = computed(() => {
    return props.talentData.length || 0
})

// 计算人才结构分布
const talentStructure = computed(() => {
    if (!props.talentData.length) return []
    
    const total = props.talentData.length
    const structure = [
        {
            name: "院士专家",
            type: "academician",
            icon: "icon-crown",
            color: "#FFD700",
            count: 0
        },
        {
            name: "行业专家", 
            type: "expert",
            icon: "icon-expert",
            color: "#30DCFF",
            count: 0
        },
        {
            name: "技术经理人",
            type: "manager", 
            icon: "icon-manager",
            color: "#00FF88",
            count: 0
        },
        {
            name: "技能人才",
            type: "talent",
            icon: "icon-talent",
            color: "#8B5CF6",
            count: 0
        }
    ]

    // 统计各类人才数量
    props.talentData.forEach(talent => {
        if (talent.position && talent.position.includes('院士')) {
            structure[0].count++
        } else if (talent.position && talent.position.includes('专家')) {
            structure[1].count++
        } else if (talent.position && talent.position.includes('经理')) {
            structure[2].count++
        } else {
            structure[3].count++
        }
    })

    // 计算百分比
    structure.forEach(item => {
        item.percentage = total > 0 ? Math.round((item.count / total) * 100) : 0
    })

    return structure.filter(item => item.count > 0)
})

// 数字滚动动画
const animateNumbers = () => {
    const numberElement = document.querySelector('.main-number .number')
    if (numberElement && totalTalentCount.value > 0) {
        let current = 0
        const target = totalTalentCount.value
        const increment = Math.ceil(target / 30)
        
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                current = target
                clearInterval(timer)
            }
            numberElement.textContent = current
        }, 50)
    }
}
</script>

<style scoped lang="scss">
.enhanced-card {
    .talent-overview-card {
        background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.9) 0%, 
            rgba(48, 220, 255, 0.05) 50%,
            rgba(0, 0, 0, 0.9) 100%);
        border: 2px solid rgba(48, 220, 255, 0.3);
        backdrop-filter: blur(10px);
    }
}

.talent-overview-container {
    position: relative;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.center-stats {
    text-align: center;
    position: relative;
    z-index: 10;

    .main-number {
        font-size: 48px;
        font-weight: bold;
        color: #30DCFF;
        text-shadow: 0 0 20px rgba(48, 220, 255, 0.8);
        margin-bottom: 8px;

        .number {
            font-family: 'Arial', sans-serif;
        }

        .unit {
            font-size: 20px;
            color: #00FF88;
            margin-left: 8px;
        }
    }

    .main-label {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
    }
}

.circular-progress {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    opacity: 0.7;
}

.talent-structure {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;

    .structure-item {
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(48, 220, 255, 0.05);
        border-radius: 12px;
        border: 1px solid rgba(48, 220, 255, 0.2);
        transition: all 0.3s ease;

        &:hover {
            background: rgba(48, 220, 255, 0.1);
            border-color: rgba(0, 255, 136, 0.5);
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(48, 220, 255, 0.3);
        }

        .structure-header {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            gap: 12px;
        }

        .structure-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            
            &.academician {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #000;
            }
            
            &.expert {
                background: linear-gradient(135deg, #30DCFF, #1a8cff);
                color: #fff;
            }
            
            &.manager {
                background: linear-gradient(135deg, #00FF88, #00cc6a);
                color: #fff;
            }
            
            &.talent {
                background: linear-gradient(135deg, #8B5CF6, #6d28d9);
                color: #fff;
            }
        }

        .structure-info {
            flex: 1;

            .structure-name {
                font-size: 16px;
                color: #30DCFF;
                font-weight: 600;
                margin-bottom: 5px;
                text-shadow: 0 0 8px rgba(48, 220, 255, 0.5);
            }

            .structure-stats {
                display: flex;
                gap: 15px;
                align-items: center;
            }

            .structure-count {
                font-size: 18px;
                color: #00FF88;
                font-weight: bold;
            }

            .structure-percentage {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
            }
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            position: relative;

            .progress-fill {
                height: 100%;
                border-radius: 4px;
                transition: width 1.5s ease;
                position: relative;
                background: linear-gradient(90deg, 
                    var(--color, #30DCFF), 
                    var(--color, #30DCFF) + '80');
                
                &::after {
                    content: attr(data-percentage);
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #fff;
                    font-size: 11px;
                    font-weight: bold;
                    text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
                }
            }
        }
    }
}

.growth-indicators {
    display: flex;
    gap: 15px;
    margin-top: 10px;

    .indicator-item {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: rgba(0, 255, 136, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(0, 255, 136, 0.3);

        .indicator-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;

            &.trend-up {
                background: linear-gradient(135deg, #00FF88, #00cc6a);
                color: #fff;
            }

            &.trend-target {
                background: linear-gradient(135deg, #8B5CF6, #6d28d9);
                color: #fff;
            }
        }

        .indicator-text {
            .growth-rate, .target-rate {
                display: block;
                font-size: 16px;
                font-weight: bold;
                color: #00FF88;
            }

            .growth-label, .target-label {
                display: block;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.7);
            }
        }
    }
}

/* 添加脉冲动画 */
@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(48, 220, 255, 0.7);
    }
    50% {
        box-shadow: 0 0 0 10px rgba(48, 220, 255, 0);
    }
}

.center-stats .main-number {
    animation: pulse 3s infinite;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .talent-overview-container {
        padding: 15px;
        gap: 15px;
    }

    .center-stats .main-number {
        font-size: 36px;
    }

    .circular-progress {
        width: 150px;
        height: 150px;
    }

    .talent-structure .structure-item {
        padding: 10px;
        gap: 10px;

        .structure-icon {
            width: 35px;
            height: 35px;
            font-size: 16px;
        }
    }

    .growth-indicators {
        flex-direction: column;
        gap: 10px;
    }
}
</style>