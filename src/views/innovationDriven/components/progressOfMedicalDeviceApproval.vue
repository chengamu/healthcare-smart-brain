<template>
    <div class="right-card">
        <m-card title="医疗器械获批进度">
            <div class="medical-device-container">
                <!-- 器械项目卡片 -->
                <div class="device-items">
                    <div 
                        v-for="(item, index) in progressData" 
                        :key="index"
                        class="device-item"
                        :style="{ animationDelay: `${index * 0.3}s` }"
                    >
                        <div class="item-header">
                            <div class="item-icon">
                                <div class="icon-circle">
                                    <span class="icon-text">🏥</span>
                                </div>
                            </div>
                            <div class="item-title">{{ item.label }}</div>
                        </div>
                        
                        <div class="progress-section">
                            <div class="progress-track">
                                <div 
                                    class="progress-fill" 
                                    :style="{ 
                                        width: `${(item.current / item.goal) * 100}%`,
                                        background: getProgressGradient(index)
                                    }"
                                >
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                            
                            <div class="progress-info">
                                <div class="current-value">
                                    <CountTo 
                                        :startVal="0" 
                                        :endVal="item.current" 
                                        :duration="2000"
                                        :autoplay="true"
                                        class="value-number"
                                    />
                                    <span class="value-separator">/</span>
                                    <span class="goal-number">{{ item.goal }}</span>
                                    <span class="unit-text">{{ item.unit }}</span>
                                </div>
                                <div class="progress-percentage">
                                    {{ Math.round((item.current / item.goal) * 100) }}%
                                </div>
                            </div>
                        </div>
                        
                        <!-- <div class="item-footer">
                            <div class="status-indicator" :class="getStatusClass(item.current, item.goal)">
                                {{ getStatusText(item.current, item.goal) }}
                            </div>
                        </div> -->
                    </div>
                </div>
                
                <!-- 底部统计 -->
                <!-- <div class="summary-stats">
                    <div class="stat-item">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-content">
                            <div class="stat-label">已获批</div>
                            <div class="stat-value">{{ totalApproved }}个</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <div class="stat-label">总目标</div>
                            <div class="stat-value">{{ totalGoal }}个</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">📈</div>
                        <div class="stat-content">
                            <div class="stat-label">完成率</div>
                            <div class="stat-value">{{ overallProgress }}%</div>
                        </div>
                    </div>
                </div> -->
            </div>
        </m-card>
    </div>
</template>

<script setup>
import {ref, onMounted, computed, nextTick} from "vue"
import mCard from "@/components/mCard/index.vue"
import CountTo from "@/components/mCountTo/index.js"
import {listInstrumentAll} from "@/api/brain.js";

const emit = defineEmits(['update:instrumentData'])

const progressData = ref([
    {
        label: '二类器械获批', current: 3, goal: 15, unit: '个'
    },
    {
        label: '三类器械获批', current: 4, goal: 15, unit: '个'
    },
])

// 计算总数据
const totalApproved = computed(() => {
    return progressData.value.reduce((sum, item) => sum + item.current, 0)
})

const totalGoal = computed(() => {
    return progressData.value.reduce((sum, item) => sum + item.goal, 0)
})

const overallProgress = computed(() => {
    return totalGoal.value > 0 ? Math.round((totalApproved.value / totalGoal.value) * 100) : 0
})

// 获取进度条渐变色
const getProgressGradient = (index) => {
    const gradients = [
        'linear-gradient(90deg, #30DCFF 0%, #00FF88 100%)',
        'linear-gradient(90deg, #00FF88 0%, #8B5CF6 100%)'
    ]
    return gradients[index] || gradients[0]
}

// 获取状态样式
const getStatusClass = (current, goal) => {
    const progress = (current / goal) * 100
    if (progress >= 80) return 'status-excellent'
    if (progress >= 60) return 'status-good'
    if (progress >= 40) return 'status-normal'
    return 'status-low'
}

// 获取状态文本
const getStatusText = (current, goal) => {
    const progress = (current / goal) * 100
    if (progress >= 80) return '优秀'
    if (progress >= 60) return '良好'
    if (progress >= 40) return '正常'
    return '待加强'
}

