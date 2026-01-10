<template>
    <div class="left-card">
        <m-card title="总体建设目标">
            <div class="objectives-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="layout-container">
                    <!-- 左侧：总体目标流 -->
                    <div class="overall-goals-flow">
                        <div
                            v-for="(goal, index) in overallGoals"
                            :key="index"
                            class="goal-tag"
                            :class="{ active: index === activeGoal }"
                        >
                            {{ goal }}
                        </div>
                    </div>

                    <!-- 右侧容器：目标选项卡和内容面板 -->
                    <div class="right-container">
                        <!-- 右上角：目标选项卡 -->
                        <div class="target-tabs">
                            <div
                                v-for="(target, index) in constructionTargets"
                                :key="index"
                                class="tab-item"
                                :class="{ 'is-active': activeTargetIndex === index }"
                                @click="changeTarget(index)"
                            >
                                <div class="tab-icon">
                                    {{ index + 1 }}
                                </div>
                                <span class="tab-label">{{ target.title }}</span>
                            </div>
                        </div>

                        <!-- 右下角：内容面板 -->
                        <div class="content-panel">
                            <transition name="fade-slide" mode="out-in">
                                <div :key="activeTargetIndex" class="detail-box">
                                    <div class="bg-watermark">{{ constructionTargets[activeTargetIndex]?.title }}</div>

                                    <div class="detail-grid" :style="`grid-template-columns: repeat(${constructionTargets[activeTargetIndex]?.details.length}, 1fr);`">
                                        <div
                                            v-for="(desc, idx) in constructionTargets[activeTargetIndex]?.details"
                                            :key="idx"
                                            class="detail-card"
                                        >
                                            <div class="card-header">
                                                <span class="dot"></span>
                                                <span class="subject">{{ desc.subject }}</span>
                                            </div>
                                            <div class="card-body">
                                                <span class="data">{{ desc.data }}</span>
                                                <span class="unit">{{ desc.unit }}</span>
                                            </div>
                                            <div class="card-footer-line"></div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
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
    configValue: ztjsmbOverallGoals,
    getConfigKeyFunc: fetchZtjsmbOverallGoals
} = useGetConfigKey('brain.silverEconomy.ztjsmb.overallGoals')

const {
    configValue: ztjsmbConstructionTargets,
    getConfigKeyFunc: fetchZtjsmbConstructionTargets
} = useGetConfigKey('brain.silverEconomy.ztjsmb.constructionTargets')


// 定义总体目标数据
const overallGoals = ref([])

// 定义建设目标数据
const constructionTargets = ref([])

// 当前选中的总体目标
const activeGoal = ref(0)

// 切换总体目标
const changeGoal = (index) => {
    activeGoal.value = index
}

// 当前选中的建设目标索引
const activeTargetIndex = ref(0)

// 切换建设目标
const changeTarget = (index) => {
    activeTargetIndex.value = index
}

// 自动切换功能
let autoSwitchInterval = null

// 开始自动切换
const startAutoSwitch = () => {
    stopAutoSwitch(); // 先停止可能存在的定时器
    autoSwitchInterval = setInterval(() => {
        const nextIndex = (activeTargetIndex.value + 1) % constructionTargets.value.length;
        changeTarget(nextIndex);
        const nextGoalIndex = (activeGoal.value + 1) % overallGoals.value.length;
        changeGoal(nextGoalIndex);
    }, 20000); // 10秒切换一次
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
        fetchZtjsmbOverallGoals(),
        fetchZtjsmbConstructionTargets(),
    ])

    try {
        const parsedData = JSON.parse(ztjsmbOverallGoals.value)
        overallGoals.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        overallGoals.value = [
            "产业聚集化",
            "创新驱动化",
            "服务优质化",
            "绿色生态化",
            "辐射带动化"
        ]
    }

    try {
        const parsedData = JSON.parse(ztjsmbConstructionTargets.value)
        constructionTargets.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        constructionTargets.value = [
            {
                title: "园区企业数量",
                details: [
                    {
                        subject: "银发生命健康类企业",
                        data: "40",
                        unit: "家",
                    },
                    {
                        subject: "生命健康领域专项企业",
                        data: "5",
                        unit: "家",
                    },
                    {
                        subject: "银发经济生命健康企业占比",
                        data: "70",
                        unit: "%",
                    }
                ]
            },
            {
                title: "产值和关联度",
                details: [
                    {
                        subject: "全年银发生命健康企业产值",
                        data: "3.3",
                        unit: "亿元",
                    },
                    {
                        subject: "全年银发生命健康企业产值同比增长",
                        data: "15",
                        unit: "%",
                    }
                ]
            },
            {
                title: "标志性成果打造",
                details: [
                    {
                        subject: "国家高新技术企业、省级以上“专精特新”企业",
                        data: "1",
                        unit: "家",
                    },
                    {
                        subject: "重大科技创新成果",
                        data: "5",
                        unit: "项",
                    }
                ]
            }
        ]
    }
}

