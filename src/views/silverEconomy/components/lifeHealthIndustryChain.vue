<template>
    <div class="right-card">
        <m-card title="生命健康产业链">
            <div class="chain-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="tab-container">
                    <div
                        v-for="(tab, index) in tabs"
                        :key="index"
                        class="tab-item"
                        :class="{ active: activeTabIndex === index }"
                        @click="changeTab(index)"
                    >
                        {{ tab.title }}
                    </div>
                </div>

                <div class="directions-container">
                    <div class="directions-grid">
                        <div
                            v-for="(direction, index) in tabs[activeTabIndex]?.content"
                            :key="index"
                            class="direction-card"
                        >
                            <h4 class="card-title">{{ direction.title }}</h4>
                            <ul
                                class="sub-items"
                                :class="{ 'single-column': direction.items.length <= 4 }"
                            >
                                <li
                                    v-for="(item, itemIndex) in direction.items"
                                    :key="itemIndex"
                                >
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from "vue";
import mCard from "@/components/mCard/index.vue";
import {useGetConfigKey} from '@/hooks/useGetConfigKey'

const {
    configValue: smjkcyl,
    getConfigKeyFunc: fetchSmjkcyl
} = useGetConfigKey('brain.silverEconomy.smjkcyl')

const tabs = ref([])

// 当前选中的标签页索引
const activeTabIndex = ref(0)

// 自动切换定时器
let autoSwitchInterval = null

// 切换标签页
const changeTab = (index) => {
    activeTabIndex.value = index
}

// 开始自动切换
const startAutoSwitch = () => {
    stopAutoSwitch(); // 先停止可能存在的定时器
    autoSwitchInterval = setInterval(() => {
        const nextIndex = (activeTabIndex.value + 1) % tabs.value.length;
        changeTab(nextIndex);
    }, 20000); // 20秒切换一次
};

// 停止自动切换
const stopAutoSwitch = () => {
    if (autoSwitchInterval) {
        clearInterval(autoSwitchInterval);
        autoSwitchInterval = null;
    }
};

// 鼠标移入事件处理
const handleMouseEnter = () => {
    stopAutoSwitch();
};

// 鼠标移出事件处理
const handleMouseLeave = () => {
    startAutoSwitch();
};

onMounted(() => {
    init()
    startAutoSwitch() // 启动自动切换
})

onUnmounted(() => {
    stopAutoSwitch() // 组件卸载时停止自动切换
})

async function init() {
// 获取需要的参数
    await Promise.all([
        fetchSmjkcyl(),
    ])

    try {
        const parsedData = JSON.parse(smjkcyl.value)
        tabs.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        tabs.value = [
            {
                title: '两大重点发展方向',
                content: [  // 重点发展方向
                    {
                        title: '高端医疗器械',
                        items: [
                            '体外诊断',
                            '医学影像设备',
                            '生物医用材料',
                            '康复类医疗器械',
                            '植介入器材',
                            '医学影像设备'
                        ]
                    },
                    {
                        title: '大健康消费',
                        items: [
                            '医疗服务',
                            '功能性食品',
                            '健康养老'
                        ]
                    }
                ]
            },
            {
                title: '两大协同发展方向',
                content: [  // 协同发展方向
                    {
                        title: '创新药物治疗',
                        items: [
                            '创新性中药',
                            '生物创新药',
                            '化学创新药'
                        ]
                    },
                    {
                        title: '产业链配套机构',
                        items: [
                            '研发生产CRO',
                            'CDMO',
                            '中试厂房',
                            '...'
                        ]
                    }
                ]
            }
        ]
    }
}
</script>

<style scoped lang="scss">
/* 容器全填充 */
.chain-wrapper {
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

/* --- Tab 切换：斜切切片设计 --- */
.tab-container {
    display: flex;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 2px;
    margin-bottom: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    clip-path: polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%);

    .tab-item {
        flex: 1;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.3s;

        &.active {
            color: #fff;
            font-weight: bold;
            background: linear-gradient(to right, #007bff, #00d2ff);
            clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
        }
    }
}

.directions-container {
    flex: 1;
}

/* --- 栅格布局 --- */
.directions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    height: 100%;
}

.direction-card {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(0, 123, 255, 0.1);
    border-top: 2px solid #007bff;
    padding: 12px 10px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
        background: rgba(0, 123, 255, 0.05);
        border-color: #007bff;
    }

    .card-title {
        font-size: 14px;
        color: #00d2ff;
        text-align: center;
        margin-bottom: 8px;
        font-weight: 600;

        &::after {
            content: '';
            display: block;
            width: 24px;
            height: 1px;
            background: rgba(0, 210, 255, 0.4);
            margin: 4px auto 0;
        }
    }

    /* --- 子项列表：核心逻辑切换 --- */
    .sub-items {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: 1fr 1fr; /* 默认双列 */
        gap: 6px;
        align-content: start;

        /* 当添加 .single-column 类时（长度 3 或 4），变为单列 */
        &.single-column {
            grid-template-columns: 1fr;
        }

        li {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 6px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            border-radius: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.2s;

            &:hover {
                color: #fff;
                background: rgba(0, 123, 255, 0.2);
                border-color: #007bff;
            }

            /* 非单列模式下，单数结尾占满 */
            &:not(.single-column) &:last-child:nth-child(odd) {
                grid-column: span 2;
            }
        }
    }
}
</style>