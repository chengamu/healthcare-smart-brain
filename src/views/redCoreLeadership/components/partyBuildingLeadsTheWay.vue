<template>
    <div class="right-card">
        <m-card title="活动动态">
            <div class="activities-list" v-auto-scroll>
                <div 
                    v-for="(item, index) in activitiesData" 
                    :key="index" 
                    class="activity-item"
                >
                    <div class="activity-name">{{ item.name }}</div>
                    <div class="activity-content">
                        <div class="activity-content">{{ item.content }}</div>
                        <div class="activity-time">{{ item.time }}</div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const { 
    configValue: hddt,
    getConfigKeyFunc: fetchHddt
} = useGetConfigKey('brain.redCoreLeadership.hddt')

const activitiesData = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchHddt(),
    ])
    
    try {
        const parsedData = JSON.parse(hddt.value)
        activitiesData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        activitiesData.value = [
            { name: '2025东盛慧谷时光机·怀旧嘉年华', content: '锁定10月24日，广邀产业社区企业人才，进入80、90年代游戏区、电影区，重拾童真、共同怀旧。我们在现场，等你穿越而来！', time: '2025.10.24' },
            { name: '阿尔茨海默病科普宣传活动', content: '9月，阿尔茨海默病科普宣传活动。邀请新兴领域流动党员充分发挥党员的先锋模范作用，系统学习阿尔茨海默病相关知识，积极参与科普宣讲与互动陪伴等环节，加深与产业社区的情感联结。', time: '2025.09' },
        ]
    }
}
</script>

<style scoped lang="scss">
.activities-list {
    height: 100%;
    padding: 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;
    background: transparent;
    border-radius: 12px;
    position: relative;
}

.activity-item {
    padding: 18px;
    margin-bottom: 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '🏩';
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 20px;
        animation: glow 2s infinite alternate;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: slide 4s infinite;
    }

    &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 35px rgba(220, 38, 38, 0.5);
        border-color: rgba(239, 68, 68, 0.8);
    }

    &:last-child {
        margin-bottom: 0;
    }
    
    &:nth-child(odd) {
        border-left: 4px solid #fbbf24;
    }
    
    &:nth-child(even) {
        border-left: 4px solid #34d399;
    }
}

.activity-name {
    font-size: 16px;
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 12px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    padding-left: 35px;
    position: relative;

    &::before {
        content: '★';
        position: absolute;
        left: 8px;
        color: #fbbf24;
        font-size: 16px;
        animation: twinkle 2s infinite;
    }
}

.activity-content {
    display: flex;
    flex-direction: column;
}

.activity-content {
    font-size: 15px;
    color: #f3f4f6;
    margin-bottom: 8px;
    font-weight: 500;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.activity-time {
    font-size: 13px;
    color: #fbbf24;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 600;
    border: 1px solid rgba(251, 191, 36, 0.3);
    align-self: flex-end;
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes slide {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes glow {
    from { filter: drop-shadow(0 0 5px #fbbf24); }
    to { filter: drop-shadow(0 0 15px #fbbf24); }
}

@keyframes twinkle {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
}
</style>