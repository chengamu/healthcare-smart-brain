<template>
    <div class="left-card">
        <m-card title="现有能力平台">
            <div class="platform-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="tab-container">
                    <!-- 标签页头部 -->
                    <div class="tab-header">
                        <div
                            v-for="(tab, index) in tabs"
                            :key="index"
                            class="tab-item"
                            :class="{ 'is-active': activeTabIndex === index }"
                            @click="changeTab(index)"
                        >
                            <span class="tab-label">{{ tab }}</span>
                        </div>
                    </div>

                    <!-- 标签页内容 -->
                    <div class="tab-content">
                        <transition name="fade-slide" mode="out-in">
                            <div :key="activeTabIndex" class="content-panel">
                                <div class="bg-watermark">{{ tabs[activeTabIndex] }}</div>
                                <div class="content-text">
                                    <div v-if="activeTabIndex === 0" class="stats-grid">
                                        <div
                                            v-for="(item, index) in developmentStats"
                                            :key="index"
                                            class="stat-item"
                                        >
                                            <div class="stat-value">{{ item.number }}<span
                                                class="stat-unit">{{ item.unit }}</span></div>
                                            <div class="stat-label">{{ item.label }}</div>
                                        </div>
                                    </div>
                                    <div v-else-if="activeTabIndex === 1" class="stats-grid">
                                        <div
                                            v-for="(item, index) in advantageStats"
                                            :key="index"
                                            class="stat-item"
                                        >
                                            <div class="stat-value">{{ item.title }}</div>
                                            <div class="stat-label">{{ item.summary }}</div>
                                        </div>
                                    </div>
                                    <div v-else-if="activeTabIndex === 2" class="stats-grid" style="grid-template-columns: repeat(2, 1fr);">
                                        <div
                                            v-for="(item, index) in parkOneIslandOneValley"
                                            :key="index"
                                            class="stat-item"
                                        >
                                            <div class="stat-value">{{ item.title }}</div>
                                            <div class="stat-label">{{ item.summary }}</div>
                                        </div>
                                    </div>
                                    <div v-else-if="activeTabIndex === 3" class="stats-grid">
                                        <div
                                            v-for="(item, index) in parkDevelopmentProgress"
                                            :key="index"
                                            class="stat-item"
                                        >
                                            <div class="stat-value">{{ item.number }}<span
                                                class="stat-unit">{{ item.unit }}</span></div>
                                            <div class="stat-label">{{ item.label }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
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
    configValue: xynlpt,
    getConfigKeyFunc: fetchXynlpt
} = useGetConfigKey('brain.silverEconomy.xynlpt')

const {
    configValue: xynlptDevelopmentStats,
    getConfigKeyFunc: fetchXynlptDevelopmentStats
} = useGetConfigKey('brain.silverEconomy.xynlpt.developmentStats')

const {
    configValue: xynlptAdvantageStats,
    getConfigKeyFunc: fetchXynlptAdvantageStats
} = useGetConfigKey('brain.silverEconomy.xynlpt.advantageStats')

const {
    configValue: xynlptParkOneIslandOneValley,
    getConfigKeyFunc: fetchXynlptParkOneIslandOneValley
} = useGetConfigKey('brain.silverEconomy.xynlpt.parkOneIslandOneValley')

const {
    configValue: xynlptParkDevelopmentProgress,
    getConfigKeyFunc: fetchXynlptParkDevelopmentProgress
} = useGetConfigKey('brain.silverEconomy.xynlpt.parkDevelopmentProgress')

// 定义标签页数据
const tabs = ref([])

// 柯桥区发展背景
const developmentStats = ref([])

// 柯桥区优势条件
const advantageStats = ref([])

// 园区基本情况
const parkOneIslandOneValley = ref([])

// 园区发展现状
const parkDevelopmentProgress = ref([])

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
        fetchXynlpt(),
        fetchXynlptDevelopmentStats(),
        fetchXynlptAdvantageStats(),
        fetchXynlptParkOneIslandOneValley(),
        fetchXynlptParkDevelopmentProgress(),
    ])

    try {
        const parsedData = JSON.parse(xynlpt.value)
        tabs.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        tabs.value = [
            "柯桥区发展背景",
            "柯桥区优势条件",
            "园区基本情况",
            "园区发展现状",
        ]
    }

    try {
        const parsedData = JSON.parse(xynlptDevelopmentStats.value)
        developmentStats.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        developmentStats.value = [
            {
                number: "13",
                label: "养老机构",
                unit: "家"
            },
            {
                number: "25",
                label: "镇级养老服务中心",
                unit: "家"
            },
            {
                number: "294",
                label: "村级养老服务中心",
                unit: "家"
            },
            {
                number: "73",
                label: "老年食堂",
                unit: "个"
            },
            {
                number: "158",
                label: "老年助餐点",
                unit: "个"
            },
            {
                number: "98%",
                label: "助餐服务覆盖率",
                unit: "以上"
            }
        ]
    }
    
    try {
        const parsedData = JSON.parse(xynlptAdvantageStats.value)
        advantageStats.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        advantageStats.value = [
            {
                title: "区位优势",
                summary: "长三角核心地带，交通便利",
            },
            {
                title: "产业基础",
                summary: "制造业为基，'133'产业体系，产业链完善",
            },
            {
                title: "政策支持",
                summary: "系列扶持政策，专项资金保障"
            },
            {
                title: "人才资源",
                summary: "丰富人才资源，校企合作机制"
            },
            {
                title: "创新能力",
                summary: "企业创新能力强，核心竞争力高"
            }
        ]
    }
    
    try {
        const parsedData = JSON.parse(xynlptParkOneIslandOneValley.value)
        parkOneIslandOneValley.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        parkOneIslandOneValley.value = [
            {
                title: "生命健康岛",
                summary: "总规划面积1100亩，分三期建设，目前一、二期900余亩已启动。由“企业生产中心+国有孵化中心”组成，打造集研发、产业、公共服务于一体的创新创业综合功能区。"
            },
            {
                title: "东盛慧谷",
                summary: "总占地面积150亩、总建筑面积28万平方米，由东盛实业集团开发运营。构建研发办公、生产、医疗创新、综合服务四大区块，形成“众创空间+孵化器+加速器+产业园”全周期成果转化链条。"
            }
        ]
    }
    
    try {
        const parsedData = JSON.parse(xynlptParkDevelopmentProgress.value)
        parkDevelopmentProgress.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        parkDevelopmentProgress.value = [
            {
                number: "7",
                label: "产业化用地开发项目",
                unit: "个"
            },
            {
                number: "5",
                label: "其中厂房主体已建设结顶项目",
                unit: "个"
            },
            {
                number: "2",
                label: "其中即将开工建设项目",
                unit: "个"
            },
            {
                number: "29",
                label: "生命健康领域科技型企业",
                unit: "家"
            },
            {
                number: "20",
                label: "国家级、省级等各类高层次人才",
                unit: "名"
            },
            {
                number: "2",
                label: "其中院士",
                unit: "名"
            }
        ]
    }
}

