<template>
    <div class="right-card">
        <m-card title="技术平台">
            <div class="technology-platform-container">
                <div 
                    class="technology-platform-item"
                    v-for="(item, index) in data" 
                    :key="index"
                    :style="{ animationDelay: (index * 0.1) + 's' }"
                >
                    <div class="platform-name">{{ item.name }}</div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import mCard from "@/components/mCard/index.vue"
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const {
    configValue: jspt,
    getConfigKeyFunc: fetchJspt
} = useGetConfigKey('brain.innovationDriven.jspt')

const data = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchJspt(),
    ])

    try {
        const parsedData = JSON.parse(jspt.value)
        data.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        data.value = [
            {
                name: "超高通量筛选uHTS平台",
            },
            {
                name: "AI赋能的药物虚拟筛选平台",
            },
            {
                name: "新化学实体设计及合成平台抗体发现平台",
            },
            {
                name: "重组蛋白表达纯化平台",
            },
            {
                name: "药理药效平台",
            },
            {
                name: "体外诊断研发平台",
            },
            {
                name: "微纳米机器人集群孵育检测平台",
            },
            {
                name: "探针免疫层析试制平台",
            },
        ]
    }
}
</script>

<style scoped lang="scss">
.technology-platform-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    gap: 8px;
    background:
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.03) 0%, transparent 50%);
    box-sizing: border-box;
}

.technology-platform-item {
    height: calc(25% - 6px);
    width: calc(50% - 4px);
    box-sizing: border-box;
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.08) 0%,
        rgba(0, 255, 136, 0.06) 50%,
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 2px 16px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.8s ease-out forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    cursor: default;
}

.technology-platform-item:hover {
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

.platform-name {
    font-size: 14px;
    color: #30DCFF;
    text-align: center;
    line-height: 1.5;
    width: 100%;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>