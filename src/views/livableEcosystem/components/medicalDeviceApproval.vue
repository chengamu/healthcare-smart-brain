<template>
    <div class="left-card">
        <m-card title="医疗器械一站式服务">
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
    configValue: ylqxyzsfw,
    getConfigKeyFunc: fetchYlqxyzsfw
} = useGetConfigKey('brain.livableEcosystem.ylqxyzsfw')

const serviceData = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchYlqxyzsfw(),
    ])

    try {
        const parsedData = JSON.parse(ylqxyzsfw.value)
        serviceData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        serviceData.value = [
            {
                name: '省级柔性服务站专题服务活动',
                num: 3,
                unit: '场次',
                icon: 'fa-hospital',
                bgColor: 'rgba(0, 180, 42, 0.2)',
                color: 'rgb(0, 180, 42)'
            },
            {
                name: '医疗器械相关许可代办',
                num: 2,
                unit: '次',
                icon: 'fa-file-medical',
                bgColor: 'rgba(255, 125, 0, 0.2)',
                color: 'rgb(255, 125, 0)'
            },
            {
                name: '医疗器械产品委托生产',
                num: 3,
                unit: '个',
                icon: 'fa-industry',
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
    align-items: stretch;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    box-sizing: border-box;
    gap: 15px;
}

.service-data {
    flex: 1;
    min-width: 0;
    background: transparent;
    border-radius: 16px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0;
    box-sizing: border-box;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);

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
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 15px 35px rgba(220, 38, 38, 0.5);
        border-color: rgba(239, 68, 68, 0.8);
    }

    &:nth-child(1) {
        border-left: 4px solid #22c55e;

        &::after {
            content: '🏥';
        }
    }

    &:nth-child(2) {
        border-left: 4px solid #f97316;

        &::after {
            content: '📋';
        }
    }

    &:nth-child(3) {
        border-left: 4px solid #ef4444;

        &::after {
            content: '🏭';
        }
    }
}

.service-top, .service-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 12px;
    position: relative;
    z-index: 2;
}

.service-top {
    flex-direction: column;
    margin-bottom: 10px;
}

.service-bottom {
    align-items: center;
    flex-direction: row;
    gap: 8px;
}

.service-icon {
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
    flex-shrink: 0;
}

.service-name {
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    line-height: 1.4;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    max-width: 100%;
    padding: 0 5px;
}

.service-num {
    font-size: 2.2rem;
    line-height: 2.5rem;
    font-weight: bold;
    background: linear-gradient(45deg, #fbbf24, #ffffff, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    position: relative;

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

.service-unit {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    color: #f3f4f6;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
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