<template>
    <div class="right-card">
        <m-card title="要素资源保障">
            <div class="guarantee-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <!-- 标签页切换 -->
                <div class="tabs">
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

                <!-- 标签页内容 -->
                <div class="tab-content">
                    <!-- 资金支持概览 -->
                    <div v-if="activeTabIndex === 0" class="tab-pane">
                        <div class="funding-cards">
                            <div class="funding-row">
                                <!-- 第一行：3个卡片 -->
                                <div class="funding-card"
                                     v-for="(item, index) in tabs[activeTabIndex]?.content.slice(0, 3)" :key="index">
                                    <div class="funding-main">
                                        <span class="funding-amount">{{ item.amount }}</span>
                                        <span class="funding-unit">{{ item.unit }}</span>
                                        <span class="funding-remark">{{ item.remark }}</span>
                                    </div>
                                    <div class="funding-desc">{{ item.description }}</div>
                                </div>
                            </div>
                            <div class="funding-row">
                                <!-- 第二行：2个卡片 -->
                                <div class="funding-card"
                                     v-for="(item, index) in tabs[activeTabIndex]?.content.slice(3)" :key="index + 3">
                                    <div class="funding-main">
                                        <span class="funding-amount">{{ item.amount }}</span>
                                        <span class="funding-unit">{{ item.unit }}</span>
                                        <span class="funding-remark">{{ item.remark }}</span>
                                    </div>
                                    <div class="funding-desc">{{ item.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 五大支持方向 -->
                    <div v-if="activeTabIndex === 1" class="tab-pane">
                        <div class="direction-grid">
                            <div class="direction-item" v-for="(item, index) in tabs[activeTabIndex]?.content"
                                 :key="index">
                                <div class="direction-content">
                                    <div class="direction-title">{{ item.title }}</div>
                                    <div class="direction-desc">{{ item.description }}</div>
                                </div>
                                <div class="energy-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import mCard from "@/components/mCard/index.vue";
import {useGetConfigKey} from '@/hooks/useGetConfigKey'

const {
    configValue: yszybz,
    getConfigKeyFunc: fetchYszybz
} = useGetConfigKey('brain.silverEconomy.yszybz')

// 合并数据结构
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
        fetchYszybz(),
    ])

    try {
        const parsedData = JSON.parse(yszybz.value)
        tabs.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        tabs.value = [
            {
                title: "资金支持概览",
                content: [
                    {
                        amount: "3400",
                        unit: "万元",
                        remark: "单个产品最高",
                        description: "支持创新药物研发"
                    },
                    {
                        amount: "500",
                        unit: "万元",
                        remark: "单个产品最高",
                        description: "支持高端器械研发"
                    },
                    {
                        amount: "2200",
                        unit: "万元",
                        remark: "单个企业最高",
                        description: "支持产业化发展"
                    },
                    {
                        amount: "456",
                        unit: "万元",
                        remark: "单个企业最高",
                        description: "支持初创型企业发展"
                    },
                    {
                        amount: "3500",
                        unit: "万元",
                        remark: "单个企业最高",
                        description: "人才政策支持"
                    }
                ]
            },
            {
                title: "五大支持方向",
                content: [
                    {
                        title: "企业产业做大做强",
                        description: "按照产业化程度对入驻企业给予分档补贴"
                    },
                    {
                        title: "企业实施创新研发",
                        description: "加快研发平台的建设运营,推动关键前沿技术攻关"
                    },
                    {
                        title: "产业生态优化健全",
                        description: "加大对公共服务平台的培育支持力度,并给予补贴"
                    },
                    {
                        title: "专项空间载体建设",
                        description: "鼓励企业向银发经济生命健康产业方向转型"
                    },
                    {
                        title: "土地要素保障体系",
                        description: "强化要素指标倾斜,全面助力产业集聚,推动集群效应显现"
                    }
                ]
            }
        ]
    }
}
</script>

<style scoped lang="scss">
// 注册自定义属性，用于顺滑的角度动画
@property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

