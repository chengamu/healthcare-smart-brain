<template>
    <div class="right-card">
        <m-card title="党的动态">
            <div class="activities-list" v-auto-scroll>
                <div 
                    v-for="(item, index) in activitiesData" 
                    :key="index" 
                    class="activity-item"
                >
                    <div class="activity-party">{{ item.party }}</div>
                    <div class="activity-content">
                        <div class="activity-activity">{{ item.activity }}</div>
                        <div class="activity-time">{{ item.time }}</div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import mCard from "@/components/mCard/index.vue"

const activitiesData = ref([
    { party: '绍兴医疗健康产业社区功能性联合党委', activity: '牵头建立健康产业党建联盟共建', time: '2025.01.04' },
    { party: '科技型企业党总支', activity: '推广智慧健康平台', time: '2025.02.04' },
    { party: '服务性机构党支部', activity: '组织健康讲座与科普宣传', time: '2025.03.04' },
    { party: '社区管理党支部', activity: '组织医患沟通座谈会', time: '2025.04.04' },
    { party: '新兴领域流动党员党支部', activity: '组建党员健康志愿服务队', time: '2025.05.04' },
])
</script>

<style scoped lang="scss">
.activities-list {
    height: 100%;
    padding: 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;
    background: linear-gradient(135deg, 
        rgba(220, 38, 38, 0.05) 0%, 
        rgba(239, 68, 68, 0.05) 50%,
        rgba(185, 28, 28, 0.05) 100%);
    border-radius: 12px;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #dc2626, transparent);
        animation: shimmer 3s infinite;
    }
}

.activity-item {
    padding: 18px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, 
        rgba(220, 38, 38, 0.8) 0%, 
        rgba(239, 68, 68, 0.7) 50%,
        rgba(185, 28, 28, 0.8) 100%);
    border-radius: 12px;
    border: 2px solid rgba(220, 38, 38, 0.6);
    box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
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

.activity-party {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
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
    justify-content: space-between;
    align-items: center;
    padding-left: 35px;
}

.activity-activity {
    font-size: 15px;
    color: #f3f4f6;
    flex: 1;
    margin-right: 15px;
    font-weight: 500;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.activity-time {
    font-size: 13px;
    color: #fbbf24;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 600;
    border: 1px solid rgba(251, 191, 36, 0.3);
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