const chartReady = ref(false)

onMounted(() => {
    init()
})

async function init() {
    await getListInstrumentAll()
    chartReady.value = true
    await nextTick()
    // 发送数据给父组件
    emit('update:instrumentData', totalApproved.value)
}

async function getListInstrumentAll() {
    try {
        const response = await listInstrumentAll()
        // if (response && response.length >= 2) {
        //     progressData.value = response.slice(0, 2).map((item, index) => ({
        //         label: item.name || `${index === 0 ? '二' : '三'}类器械获批`,
        //         current: item.current || 0,
        //         goal: item.goal || 15,
        //         unit: '个'
        //     }))
        // }
        progressData.value[0].current = response.filter(it => it.level === '2').length || 0
        progressData.value[1].current = response.filter(it => it.level === '3').length || 0
    } catch (error) {
        console.error('获取医疗器械数据失败:', error)
    }
}
</script>

<style scoped lang="scss">
.medical-device-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.03) 0%, transparent 50%);
        box-sizing: border-box;
}

.device-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
}

.device-item {
    background: linear-gradient(135deg, 
        rgba(48, 220, 255, 0.08) 0%, 
        rgba(0, 255, 136, 0.06) 50%, 
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 8px 16px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.8s ease-out forwards;
}

.device-item:hover {
    transform: translateY(-3px);
    border-color: #30DCFF;
    box-shadow: 0 8px 25px rgba(48, 220, 255, 0.2);
    background: linear-gradient(135deg, 
        rgba(48, 220, 255, 0.12) 0%, 
        rgba(0, 255, 136, 0.08) 50%, 
        rgba(139, 92, 246, 0.06) 100%);
}

@keyframes slideInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.item-header {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.item-icon {
    margin-right: 12px;
}

.icon-circle {
    width: 36px;
    height: 36px;
    background: radial-gradient(circle, rgba(48, 220, 255, 0.2), rgba(48, 220, 255, 0.05));
    border: 2px solid rgba(48, 220, 255, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: iconPulse 3s ease-in-out infinite;
}

.icon-text {
    font-size: 18px;
    filter: brightness(1.2);
}

@keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.item-title {
    font-size: 16px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.4);
}

// .progress-section {
//     margin-bottom: 12px;
// }

.progress-track {
    width: 100%;
    height: 8px;
    background: rgba(48, 220, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 2px;
    position: relative;
}

.progress-fill {
    height: 100%;
    border-radius: 4px;
    position: relative;
    transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.progress-glow {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6));
    animation: progressShimmer 2s infinite;
}

@keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
}

.progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.current-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.value-number {
    font-size: 18px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
}

.value-separator {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
}

.goal-number {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
}

.unit-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 2px;
}

.progress-percentage {
    font-size: 14px;
    font-weight: bold;
    color: #00FF88;
    text-shadow: 0 0 6px rgba(0, 255, 136, 0.6);
}

.item-footer {
    display: flex;
    justify-content: flex-end;
}

.status-indicator {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
}

.status-excellent {
    background: rgba(0, 255, 136, 0.2);
    color: #00FF88;
    border: 1px solid rgba(0, 255, 136, 0.4);
}

.status-good {
    background: rgba(48, 220, 255, 0.2);
    color: #30DCFF;
    border: 1px solid rgba(48, 220, 255, 0.4);
}

.status-normal {
    background: rgba(139, 92, 246, 0.2);
    color: #8B5CF6;
    border: 1px solid rgba(139, 92, 246, 0.4);
}

.status-low {
    background: rgba(255, 193, 7, 0.2);
    color: #FFD700;
    border: 1px solid rgba(255, 193, 7, 0.4);
}

.summary-stats {
    display: flex;
    justify-content: space-around;
    padding-top: 15px;
    border-top: 1px solid rgba(48, 220, 255, 0.2);
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.stat-icon {
    font-size: 16px;
    filter: brightness(1.2);
}

.stat-content {
    text-align: center;
}

.stat-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2px;
}

.stat-value {
    font-size: 14px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 6px rgba(48, 220, 255, 0.4);
}
</style>