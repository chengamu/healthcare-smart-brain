<template>
    <div class="right-card enhanced-card">
        <m-card :title="title">
            <div class="smart-service-container">
                <div class="service-header">
                    <div class="header-icon">🏙️</div>
                    <div class="header-info">
                        <div class="total-usage">{{ totalUsage }}</div>
                        <div class="total-label">本月服务调用次数</div>
                    </div>
                </div>
                
                <div class="service-grid" v-auto-scroll>
                    <div 
                        v-for="(item, index) in state.pieData" 
                        :key="index"
                        class="service-item"
                        :style="{ '--item-color': state.pieDataColor[index] }"
                    >
                        <div class="item-header">
                            <div class="item-icon" :style="{ backgroundColor: state.pieDataColor[index] }">
                                {{ getServiceIcon(item.name) }}
                            </div>
                            <div class="item-name">{{ item.name }}</div>
                        </div>
                        <div class="item-value">{{ item.value }}<span class="unit">次</span></div>
                        <div class="item-progress">
                            <div class="progress-bar">
                                <div 
                                    class="progress-fill" 
                                    :style="{ 
                                        width: (item.value / totalUsage * 100) + '%',
                                        backgroundColor: state.pieDataColor[index]
                                    }"
                                ></div>
                            </div>
                            <div class="progress-percentage">{{ Math.round(item.value / totalUsage * 100) }}%</div>
                        </div>
                    </div>
                </div>
                
                <!-- <div class="service-trend">
                    <div class="trend-label">📈 较上月增长</div>
                    <div class="trend-value">+12.5%</div>
                </div> -->
            </div>
        </m-card>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import {
    useGetConfigKey
} from '@/hooks/useGetConfigKey'

/**
 * 参数获取
 */
const {
    configValue: zhcsfw,
    getConfigKeyFunc: fetchZhcsfw
} = useGetConfigKey('brain.livableEcosystem.zhcsfw') // 智慧大脑-产城生态-智慧城市服务

const props = defineProps({
    title: {
        type: String,
        default: "智慧城市服务",
    },
})

const state = reactive({
    pieDataColor: ["#30DCFF", "#00FF88", "#8B5CF6", "#FF6B6B"],
    pieData: [
        // {
        //     name: "安装维修",
        //     value: 134,
        // },
        // {
        //     name: "场地租赁",
        //     value: 152,
        // },
        // {
        //     name: "拎包入驻",
        //     value: 177,
        // },
        // {
        //     name: "美化保洁",
        //     value: 125,
        // },
    ],
})

onMounted(() => {
    init()
});

async function init(str) {
    // 获取需要的参数
    await Promise.all([
        fetchZhcsfw(),
    ])
    state.pieData = JSON.parse(zhcsfw.value)
}

const totalUsage = computed(() => {
    return state.pieData.reduce((sum, item) => sum + item.value, 0)
})

const maxValue = computed(() => {
    return Math.max(...state.pieData.map(item => item.value))
})

const getServiceIcon = (name) => {
    const iconMap = {
        '安装维修': '🔧',
        '场地租赁': '🏢',
        '拎包入驻': '📦',
        '美化保洁': '🧹'
    }
    return iconMap[name] || '⚙️'
}
</script>
<style scoped lang="scss">
.enhanced-card {
    .smart-service-container {
        padding: 20px;
        height: 100%;
        position: relative;
        overflow: hidden;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #30DCFF, transparent);
            animation: shimmer 3s infinite;
        }
    }
    
    .service-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(48, 220, 255, 0.2);
        
        .header-icon {
            font-size: 32px;
            animation: float 3s ease-in-out infinite;
        }
        
        .header-info {
            .total-usage {
                font-size: 28px;
                font-weight: bold;
                color: #30DCFF;
                text-shadow: 0 0 10px rgba(48, 220, 255, 0.5);
            }
            
            .total-label {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
                margin-top: 4px;
            }
        }
    }
    
    .service-grid {
        display: flex;
        // flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .service-item {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(48, 220, 255, 0.2);
        border-radius: 10px;
        padding: 8px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        
        &:hover {
            transform: translateX(5px);
            border-color: var(--item-color);
            box-shadow: 0 5px 20px rgba(48, 220, 255, 0.3);
            
            &::after {
                opacity: 0.1;
            }
        }
        
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--item-color);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .item-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
            
            .item-icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                box-shadow: 0 0 10px rgba(48, 220, 255, 0.3);
                flex-shrink: 0;
            }
            
            .item-name {
                font-size: 14px;
                font-weight: 500;
                color: #fff;
            }
        }
        
        .item-value {
            font-size: 18px;
            font-weight: bold;
            color: var(--item-color);
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            
            .unit {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
                margin-left: 2px;
            }
        }
        
        .item-progress {
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
            z-index: 1;
            
            .progress-bar {
                flex: 1;
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
                
                .progress-fill {
                    height: 100%;
                    border-radius: 3px;
                    transition: width 1.5s ease;
                    position: relative;
                    
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                        animation: progressShine 2s infinite;
                    }
                }
            }
            
            .progress-percentage {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.8);
                min-width: 35px;
            }
        }
    }
    
    .service-trend {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        background: rgba(0, 255, 136, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(0, 255, 136, 0.2);
        
        .trend-label {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .trend-value {
            font-size: 14px;
            font-weight: bold;
            color: #00FF88;
        }
    }
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

@keyframes progressShine {
    0% { left: -100%; }
    100% { left: 100%; }
}
</style>
