<template>
    <div class="left-card">
        <m-card title="医疗器械获批进度">
            <div class="medical-device-container">
                <!-- 器械项目卡片 -->
                <div
                    v-for="(item, index) in progressData"
                    :key="index"
                    class="device-item"
                    :style="{ animationDelay: `${index * 0.3}s` }"
                >
                    <!-- 横向展示图标、标签和数值 -->
                    <div class="item-header">
                        <div class="item-icon">
                            <div class="icon-circle">
                                <span class="icon-text">🏥</span>
                            </div>
                        </div>

                        <div class="item-title">
                            {{ item.label }}
                            <div>获批</div>
                        </div>

                        <div class="info-section">
                            <div class="current-value">
                                <CountTo
                                    :startVal="0"
                                    :endVal="item.current"
                                    :duration="2000"
                                    :autoplay="true"
                                    class="value-number"
                                />
                                <span class="unit-text">{{ item.unit }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 展示器械详情列表，改为卡片形式并支持左右滑动 -->
                    <div class="device-details-wrapper" v-if="item.list && item.list.length > 0" v-auto-scroll>
                        <div
                            v-for="(device, deviceIndex) in item.list"
                            :key="deviceIndex"
                            class="device-detail-card"
                        >
                            <div class="detail-row">
                                <span class="detail-label">器械名称:</span>
                                <span class="detail-value">{{ device.name }}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">注册编号:</span>
                                <span class="detail-value">{{ device.number }}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">企业名称:</span>
                                <span class="detail-value">{{ device.enterpriseId }}</span>
                            </div>
                        </div>
                    </div>
                </div>
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
        label: '二类', current: 3, unit: '个', list: [],
    },
    {
        label: '三类', current: 4, unit: '个', list: [],
    },
])

// 计算总数据
const totalApproved = computed(() => {
    return progressData.value.reduce((sum, item) => sum + item.current, 0)
})

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
        progressData.value[0].current = response.filter(it => it.level === '2').length || 0
        progressData.value[1].current = response.filter(it => it.level === '3').length || 0
        progressData.value[0].list = response.filter(it => it.level === '2') || []
        progressData.value[1].list = response.filter(it => it.level === '3') || []
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
    padding: 16px;
    gap: 16px;
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.03) 0%, transparent 50%);
    box-sizing: border-box;
}

.device-item {
    height: 100%;
    width: calc(50% - 8px);
    box-sizing: border-box;
    background: linear-gradient(135deg, 
        rgba(48, 220, 255, 0.08) 0%, 
        rgba(0, 255, 136, 0.06) 50%, 
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 16px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.8s ease-out forwards;
    display: flex;
    flex-direction: column;
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

/* 新增的横向布局样式 */
.item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 4px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(48, 220, 255, 0.2);
}

.item-icon {
    
}

.icon-circle {
    width: 32px;
    height: 32px;
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
    font-size: 14px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.4);
    text-align: center;
    flex: 1;
    margin: 0 10px;
}

.info-section {
    display: flex;
}

.current-value {
    display: flex;
    align-items: baseline;
}

.value-number {
    font-size: 28px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
}

.unit-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 2px;
    vertical-align: bottom;
}

/* 修改后的详情列表样式，支持左右滑动 */
.device-details-wrapper {
    width: 100%;
    overflow-x: auto;
    padding: 5px 0;
}

.device-detail-card {
    flex: 0 0 280px;
    background: rgba(48, 220, 255, 0.05);
    border: 1px solid rgba(48, 220, 255, 0.3);
    border-radius: 8px;
    padding: 12px;
    backdrop-filter: blur(5px);
    margin: 8px 0;
}

.device-detail-item {
    padding: 8px 0;
    border-bottom: 1px dashed rgba(48, 220, 255, 0.1);
}

.device-detail-item:last-child {
    border-bottom: none;
}

.detail-row {
    display: flex;
    margin-bottom: 4px;
}

.detail-label {
    font-weight: bold;
    color: #30DCFF;
    flex-shrink: 0;
    font-size: 12px;
}

.detail-value {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    word-break: break-all;
    padding-left: 5px;
}

/* 隐藏滚动条 */
.device-details-wrapper::-webkit-scrollbar {
    display: none;
}

.device-details-wrapper {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>