<template>
    <div class="right-card">
        <m-card title="建设内容台账">
            <div class="ledger-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="tabs">
                    <div 
                        v-for="(tab, index) in tabs" 
                        :key="index"
                        class="tab-item"
                        :class="{ active: activeTabIndex === index }"
                        @click="changeTab(index)"
                    >
                        {{ tab.title1 }}<br>
                        {{ tab.title2 }}
                    </div>
                </div>
                
                <div class="tab-content">
                    <div v-if="activeTabIndex === 0" class="tab-pane">
                        <p>{{ tabs[activeTabIndex]?.content }}<span>重点发展领域如下：</span></p>
                        <div class="sub-sections sub-sections-3">
                            <div v-for="(item, idx) in tabs[activeTabIndex]?.subItems" :key="idx" class="field-item">
                                <div class="main-text">{{ item.mainText }}</div>
                                <div class="sub-text" v-if="item.subText">{{ item.subText }}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="activeTabIndex === 1" class="tab-pane">
                        <p>{{ tabs[activeTabIndex]?.content }}</p>
                        <div class="sub-sections sub-sections-2">
                            <div v-for="(item, idx) in tabs[activeTabIndex]?.subItems" :key="idx" class="carrier-item">
                                <div class="main-text">{{ item.mainText }}</div>
                                <div class="sub-text" v-if="item.subText">{{ item.subText }}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="activeTabIndex === 2" class="tab-pane">
                        <p>{{ tabs[activeTabIndex]?.content }}<span>六大特色服务平台如下：</span></p>
                        <div class="sub-sections sub-sections-2">
                            <div v-for="(item, idx) in tabs[activeTabIndex]?.subItems" :key="idx" class="platform-item">
                                <div class="platform-name">{{ item.platform }}</div>
<!--                                <div class="platform-desc">{{ item.description }}</div>-->
                            </div>
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
    configValue: jsnrtz,
    getConfigKeyFunc: fetchFsnrtz
} = useGetConfigKey('brain.silverEconomy.jsnrtz')

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
        fetchFsnrtz(),
    ])

    try {
        const parsedData = JSON.parse(jsnrtz.value)
        tabs.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        tabs.value = [
            {
                title1: "精确产业定位",
                title2: "强化项目招引",
                content: "重点围绕银发经济生命健康产业，着力引进具有卓越创新能力、强大核心竞争力的研发生产类企业和临床试验研发进程快、成果对标国际的优势生命健康类企业。",
                subItems: [
                    {
                        mainText: "前沿生物技术",
                        subText: "干细胞、基因诊疗、生物医学大数据等"
                    },
                    {
                        mainText: "新药创制",
                        subText: "化学药、抗体药物、核酸药物、基因工程药物、新型疫苗、创新中药等"
                    },
                    {
                        mainText: "高端医疗器械",
                        subText: "医用影像设备、医用诊察和监护器械、医用康复器械等"
                    }
                ]
            },
            {
                title1: "建强国有载体",
                title2: "强化窗口展示",
                content: "加快建设浙江省银发经济高质量发展产业园生命健康专项园区(柯桥区)的生命健康岛;建设银发经济专项展示中心。",
                subItems: [
                    {
                        mainText: "银发经济专项展示中心",
                        subText: "作为对外展示、推介窗口，广泛吸引生命健康企业落户，为老年人群的健康长寿提供更多支撑"
                    },
                    {
                        mainText: "生命健康岛",
                        subText: "建设专业载体空间，包括中试厂房、研发大楼、公共设备平台生活配套等"
                    }
                ]
            },
            {
                title1: "创新优化平台",
                title2: "强化集成服务",
                content: "针对银发经济生命健康产业发展需求及特性，全面优化升级六大特色服务平台，助力落户企业发展壮大。",
                subItems: [
                    {
                        platform: "投资服务平台",
                        description: "集成提供企业全生命发展周期的落地服务"
                    },
                    {
                        platform: "技术服务平台",
                        description: "围绕银发经济相关医药类、器械类企业研发需求，提供合作研发服务、专家咨询服务、设备共享服务等"
                    },
                    {
                        platform: "医疗器械一站式服务平台",
                        description: "提供医疗器械产品合规管理服务、CRO/CDMO/CM0技术咨询、委托生产服务等"
                    },
                    {
                        platform: "金融服务平台",
                        description: "为重大优质项目提供产业基金支撑、融资推介、金融贷款服务等"
                    },
                    {
                        platform: "营销服务平台",
                        description: "针对企业后期的市场销售，提供专家辅导、市场调研支持服务"
                    },
                    {
                        platform: "人力资源服务平台",
                        description: "提供企业文化服务、招聘培训服务"
                    }
                ]
            }
        ]
    }
}

