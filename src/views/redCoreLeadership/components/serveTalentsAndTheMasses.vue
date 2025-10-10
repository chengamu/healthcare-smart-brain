<template>
    <div class="left-card">
        <m-card title="服务人才群众">
            <div class="serve-container">
                <div class="serve-data" v-for="(item, index) in serveData" :key="index">
                    <div class="serve-icon" v-if="item.icon"
                         :style="{ backgroundColor: item.bgColor, color: item.color }">
                        <i :class="'fas ' + item.icon"></i>
                    </div>
                    <div class="serve-name">
                        {{ item.name }}
                    </div>
                    <div>
                        <span class="serve-num">{{ item.count }}</span><span>{{ item.unit }}</span>
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
    configValue: fwrcqz,
    getConfigKeyFunc: fetchFwrcqz 
} = useGetConfigKey('brain.redCoreLeadership.fwrcqz')

const serveData = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchFwrcqz(),
    ])
    
    try {
        const parsedData = JSON.parse(fwrcqz.value)
        serveData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        serveData.value = [
            {
                icon: 'fas fa-capsules',
                name: '组织联谊活动',
                count: '2',
                unit: '次',
                bgColor: '#409EFF',
                color: '#FFFFFF'
            },
            {
                icon: 'fas fa-heartbeat',
                name: '提供法律咨询',
                count: '53',
                unit: '次',
                bgColor: '#67C23A',
                color: '#FFFFFF'
            },
            {
                icon: 'fas fa-heartbeat',
                name: '关怀困难员工',
                count: '10',
                unit: '次',
                bgColor: '#E6A23C',
                color: '#FFFFFF'
            }
        ]
    }
}
</script>

<style scoped lang="scss">
.serve-container {
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

.serve-data {
    width: 160px;
    height: 180px;
    background: transparent;
    border-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    color: #ffffff;
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
        content: '🌟';
        position: absolute;
        top: 10px;
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
        border-left: 4px solid #fbbf24;
        
        &::after {
            content: '🤝';
        }
    }
    
    &:nth-child(2) {
        border-left: 4px solid #34d399;
        
        &::after {
            content: '⚖️';
        }
    }
    
    &:nth-child(3) {
        border-left: 4px solid #60a5fa;
        
        &::after {
            content: '❤️';
        }
    }
}

.serve-icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    animation: pulse 2s infinite;
    position: relative;
    z-index: 2;
}

.serve-name {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    position: relative;
    z-index: 2;
    line-height: 1.4;
}

.serve-num {
    font-size: 2.5rem;
    line-height: 3rem;
    font-weight: bold;
    background: linear-gradient(45deg, #fbbf24, #ffffff, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    position: relative;
    z-index: 2;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #fbbf24, transparent);
        animation: glow 2s infinite alternate;
    }
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