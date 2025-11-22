<template>
    <div class="right-card">
        <m-card title="研究院">
            <div class="medical-device-container">
                <!-- 研究院卡片 -->
                <div
                    v-for="(item, index) in instituteData"
                    :key="index"
                    class="device-item"
                    :style="{ animationDelay: `${index * 0.3}s` }"
                >
                    <div class="item-icon">
                        <div class="icon-circle">
                            <span class="icon-text">🏛️</span>
                        </div>
                    </div>

                    <div class="item-title">{{ item.name }}</div>

                    <div class="description">
                        {{ item.description }}
                    </div>

                    <div class="item-actions">
                        <button
                            class="detail-button"
                            @click="handleGroupClick(item.name)"
                        >
                            详情
                        </button>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
    <!-- 弹窗 -->
    <Teleport to="body">
        <div v-if="showResearchInstituteDialog" class="dialog-overlay" @click="closeResearchInstituteDialog" style="z-index: 2000">
            <div class="dialog-content" @click.stop style="background: #000000">
                <m-card :title="institute?.name" :width="800" :height="650">
                    <div class="enterprise-detail">
                        <div class="enterprise-image">
                            <img :src="institute?.logo" :alt="institute?.name" />
                        </div>
                        <div class="enterprise-info">
                            <div class="info-item">
                                <label>企业名称：</label>
                                <span>{{ institute?.name }}</span>
                            </div>
                            <div class="info-item">
                                <label>企业地址：</label>
                                <span>{{ institute?.address || '-' }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="enterprise-detail">
                        <div class="enterprise-info">
                            <div class="info-item" v-if="institute?.mainBusiness">
                                <label>主营业务：</label>
                                <span class="intro-text">{{ institute?.mainBusiness || '-' }}</span>
                            </div>
                            <div class="info-item" v-if="institute?.description">
                                <label>企业描述：</label>
                                <span class="intro-text">{{ institute?.description || '-' }}</span>
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import {ref, onMounted} from "vue"
import mCard from "@/components/mCard/index.vue"
import {listEnterpriseAll} from "@/api/brain";

const instituteData = ref([
    {
        name: '绍兴生物医药创新中心',
        description: '浙江省内唯一专业从事新药研发转化的研究平台'
    },
    {
        name: '重庆医科大学绍兴柯桥医学检验技术研究中心',
        description: '专注高端医学检验领域新技术研发'
    }
])

onMounted(() => {
    // 初始化逻辑（如果需要）
})

// 控制弹窗显示的状态
const showResearchInstituteDialog = ref(false)
// 当前选中的研究院信息
const institute = ref(null)

// 处理点击事件，显示弹窗
const handleGroupClick = async (name) => {
    await getResearchInstituteInfo(name)
    showResearchInstituteDialog.value = true
}

// 关闭弹窗
const closeResearchInstituteDialog = () => {
    showResearchInstituteDialog.value = false
    institute.value = null
}

function getResearchInstituteInfo(name) {
    return listEnterpriseAll({ name: name }).then(res => {
        institute.value = res[0]
    })
}
</script>

<style scoped lang="scss">
.medical-device-container {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 16px;
    gap: 16px;
    background:
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.03) 0%, transparent 50%);
    box-sizing: border-box;
}

.device-item {
    height: 100%;
    width: calc(50% - 8px);
    box-sizing: border-box;
    background: linear-gradient(135deg,
        rgba(48, 220, 255, 0.08) 0%,
        rgba(0, 255, 136, 0.06) 50%,
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 16px;
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

.device-item:hover {
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

.item-icon {
    margin-bottom: 12px;
}

.icon-circle {
    width: 32px;
    height: 32px;
    background: radial-gradient(circle, rgba(48, 220, 255, 0.2), rgba(48, 220, 255, 0.05));
    border: 2px solid rgba(48, 220, 255, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: iconPulse 3s ease-in-out infinite;
}

.icon-text {
    font-size: 18px;
    filter: brightness(1.2);
}

@keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.item-title {
    font-size: 16px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.4);
    text-align: center;
    margin-bottom: 12px;
    line-height: 20px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.description {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    line-height: 1.5;
}

.item-actions {
    align-self: flex-end;
    margin-top: auto;
}

.detail-button {
    background: linear-gradient(135deg, #30DCFF 0%, #00FF88 100%);
    border: none;
    border-radius: 4px;
    color: #000;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(48, 220, 255, 0.3);
}

.detail-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(48, 220, 255, 0.5);
}

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
}

.dialog-content {
    border-radius: 12px;
    width: 80%;
    max-width: 800px;
    max-height: 80%;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(64, 158, 255, 0.4);
    animation: dialogAppear 0.3s ease-out;
}

@keyframes dialogAppear {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.enterprise-detail {
    display: flex;
    padding: 20px 20px 0 20px;
    color: white;
    //background: rgba(20, 20, 30, 0.95);
    border-radius: 8px;

    .enterprise-info {
        flex: 1;
        padding-right: 20px;
        display: flex;
        flex-direction: column;

        .info-item {
            //margin: 12px 0;
            //padding: 12px;
            //border-radius: 6px;
            //background: rgba(30, 30, 40, 0.7);
            //border: 1px solid rgba(64, 158, 255, 0.3);

            label {
                flex-shrink: 0;
                color: #fff;
                font-size: 16px;
                line-height: 20px;
                font-family: "PingFangSc";
                font-weight: 600;
                background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            span {
                color: #ffffff;
                font-size: 15px;
                line-height: 1.6;
            }

            .intro-text {
                display: block;
                white-space: pre-wrap;
                line-height: 1.6;
                margin: 8px 0;
                color: #e0e0e0;
            }
        }
    }

    .enterprise-image {
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;

        img {
            max-width: 100%;
            max-height: 120px;
            border-radius: 8px;
            border: 2px solid rgba(64, 158, 255, 0.5);
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
    }
}

@media (max-width: 768px) {
    .enterprise-detail {
        flex-direction: column;

        .enterprise-info {
            padding-right: 0;
            margin-bottom: 20px;
        }

        .enterprise-image {
            width: 100%;
        }
    }
}
</style>