/* 容器全填充 */
.guarantee-wrapper {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

/* --- Tab 切换：等分双切片设计 --- */
.tabs {
    display: flex;
    width: 100%;
    height: 28px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    margin-bottom: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .tab-item {
        flex: 1; /* 平分宽度 */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 3px;

        &.active {
            color: #fff;
            background: rgba(0, 210, 255, 0.25);
            box-shadow: inset 0 0 10px rgba(0, 210, 255, 0.2);
            font-weight: bold;
            // 激活时的修饰点
            &::before, &::after {
                content: '';
                width: 4px;
                height: 4px;
                background: #00d2ff;
                margin: 0 8px;
                transform: rotate(45deg);
            }
        }
    }
}

.tab-content {
    flex: 1;
    overflow: hidden; /* 严禁滚动 */
}

/* --- 资金支持：标准 Grid 网格布局 --- */
.funding-cards {
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 100%;

    .funding-row {
        display: flex;
        gap: 8px;
        flex: 1;

        &:first-child {
            .funding-remark {
                width: 36px;
            }
        }

        .funding-card {
            position: relative;
            padding: 8px; // 稍微增加 padding 增加留白感
            flex: 1;
            border-radius: 12px;
            // 1. 基础轨道线：给一个极细的、带有深度的底色
            border: 1px solid rgba(0, 242, 255, 0.1);
            display: flex;
            flex-direction: column;
            overflow: visible; // 允许光晕溢出卡片
            transition: all 0.5s ease;

            background-image: radial-gradient(circle at 0% 0%, #00f2ff 0%, transparent 10%),
            radial-gradient(circle at 100% 100%, #00f2ff 0%, transparent 10%);

            // --- 2. 外部扩散光晕 (负责“虚”的部分) ---
            &::before {
                content: "";
                position: absolute;
                inset: -2px;
                border-radius: 14px;
                background: conic-gradient(
                        from var(--angle),
                        transparent 70%,
                        rgba(0, 242, 255, 0.3) 85%,
                        transparent 100%
                );
                filter: blur(10px); // 核心：让光晕散开
                transition: opacity 0.4s ease;
                pointer-events: none;
                opacity: 1;
                animation: rotate-angle 3s linear infinite;
            }

            // --- 3. 核心流光线 (负责“实”的部分) ---
            &::after {
                content: "";
                position: absolute;
                inset: -1px;
                padding: 1.5px; // 线条粗细
                border-radius: 12px;
                background: conic-gradient(
                        from var(--angle),
                        transparent 75%,
                        #00f2ff 92%,
                        #fff 100%
                );
                // 只保留边框，扣除中间
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                mask-composite: exclude;
                -webkit-mask-composite: xor;
                transition: opacity 0.4s ease;
                opacity: 1;
                animation: rotate-angle 3s linear infinite;
            }

            // 主金额容器
            .funding-main {
                display: flex;
                align-items: center; // 让金额和单位的底部对齐
                gap: 4px;
                z-index: 1;
                width: 100%;

                .funding-amount {
                    font-size: 18px;
                    font-weight: 800;
                    background: linear-gradient(180deg, #fff 30%, #00d2ff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 0 8px rgba(0, 210, 255, 0.4));
                }

                .funding-unit {
                    font-size: 12px;
                    line-height: 12px;
                    color: #ffffff;
                    margin: auto 0;
                    flex-shrink: 0;
                }

                .funding-remark {
                    font-size: 12px;
                    color: #00d2ff;
                    opacity: 0.8;
                    font-weight: 600;
                    margin-left: auto;
                    flex-shrink: 0;
                }
            }

            .funding-desc {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.6);
                margin: auto 0;
                z-index: 1;
                letter-spacing: 0.3px;
            }
        }
    }
}

/* --- 支持方向：同级并列块设计 --- */
.direction-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    height: 100%;
    // 增加父级计数器，如果你需要 01, 02 序号的话
    counter-reset: grid-counter;

    .direction-item {
        grid-column: span 2;
        position: relative;
        display: flex;
        align-items: center;
        padding: 8px;
        background: rgba(0, 210, 255, 0.05);
        // 1. 基础边框改浅，作为底衬
        border: 1px solid rgba(0, 210, 255, 0.15);
        border-radius: 4px;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: hidden;
        counter-increment: grid-counter;

        // 2. 增强边框：利用伪元素制作“四个角”的加强筋
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            // 使用遮罩或背景切分出四个角
            background:
                linear-gradient(to right, #00d2ff 2px, transparent 2px) 0 0,
                linear-gradient(to bottom, #00d2ff 2px, transparent 2px) 0 0,
                linear-gradient(to left, #00d2ff 2px, transparent 2px) 100% 100%,
                linear-gradient(to top, #00d2ff 2px, transparent 2px) 100% 100%;
            background-repeat: no-repeat;
            background-size: 8px 8px; // 边角高亮线的长度
            opacity: 0.3; // 默认半透明
            transition: 0.3s;
        }

        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
            height: 100%;
            // 丰富斜角装饰：改为带扫描线感的渐变
            background: linear-gradient(120deg,
                transparent 0%,
                rgba(0, 210, 255, 0.1) 50%,
                transparent 100%);
            background-size: 200% 100%;
            transform: skewX(-20deg);
        }

        &:hover {
            // 悬停时边框整体提亮并产生外发光
            border-color: rgba(0, 210, 255, 0.6);
            background: rgba(0, 210, 255, 0.12);
            box-shadow: 0 0 15px rgba(0, 210, 255, 0.2);
            transform: scale(1.02);

            &::before {
                opacity: 1;
                background-size: 15px 15px; // 悬停时角落线条伸长
            }

            &::after {
                // 扫光动画效果
                animation: scan-move 1.5s infinite;
            }
        }

        .direction-content {
            z-index: 1;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
            height: 100%;

            .direction-title {
                font-size: 13px;
                font-weight: 600;
                color: #00d2ff;
                text-shadow: 0 0 5px rgba(0, 210, 255, 0.3);
            }

            .direction-desc {
                font-size: 11px;
                color: rgba(255, 255, 255, 0.8);
                // 限制高度并处理溢出，保证 Grid 对齐
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-top: 2px;
            }
        }

        // 居中逻辑保持你的代码
        &:nth-last-child(2) { grid-column: 1 / 4; }
        &:nth-last-child(1) { grid-column: 4 / 7; }
    }
}

@keyframes scan-move {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* 动画切换 */
.tab-pane {
    height: 100%;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: scale(0.98);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes rotate-angle {
    to {
        --angle: 360deg;
    }
}
</style>