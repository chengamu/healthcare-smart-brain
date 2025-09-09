<script setup>
import { ref } from "vue";
import mCard from "@/components/mCard/index.vue"
import keyTalent from "@/views/gdMap/map/keyTalent.js";
import avatar from "@/assets/images/talentEngine/avatar.png"

const props = defineProps({
    title: {
        type: String,
        default: '联盟重点人才'
    },
    height: {
        type: Number,
        default: 838
    },
    talentData: {
        type: Array,
        default: () => []
    }
})

// 控制弹窗显示的状态
const showTalentDialog = ref(false)
// 当前选中的人才信息
const selectTalent = ref(null)

// 处理点击事件，显示弹窗
const handleGroupClick = (talent) => {
    selectTalent.value = talent
    console.log(selectTalent)
    showTalentDialog.value = true
}

// 关闭弹窗
const closeTalentDialog = () => {
    showTalentDialog.value = false
    selectTalent.value = null
}
</script>

<template>
    <div class="right-card">
        <m-card :title="title" :height="height">
            <div class="key-talent-container" v-auto-scroll>
                <div class="image-list">
                    <div
                        v-for="(talent, index) in talentData"
                        :key="index"
                        class="image-item"
                        @click="handleGroupClick(talent)"
                    >
                        <img :src="talent.avatar || avatar" :alt="talent.name"/>
                        <div class="image-info">
                            <div class="image-name">{{ talent.name }}</div>
                            <div class="image-development">擅长领域：{{ talent.development }}</div>
                            <div class="image-identity">职务：{{ talent.position }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
    <!-- 弹窗 -->
    <Teleport to="body">
        <div v-if="showTalentDialog" class="dialog-overlay" @click="closeTalentDialog" style="z-index: 2000">
            <div class="dialog-content" @click.stop style="background: #000000">
                <m-card :title="selectTalent?.name" :width="800" :height="650">
                    <div class="talent-detail">
                        <div class="talent-image">
                            <img :src="selectTalent?.avatar || avatar" :alt="selectTalent?.name" />
                        </div>
                        <div class="talent-info">
                            <div class="info-item">
                                <label>人才名称：</label>
                                <span>{{ selectTalent?.name }}</span>
                            </div>
                            <div class="info-item">
                                <label>擅长领域：</label>
                                <span>{{ selectTalent?.development || '-' }}</span>
                            </div>
                            <div class="info-item">
                                <label>职务：</label>
                                <span>{{ selectTalent?.position || '-' }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="talent-detail">
                        <div class="talent-info">
                            <div class="info-item" v-if="selectTalent?.honor">
                                <label>个人荣誉：</label>
                                <span class="intro-text">{{ selectTalent?.honor || '-' }}</span>
                            </div>
                            <div class="info-item" v-if="selectTalent?.experience">
                                <label>工作/科研经历/重要成果：</label>
                                <span class="intro-text">{{ selectTalent?.experience || '-' }}</span>
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.key-talent-container {
    height: 100%;
    padding: 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;

    .image-list {
        display: grid;
        grid-template-columns: repeat(1, 1fr); // 改为单列布局
        gap: 16px;

        .image-item {
            position: relative;
            display: flex;
            align-items: center;
            border-radius: 4px;
            overflow: hidden;
            width: 100%; // 确保宽度为100%
            aspect-ratio: auto; // 取消固定宽高比
            cursor: pointer;

            img {
                width: 60px; // 固定图片宽度
                height: 80px;
                object-fit: cover;
                border-radius: 4px;
                border: 1px solid #666;
                margin: 0 10px;
            }

            .image-info {
                flex: 1; // 占据剩余空间
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 4px 0;
                min-width: 0; // 允许文本截断
                gap: 4px;

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
                    margin-bottom: 2px;
                }

                .image-identity {
                    color: #a0d3ff;
                    font-size: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            // 移除悬停效果相关样式
            &:hover .image-name {
                transform: none; // 移除悬停变换
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

.talent-detail {
    display: flex;
    padding: 20px 20px 0 20px;
    color: white;

    .talent-info {
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
                margin: 8px 0;
            }
        }
    }

    .talent-image {
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
    .talent-detail {
        flex-direction: column;

        .talent-info {
            padding-right: 0;
            margin-bottom: 20px;
        }

        .talent-image {
            width: 100%;
        }
    }
}
</style>