<template>
    <div class="left-card">
        <m-card title="服务企业发展">
            <div class="service-container">
                <div class="service-data" v-for="(item, index) in serviceData" :key="index">
                    <div class="service-top">
                        <div class="service-icon" v-if="item.icon"
                             :style="{ backgroundColor: item.bgColor, color: item.color }">
                            <i :class="'fas ' + item.icon"></i>
                        </div>
                        <div class="service-name">
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="service-bottom">
                        <div class="service-num">
                            {{ item.num }}
                        </div>
                        <div class="service-unit">
                            {{ item.unit }}
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import mCard from "@/components/mCard/index.vue";
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const { 
    configValue: fwqyfz, 
    getConfigKeyFunc: fetchFwqyfz 
} = useGetConfigKey('brain.redCoreLeadership.fwqyfz')

const serviceData = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchFwqyfz(),
    ])
    
    try {
        const parsedData = JSON.parse(fwqyfz.value)
        serviceData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        serviceData.value = [
            {
                name: '开展银企对接',
                num: 37,
                unit: '次',
                icon: 'fa-building',
                bgColor: 'rgba(0, 180, 42, 0.2)',
                color: 'rgb(0, 180, 42)'
            },
            {
                name: '解决企业难题',
                num: 56,
                unit: '次',
                icon: 'fa-user',
                bgColor: 'rgba(255, 125, 0, 0.2)',
                color: 'rgb(255, 125, 0)'
            },
            {
                name: '政策宣讲次数',
                num: 6,
                unit: '次',
                icon: 'fa-chart-line',
                bgColor: 'rgba(245, 63, 63, 0.2)',
                color: 'rgb(245, 63, 63)'
            },
        ]
    }
}
</script>

<style scoped lang="scss">
.service-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    box-sizing: border-box;
}

.service-data {
    width: 13rem;
    height: 11rem;
    background: transparent;
    border-radius: 16px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: slide 4s infinite;
    }
    
    &::after {
        content: '🎆';
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 16px;
        animation: twinkle 2s infinite;
    }
    
    &:hover {
        transform: translateY(-8px) scale(1.05);
        box-shadow: 0 15px 35px rgba(220, 38, 38, 0.5);
        border-color: rgba(239, 68, 68, 0.8);
    }
    
    &:nth-child(1) {
        border-left: 4px solid #22c55e;
        
        &::after {
            content: '🏦';
        }
    }
    
    &:nth-child(2) {
        border-left: 4px solid #f97316;
        
        &::after {
            content: '🔧';
        }
    }
    
    &:nth-child(3) {
        border-left: 4px solid #ef4444;
        
        &::after {
            content: '📊';
        }
    }
}

.service-top, .service-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.4rem;
    margin-bottom: 0.8rem;
    position: relative;
    z-index: 2;
}

.service-bottom {
    align-items: center;
    flex-direction: column;
}

.service-icon {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.2rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    animation: pulse 2s infinite;
    flex-shrink: 0;
}

.service-name {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    line-height: 1.4;
}

.service-num {
    font-size: 2.5rem;
    line-height: 3rem;
    font-weight: bold;
    background: linear-gradient(45deg, #fbbf24, #ffffff, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #fbbf24, transparent);
        animation: glow 2s infinite alternate;
    }
}

.service-unit {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    color: #f3f4f6;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.main-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 22rem;
}

.nav-container {
    display: flex;
    height: calc(100% - 3rem);
    gap: 0.25rem;
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes slide {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes twinkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
}

@keyframes glow {
    from { box-shadow: 0 0 5px #fbbf24; }
    to { box-shadow: 0 0 15px #fbbf24; }
}
</style>