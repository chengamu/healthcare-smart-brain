<template>
    <div class="left-card">
        <m-card title="领域重点企业">
            <div class="enterprise-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="tab-layout">
                    <div class="side-tabs">
                        <div
                            v-for="(tab, index) in tabs"
                            :key="index"
                            class="side-tab-item"
                            :class="{ 'is-active': activeTabIndex === index }"
                            @click="changeTab(index)"
                        >
                            {{ tab.title }}
                        </div>
                    </div>

                    <div class="content-display">
                        <transition name="fade-quick" mode="out-in">
                            <div
                                :key="activeTabIndex"
                                class="enterprise-grid"
                                :class="[`grid-layout-${tabs[activeTabIndex]?.enterprises.length}`]"
                            >
                                <div
                                    v-for="(enterprise, idx) in tabs[activeTabIndex]?.enterprises"
                                    :key="idx"
                                    class="enterprise-card"
                                >
                                    <div class="card-inner">
                                        <div class="ent-header">
                                            <span class="index">#0{{ idx + 1 }}</span>
                                            <span class="ent-name">{{ enterprise.name }}</span>
                                        </div>
                                        <div class="ent-desc">{{ enterprise.description }}</div>
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
    configValue: lyzdqy,
    getConfigKeyFunc: fetchLyzdqy
} = useGetConfigKey('brain.silverEconomy.lyzdqy')

// 定义标签页数据
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
        fetchLyzdqy(),
    ])

    try {
        const parsedData = JSON.parse(lyzdqy.value)
        tabs.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        tabs.value = [
            {
                title: "前沿生物",
                enterprises: [
                    { name: "鑫康合", description: "由著名免疫学家董晨院士领衔、针对自身免疫疾病的创新抗体药项目" },
                    { name: "滨会生物", description: "全球首个以溶瘤病毒为载体、临床进程最快的生物项目" },
                    { name: "微知卓", description: "全球创新、国内首个自主研发的生物人工肝项目" },
                    { name: "汉脉生物", description: "国内脱敏领域第一股——我武生物投资项目" },
                    { name: "优尼康", description: "专注千细胞原研药物研发" },
                ]
            },
            {
                title: "医疗康养",
                enterprises: [
                    { name: "绍兴明州康复医院", description: "以脑康和神经康复为特色" },
                    { name: "绍兴柯北医院", description: "以泌尿外科、肾病和血液透析为特色的二级综合性医院" }
                ]
            },
            {
                title: "健康器械",
                enterprises: [
                    { name: "启达医疗", description: "制氧机、一站式体检设备、生命体征参数管理软件等健康管理器械" },
                    { name: "迅实科技", description: "美国齿科3D打印机第一品牌，年销售超2亿元" },
                    { name: "华芯云生物", description: "全自动微流控生化检测仪" },
                ]
            },
            {
                title: "健康保健",
                enterprises: [
                    { name: "迈亚塔", description: "由徐建国院士领衔的新一代益生菌药品和人体微生物检测项目" },
                    { name: "灵玑生物", description: "胶原蛋白领域实施医美、器械等产品研发项目" }
                ]
            },
            {
                title: "科研生态",
                enterprises: [
                    { name: "绍兴柯桥医学检验技术研究中心", description: "与重庆医科大学共建" },
                    { name: "绍兴(柯桥)生物医药创新中心", description: "与海内外顶尖人才团队围绕医学转化领域，全力争创省级重点实验室，为建设银发经济创新高地提供强力支撑" }
                ]
            }
        ]
    }
}

</script>

<style scoped lang="scss">
.enterprise-wrapper {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}

.tab-layout {
    display: flex;
    height: 100%;
    gap: 10px;
}

.side-tabs {
    display: flex;
    flex-direction: column;
    width: 76px;
    gap: 8px;
    flex-shrink: 0;

    .side-tab-item {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 12px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            left: 0; top: 0; width: 3px; height: 0;
            background: #00f2ff;
            transition: height 0.3s;
        }

        &.is-active {
            color: #00f2ff;
            background: linear-gradient(90deg, rgba(0, 242, 255, 0.15) 0%, rgba(0, 242, 255, 0.02) 100%);
            border-color: rgba(0, 242, 255, 0.4);
            box-shadow: 0 0 15px rgba(0, 242, 255, 0.1);

            &::before { height: 100%; }

            &::after {
                content: '';
                position: absolute;
                right: -10px; top: -10px;
                width: 20px; height: 20px;
                background: rgba(0, 242, 255, 0.1);
                transform: rotate(45deg);
            }
        }

        &:hover:not(.is-active) {
            color: #fff;
            background: rgba(255, 255, 255, 0.08);
        }
    }
}

.content-display {
    flex: 1;
    height: 100%;
}

.enterprise-grid {
    display: grid;
    gap: 8px;
    height: 100%;
    width: 100%;

    /* 2个企业时：上下平分 */
    &.grid-layout-2 {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 1fr 1fr;
    }

    /* 3个企业时：1大2小或“品”字形 */
    &.grid-layout-3 {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr 1fr;
        .enterprise-card:nth-child(1) {
            grid-column: span 2; // 第一个占满宽度
        }
    }

    /* 5个企业时：紧凑网格 (2+3布局) */
    &.grid-layout-5 {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 1fr 1fr;
        .enterprise-card:nth-child(1), .enterprise-card:nth-child(2) {
            grid-column: span 3; // 第一排两个平分
        }
        .enterprise-card:nth-child(3), .enterprise-card:nth-child(4), .enterprise-card:nth-child(5) {
            grid-column: span 2; // 第二排三个平分
        }
    }
}

/* 企业卡片基础样式 */
.enterprise-card {
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.3s;

    // 卡片装饰角标
    &::before {
        content: '';
        position: absolute;
        top: 0; right: 0;
        width: 6px; height: 6px;
        border-top: 1px solid rgba(0, 242, 255, 0.5);
        border-right: 1px solid rgba(0, 242, 255, 0.5);
        border-radius: 0 4px 0 0;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(0, 242, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

        .ent-header .index {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    .card-inner {
        display: flex;
        flex-direction: column;
        height: 100%;

        .ent-header {
            display: flex;
            align-items: center;

            .index {
                font-size: 10px;
                font-weight: 900;
                color: #00f2ff;
                border-radius: 2px;
                margin-right: 8px;
                font-style: italic;
                transition: all 0.3s;
                opacity: 0.7;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0; width: 20px; height: 1px;
                    background: rgba(0, 242, 255, 0.3);
                }
            }

            .ent-name {
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 0.5px;
                color: #00f2ff;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .ent-desc {
            font-size: 12px;
            line-height: 1.5;
            color: #ffffff;
            // 增加一个微小的顶部边距和线条
            padding-top: 6px;
            position: relative;
            margin: auto 0;
        }
    }
}

/* 针对特定布局的细节微调 */
.grid-layout-5 .enterprise-card { padding: 8px; } /* 5个时稍微压缩内边距 */

/* 过渡动画 */
.fade-quick-enter-active, .fade-quick-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-quick-enter-from, .fade-quick-leave-to { opacity: 0; transform: scale(0.98); }
</style>