</script>

<style scoped lang="scss">

.platform-wrapper {
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
}

.tab-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 4px;
}

// 标签页头部样式
.tab-header {
    display: flex;
    gap: 12px; // 使用 gap 替代 margin，布局更优雅
    justify-content: space-between;
    flex-shrink: 0;
    padding: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05); // 增加一条极细的底线

    .tab-item {
        position: relative;
        cursor: pointer;
        padding: 4px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.5); // 默认低亮度
        background: transparent; // 默认透明背景

        .tab-label {
            font-size: 13px;
            font-weight: 500;
            z-index: 1;
            transition: all 0.3s ease;
        }

        // 底部指示条：初始状态宽度为 0
        &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 50%;
            width: 0;
            height: 2px;
            background: #00f2ff;
            box-shadow: 0 0 10px rgba(0, 242, 255, 0.8);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }

        // 悬停效果：文字稍微变白，背景微亮
        &:hover {
            color: rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.03);

            &::after {
                width: 40%; // 悬停时指示条伸出一点点
                opacity: 0.5;
            }
        }

        // 激活状态：彻底蜕变
        &.is-active {
            color: #00f2ff;
            background: transparent; // 保持透明，靠光效取胜
            opacity: 1;

            .tab-label {
                font-weight: 600;
                // 文字发光效果
                text-shadow: 0 0 8px rgba(0, 242, 255, 0.5);
            }

            &::after {
                width: 100%; // 指示条全满
                opacity: 1;
            }

            // 增加一个顶部的微弱光晕，增加立体感
            &::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(
                        circle at center,
                        rgba(0, 242, 255, 0.1) 0%,
                        transparent 70%
                );
                pointer-events: none;
            }
        }
    }
}

// 标签页内容样式
.tab-content {
    flex: 1;
    position: relative;
    overflow: hidden;

    .content-panel {
        height: 100%;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;

        .bg-watermark {
            position: absolute;
            right: -10px;
            bottom: -10px;
            font-size: 40px;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.03);
            font-style: italic;
            pointer-events: none;
            text-transform: uppercase;
        }

        .content-text {
            font-size: 14px;
            line-height: 1.6;
            color: #fff;
            z-index: 1;
            flex: 1;
            display: flex;
            align-items: center;
        }
    }
}

// 数据统计网格样式
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
}

.stat-item {
    position: relative;
    padding: 0 8px;
    background: rgba(0, 15, 20, 0.4); // 更深邃的基底色
    // 使用网格背景增加科技感
    background-image:
        radial-gradient(circle at 2px 2px, rgba(0, 242, 255, 0.05) 1px, transparent 0);
    background-size: 8px 8px;

    border: 1px solid rgba(0, 242, 255, 0.15);
    border-radius: 4px; // 减小圆角，配合切角风格更硬朗

    // 1. 使用 clip-path 做一个科技感切角
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;

    // 2. 左上角 L 型装饰
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 8px;
        border-top: 2px solid #00f2ff;
        border-left: 2px solid #00f2ff;
        background: transparent; // 覆盖掉之前的全高度背景
        transition: 0.3s;
    }

    // 3. 右下角 L 型装饰
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 8px;
        height: 8px;
        border-bottom: 2px solid #00f2ff;
        border-right: 2px solid #00f2ff;
        transition: 0.3s;
    }

    &:hover {
        background-color: rgba(0, 242, 255, 0.08);
        border-color: rgba(0, 242, 255, 0.4);
        transform: scale(1.02); // 轻微放大比位移更有“激活”感
        box-shadow: inset 0 0 15px rgba(0, 242, 255, 0.1);

        &::before, &::after {
            width: 100%;
            height: 100%;
            opacity: 0.2; // 悬停时边框线条延伸
        }
    }

    .stat-value {
        font-family: 'Orbitron', 'PingFang SC', sans-serif; // 建议用等宽科技字体
        font-size: 18px;
        font-weight: bold;
        color: #00f2ff;
        text-shadow: 0 0 10px rgba(0, 242, 255, 0.3);
    }

    .stat-label {
        font-size: 12px;
        color: #ffffff;
        margin-bottom: 6px;
        line-height: 14px;
        min-height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .stat-unit {
        font-size: 12px;
        color: #ffffff;
        margin-bottom: 4px;
        margin-left: 4px;
        font-weight: normal;
    }
}

// 动画
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.4s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>