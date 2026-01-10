<template>
    <div class="left-card">
        <m-card title="业务培训">
            <div class="service-container">
                <div class="service-data" v-for="(item, index) in serviceData" :key="index">
                    <div class="icon-wrapper">
                        <i :class="item.icon || 'fas fa-graduation-cap'"></i>
                    </div>
                    <div class="service-name">{{ item.name }}</div>
                    <div class="service-value">
                        <span class="num">{{ item.num }}</span>
                        <span class="unit">{{ item.unit }}</span>
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
    configValue: ywpx,
    getConfigKeyFunc: fetchYwpx
} = useGetConfigKey('brain.livableEcosystem.ywpx')

const serviceData = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchYwpx(),
    ])

    try {
        const parsedData = JSON.parse(ywpx.value)
        serviceData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备，并添加合适的图标
        serviceData.value = [
            {
                name: '专业知识培训',
                num: 3,
                unit: '次',
                icon: 'fas fa-book'
            },
            {
                name: '资源对接会',
                num: 3,
                unit: '次',
                icon: 'fas fa-hands-helping'
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
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
    border-radius: 16px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 16px 8px;
    box-sizing: border-box;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    border: 1px solid rgba(94, 234, 212, 0.3);
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.1);

    .icon-wrapper {
        font-size: 32px;
        margin-bottom: 10px;
        background: linear-gradient(135deg, #4fd1c5, #38b2ac);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .service-name {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        padding: 0 10px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 12px;
        color: #f1f5f9;
        text-shadow: 0 0 8px rgba(79, 209, 197, 0.5);
    }

    .service-value {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin: 8px 0;

        .num {
            font-size: 32px;
            font-weight: 800;
            color: #4fd1c5;
            text-shadow: 0 0 12px rgba(79, 209, 197, 0.7);
        }

        .unit {
            font-size: 16px;
            margin-left: 6px;
            color: #94a3b8;
            font-weight: 500;
        }
    }

    .progress-bar {
        width: 80%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        margin: 12px 0 6px;
        overflow: hidden;

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4fd1c5, #38b2ac);
            border-radius: 3px;
            transition: width 0.5s ease;
        }
    }

    .progress-text {
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 10px;
    }

    &:hover {
        transform: translateY(-8px) scale(1.03);
        box-shadow: 0 15px 35px rgba(79, 209, 197, 0.5);
        border-color: rgba(79, 209, 197, 0.8);

        .progress-fill {
            background: linear-gradient(90deg, #fbbf24, #f59e0b);
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(79, 209, 197, 0.1) 0%, transparent 70%);
        animation: pulse 3s infinite;
        z-index: 0;
    }

    &::after {
        content: '✦';
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 18px;
        animation: twinkle 2s infinite;
        color: #fbbf24;
        text-shadow: 0 0 8px rgba(251, 191, 36, 0.7);
    }
}

@keyframes slide {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes twinkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
}

@keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.6; }
    50% { transform: scale(1.2); opacity: 0.3; }
    100% { transform: scale(0.8); opacity: 0.6; }
}
</style>