</script>

<style scoped lang="scss">
.ledger-wrapper {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

/* --- Tab Item 优化：胶囊式流光设计 --- */
.tabs {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .tab-item {
        flex: 1;
        text-align: center;
        padding: 2px;
        font-size: 12px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.6);
        border-radius: 18px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        border: 1px solid transparent;

        &.active {
            color: #fff;
            background: linear-gradient(135deg, #3a7bd5, #00d2ff);
            box-shadow: 0 4px 12px rgba(58, 123, 213, 0.3);
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        &:hover:not(.active) {
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
        }
    }
}

/* --- 内容区布局 --- */
.tab-content {
    flex: 1;
    overflow-y: auto;
    /* 隐藏滚动条但保留功能 */
    &::-webkit-scrollbar { width: 0; }
    scrollbar-width: none;

    .tab-pane {
        animation: fadeInUp 0.4s ease-out;

        p {
            font-size: 12px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 4px;
            padding: 0 4px;

            span {
                color: #00d2ff;
            }
        }
    }
}

.sub-sections {
    display: grid;
    gap: 4px;

    &.sub-sections-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    &.sub-sections-3 {
        grid-template-columns: repeat(3, 1fr);
    }

    .field-item {
        position: relative;
        padding: 6px 4px 6px 8px;
        // 使用深浅渐变模拟微凸起的玻璃面
        background: linear-gradient(145deg,
            rgba(255, 255, 255, 0.07) 0%,
            rgba(255, 255, 255, 0.02) 100%);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-left: 0; // 取消默认左边框，用伪元素代替

        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        cursor: pointer;

        // 1. 左侧垂直指示条：带有发光效果
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 20%; // 初始状态较短
            height: 60%;
            width: 3px;
            background: #00d2ff;
            border-radius: 0 4px 4px 0;
            box-shadow: 0 0 12px rgba(0, 210, 255, 0.6);
            transition: all 0.3s ease;
        }

        // 2. 悬停状态下的背景增强
        &:hover {
            background: linear-gradient(145deg,
                rgba(255, 255, 255, 0.12) 0%,
                rgba(255, 255, 255, 0.05) 100%);
            transform: translateY(-4px); // 向右微移，产生“被推入”的感觉
            border-color: rgba(0, 210, 255, 0.2);

            &::before {
                top: 0;
                height: 100%; // 指示条伸长至全高
                box-shadow: 0 0 20px rgba(0, 210, 255, 0.8);
            }
        }

        .main-text {
            font-size: 14px;
            font-weight: 700;
            color: #00d2ff;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
            transition: color 0.3s ease;

            // 配合悬停效果
            .field-item:hover & {
                color: #fff; // 悬停时文字反白，强化对比
                text-shadow: 0 0 10px rgba(0, 210, 255, 0.4);
            }
        }

        .sub-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6); // 降低非活跃文本亮度
            line-height: 1.4;
            transition: color 0.3s ease;
            margin: auto 0;

            .field-item:hover & {
                color: rgba(255, 255, 255, 0.9);
            }
        }
    }

    /* --- Carrier-Item 优化：金色边框环绕设计 --- */
    .carrier-item {
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 6px;
        border: 1px solid rgba(0, 210, 255, 0.3);
        transition: background 0.3s;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00d2ff, transparent);
        }

        &:hover {
            background: rgba(0, 210, 255, 0.08);
            border-color: rgba(0, 210, 255, 0.5);
        }

        .main-text {
            font-size: 14px;
            font-weight: 600;
            color: #00d2ff;
            margin-bottom: 2px;
        }

        .sub-text {
            font-size: 12px;
            color: #ffffff;
        }
    }

    /* --- Platform-Item 优化：双色环绕设计 --- */
    .platform-item {
        display: flex;
        align-items: center;
        padding: 8px;
        margin-bottom: 6px;
        background: linear-gradient(90deg, rgba(0, 210, 255, 0.1) 0%, transparent 100%);
        border-radius: 4px;
        position: relative;
        border-left: 2px solid #00d2ff;

        &::after {
            content: '';
            position: absolute;
            right: 10px;
            width: 4px;
            height: 4px;
            background: #00d2ff;
            border-radius: 50%;
            box-shadow: 0 0 8px #00d2ff;
            animation: pulse 2s infinite;
        }

        .platform-name {
            font-size: 12px;
            font-weight: bold;
            color: #00d2ff;
            flex-shrink: 0;
        }

        .platform-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 10px;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
}

/* 动画 */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
    0% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0.4; transform: scale(1); }
}
</style>