</script>

<style scoped lang="scss">
// 颜色变量
$primary: #00f2ff;
$bg-light: rgba(0, 242, 255, 0.05);
$border-color: rgba(0, 242, 255, 0.2);
$accent-color: rgba(0, 242, 255, 0.8);

.objectives-wrapper {
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
}

.layout-container {
    display: flex;
    height: 100%;
    gap: 20px;
}

// 左侧：总体目标流
.overall-goals-flow {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    flex-shrink: 0;

    .goal-tag {
        // 基础布局与文字
        display: inline-flex; // 改为 inline-flex 适应内容宽度
        align-items: center;
        justify-content: center;
        padding: 8px 20px;
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        letter-spacing: 0.5px;
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        border-radius: 50px; // 圆角更圆润更现代

        // 背景与质感：毛玻璃 + 多层渐变
        background: linear-gradient(135deg,
            rgba(0, 242, 255, 0.15) 0%,
            rgba(0, 242, 255, 0.05) 100%);
        backdrop-filter: blur(8px); // 核心：增加玻璃感
        -webkit-backdrop-filter: blur(8px);

        // 边框细节
        border: 1px solid $border-color;

        // 多重阴影：外发光 + 内发光
        box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.2), // 基础深影
            0 0 10px rgba(0, 242, 255, 0.1), // 柔和外发光
            inset 0 0 8px rgba(0, 242, 255, 0.1); // 内部呼吸感

        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);

        // 扫光动画：更灵动
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.4),
                    transparent
            );
            transform: skewX(-20deg);
            transition: 0.6s;
        }

        // 悬停交互
        &.active {
            color: #fff;
            transform: translateX(2px);
            border-color: rgba(0, 242, 255, 0.6);
            background: linear-gradient(135deg,
                rgba(0, 242, 255, 0.25) 0%,
                rgba(0, 242, 255, 0.1) 100%);
            box-shadow:
                0 8px 25px rgba(0, 242, 255, 0.3),
                inset 0 0 12px rgba(0, 242, 255, 0.2);

            &::before {
                left: 150%;
            }
        }
    }

    // 可选：添加一个细微的色彩循环动画
    @keyframes pulse {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(10deg) brightness(1.2); }
    }

    .goal-tag {
        animation: pulse 4s ease-in-out infinite;
    }
}

// 右侧容器
.right-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    // 右上角：交互选项卡
    .target-tabs {
        display: flex;
        justify-content: space-around;

        .tab-item {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            opacity: 0.6;

            .tab-icon {
                width: 32px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                font-weight: bold;
                font-style: italic;
                color: #fff;
            }

            .tab-label {
                font-size: 13px;
                color: #fff;
            }

            &.is-active {
                opacity: 1;
                transform: translateY(-2px);

                .tab-icon {
                    background: $primary;
                    color: #000;
                    box-shadow: 0 0 15px $primary;
                }

                .tab-label {
                    color: $primary;
                    text-shadow: 0 0 8px rgba(0, 242, 255, 0.5);
                }
            }
        }
    }

    // 右下角：内容详情面板
    .content-panel {
        flex: 1;
        position: relative;
        overflow: hidden;

        .detail-box {
            padding: 8px;
            height: 100%;
            box-sizing: border-box;
            border-radius: 8px;
            position: relative;
            display: flex;
            align-items: center; // 垂直居中，解决底部留白过多的问题

            // 背景装饰水印
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

            .detail-grid {
                display: grid;
                gap: 15px;
                width: 100%;
                z-index: 1;
            }

            .detail-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 12px 8px;
                border-radius: 4px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                &:hover {
                    background: rgba(0, 242, 255, 0.1);
                    border-color: rgba(0, 242, 255, 0.4);
                    transform: scale(1.02);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;

                    .dot {
                        width: 6px;
                        height: 6px;
                        background: $primary;
                        border-radius: 50%;
                        margin-right: 8px;
                        box-shadow: 0 0 8px $primary;
                        flex-shrink: 0;
                    }

                    .subject {
                        font-size: 13px;
                        color: rgba(255, 255, 255, 0.8);
                    }
                }

                .card-body {
                    display: flex;
                    align-items: baseline; // 让数字和单位对齐底边
                    margin-left: auto;

                    .data {
                        font-family: "DIN Alternate", "Arial Black", sans-serif; // 强力推荐使用这类数字字体
                        font-weight: bold;
                        color: $primary;
                        font-size: 26px;
                        text-shadow: 0 0 10px rgba(0, 242, 255, 0.3);
                    }

                    .unit {
                        color: rgba(255, 255, 255, 0.6);
                        margin-left: 6px;
                        font-size: 12px;
                    }
                }

                .card-footer-line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 30%;
                    height: 2px;
                    background: $primary;
                }
            }
        }
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