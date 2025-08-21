<script setup>
import { ref } from "vue"
import mCard from "@/components/mCard/index.vue"
import keyEnterpriseData from "@/views/gdMap/map/keyEnterpriseData.js";

// 控制弹窗显示的状态
const showDialog = ref(false)
// 当前选中的企业信息
const selectedEnterprise = ref(null)

// 处理点击事件，显示弹窗
const handleGroupClick = (group) => {
    selectedEnterprise.value = group
    showDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
    showDialog.value = false
    selectedEnterprise.value = null
}

// 获取当前企业所属行业

const getCurrentIndustry = () => {
    return keyEnterpriseData.find(group => group.images.some(image => image.name === selectedEnterprise.value.name))?.industry || '未知'
}

</script>

<template>
    <div class="right-card">
        <m-card title="联盟重点企业" :height="838">
            <div class="key-enterprise-container" v-auto-scroll>
                <div
                    v-for="group in keyEnterpriseData"
                    :key="group.industry"
                    class="image-group"
                >
                    <div class="industry">{{ group.industry }}</div>
                    <div class="image-list">
                        <div
                            v-for="image in group.images"
                            :key="image.name"
                            class="image-item"
                            @click="handleGroupClick(image)"
                        >
                            <img :src="image.src" :alt="image.name" />
                            <div class="image-info">
                                <div class="image-name">{{ image.name }}</div>
                                <div class="image-development">发展方向：{{ image.development }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>

    <!-- 弹窗 -->
    <Teleport to="body">
        <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog-content" @click.stop>
                <m-card :title="selectedEnterprise?.name" width="800" height="650">
                    <div class="enterprise-detail">
                        <div class="enterprise-image">
                            <img :src="selectedEnterprise?.src" :alt="selectedEnterprise?.name" />
                        </div>
                        <div class="enterprise-info">
                            <div class="info-item">
                                <label>企业名称：</label>
                                <span>{{ selectedEnterprise?.name }}</span>
                            </div>
                            <div class="info-item">
                                <label>所属行业：</label>
                                <span>{{ getCurrentIndustry() }}</span>
                            </div>
                            <div class="info-item">
                                <label>发展方向：</label>
                                <span>{{ selectedEnterprise?.development }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="enterprise-detail">
                        <div class="enterprise-info">
                            <div class="info-item" v-if="selectedEnterprise?.intro">
                                <span class="intro-text">{{ selectedEnterprise?.intro }}</span>
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.key-enterprise-container {
    height: 100%;
    padding: 8px 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;

    h2 {
        text-align: center;
        margin-bottom: 30px;
        font-size: 24px;
    }

    .image-group {


        .industry {
            margin: 4px 0 ;
            flex-shrink: 0;
            color: #fff;
            font-size: 20px;
            line-height: 32px;
            font-family: "PingFangSc";
            font-weight: 600;
            background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .image-list {
            display: grid;
            grid-template-columns: repeat(1, 1fr); // 改为单列布局
            gap: 16px;

            .image-item {
                position: relative;
                display: flex;
                align-items: center;
                //background: #ffffff;
                border-radius: 4px;
                overflow: hidden;
                width: 100%; // 确保宽度为100%
                cursor: pointer;

                &:hover {
                    background-color: rgba(64, 158, 255, 0.1);
                    border-radius: 4px;
                }
                img {
                    width: 60px; // 固定图片宽度
                    height: 60px;
                    object-fit: contain;
                    border-radius: 16px;
                    border: 1px solid #666;
                    margin: 0 10px 0 0;
                    background: #ffffff;
                }

                .image-info {
                    flex: 1; // 占据剩余空间
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 4px 0;
                    min-width: 0; // 允许文本截断

                    .image-name {
                        color: #ffffff;
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 4px;
                        transform: none; // 移除悬停效果
                        background: none;
                        padding: 0;
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .image-development {
                        color: #D3F8F2;
                        font-size: 12px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
}

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog-content {
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
    max-height: 80%;
    overflow: hidden;
}

.enterprise-detail {
    display: flex;
    padding: 20px 20px 0 20px;
    color: white;

    .enterprise-info {
        flex: 1;
        padding-right: 20px;
        display: flex;
        flex-direction: column;

        .info-item {
            margin: auto 0;

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
            }

            .intro-text {
                display: block;
                white-space: pre-wrap;
                line-height: 1.5;
            }
        }
    }

    .enterprise-image {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;

        img {
            max-width: 100%;
            max-height: 100px;
            border-radius: 4px;
            border: 1px solid #666;
            background: #ffffff;
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