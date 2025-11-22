<template>
    <div class="right-card">
        <m-card title="人才项目政策">
            <div class="talent-project-policy-container">
                <div
                    class="talent-project-policy-item"
                    v-for="(item, index) in data"
                    :key="index"
                    :style="{ animationDelay: (index * 0.1) + 's' }"
                >
                    <div class="platform-name">{{ item.name }}</div>
                </div>

                <div class="qdzjzz-title">启动资金资助</div>
                
                <!-- 添加展示 dataQdzjzz 数据的部分 -->
                <div class="qdzjzz-section">
                    <div
                        class="qdzjzz-item"
                        v-for="(item, index) in dataQdzjzz"
                        :key="index"
                        :style="{ animationDelay: (index * 0.1 + data.length * 0.1) + 's' }"
                    >
                        <div class="qdzjzz-name">{{ item.name }}</div>
                        <div class="qdzjzz-value">{{ item.value }}</div>
                    </div>
                </div>
                
                <!-- 添加展示 dataQtzz 数据的部分 -->
                <div class="qtzz-section">
                    <div
                        class="qtzz-item"
                        v-for="(item, index) in dataQtzz"
                        :key="index"
                        :style="{ animationDelay: (index * 0.1 + data.length * 0.1 + dataQdzjzz.length * 0.1) + 's' }"
                    >
                        <div class="qtzz-name">{{ item.name }}</div>
                        <div class="qtzz-desc">{{ item.desc }}<span class="qtzz-value">{{ item.value }}</span>{{ item.desc2 }}</div>
                    </div>
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
    configValue: rcxmzc,
    getConfigKeyFunc: fetchRcxmzc
} = useGetConfigKey('brain.talentEngine.rcxmzc')

const {
    configValue: qdzjzz,
    getConfigKeyFunc: fetchQdzjzz
} = useGetConfigKey('brain.talentEngine.rcxmzc.qdzjzz')

const {
    configValue: qtzz,
    getConfigKeyFunc: fetchQtzz
} = useGetConfigKey('brain.talentEngine.rcxmzc.qtzz')

const data = ref([])
const dataQdzjzz = ref([])
const dataQtzz = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchRcxmzc(),
        fetchQdzjzz(),
        fetchQtzz(),
    ])

    try {
        const parsedData = JSON.parse(rcxmzc.value)
        data.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        data.value = [
            {
                name: "人才+大赛",
            },
            {
                name: "人才+基金",
            },
            {
                name: "人才+平台",
            },
            {
                name: "人才+产业",
            },
        ]
    }

    try {
        const parsedData = JSON.parse(qdzjzz.value)
        dataQdzjzz.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        dataQdzjzz.value = [
            {
                name: "A+类",
                value: "700万元",
            },
            {
                name: "A类",
                value: "500万元",
            },
            {
                name: "B类",
                value: "300万元",
            },
            {
                name: "C类",
                value: "200万元",
            },
            {
                name: "D类",
                value: "100万元",
            },
        ]
    } // 修复缺失的括号

    try {
        const parsedData = JSON.parse(qtzz.value)
        dataQtzz.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        dataQtzz.value = [
            {
                name: "场地补助",
                desc: '人才项目落地6年内，最高补助',
                value: "100万元",
                desc2: '/年'
            },
            {
                name: "投入补助",
                desc: '新购设备投入、研发投入，累计最高补贴',
                value: "500万元",
            },
            {
                name: "融资奖励",
                desc: '引入创投机构、上市公司等投资，最高奖励',
                value: "500万元",
            },
        ]
    }
}
</script>

<style scoped lang="scss">
.talent-project-policy-container {
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

.talent-project-policy-item {
    height: 32px;
    width: calc(25% - 6px);
    box-sizing: border-box;
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.08) 0%,
        rgba(0, 255, 136, 0.06) 50%,
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 0px 8px;
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

.talent-project-policy-item:hover {
    transform: translateY(-3px);
    border-color: #30DCFF;
    box-shadow: 0 8px 25px rgba(48, 220, 255, 0.2);
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.12) 0%,
        rgba(0, 255, 136, 0.08) 50%,
        rgba(139, 92, 246, 0.06) 100%);
}

// 添加 qdzjzz 样式
.qdzjzz-section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 8px;
}

.qdzjzz-item {
    height: 48px;
    width: calc(20% - 7px); // 每行5个元素
    box-sizing: border-box;
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.08) 0%,
        rgba(0, 255, 136, 0.06) 50%,
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 0px 0px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.8s ease-out forwards;
    display: flex;
    flex-direction: column; // 垂直分布 name 和 value
    align-items: center;
    justify-content: space-around;
    cursor: default;
}

.qdzjzz-item:hover {
    transform: translateY(-3px);
    border-color: #30DCFF;
    box-shadow: 0 8px 25px rgba(48, 220, 255, 0.2);
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.12) 0%,
        rgba(0, 255, 136, 0.08) 50%,
        rgba(139, 92, 246, 0.06) 100%);
}

.qdzjzz-name {
    font-size: 14px;
    color: #30DCFF;
    text-align: center;
    line-height: 1.5;
    width: 100%;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.qdzjzz-value {
    font-size: 16px;
    color: #00FF88;
    text-align: center;
    line-height: 1.5;
    width: 100%;
    font-weight: bold;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

// 添加 qtzz 样式
.qtzz-section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 8px;
}

.qtzz-item {
    height: 80px;
    width: calc(33.33% - 6px); // 每行3个元素
    box-sizing: border-box;
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.08) 0%,
        rgba(0, 255, 136, 0.06) 50%,
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 0px 8px;
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

.qtzz-item:hover {
    transform: translateY(-3px);
    border-color: #30DCFF;
    box-shadow: 0 8px 25px rgba(48, 220, 255, 0.2);
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.12) 0%,
        rgba(0, 255, 136, 0.08) 50%,
        rgba(139, 92, 246, 0.06) 100%);
}

.qtzz-name {
    font-size: 14px;
    color: #30DCFF;
    text-align: center;
    line-height: 1.5;
    width: 100%;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.qtzz-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    line-height: 1.5;
    width: 100%;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.qtzz-value {
    color: #00FF88;
    font-weight: bold;
    margin: 0 2px;
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

.qdzjzz-title {
    font-size: 12px;
    line-height: 16px;
    color: #30DCFF;
}
</style>