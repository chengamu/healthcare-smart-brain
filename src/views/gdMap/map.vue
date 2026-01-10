<template>
    <div class="map">
        <canvas id="canvasMap"></canvas>
        <Teleport to="body">
            <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
                <div class="dialog-content" @click.stop :class="props.type">
                    <m-card :title="selectPoint?.name" width="800" :height="type === 'grandBlueprint' ? 530 : 800">
                        <div class="select-point-scroll-container" :class="type">
                            <div class="select-point-container">
                                <div class="select-point-info">
                                    <div class="select-point-title-intro">简&emsp;&emsp;介：</div>
                                    <div class="select-point-content-intro">{{ selectPoint?.intro }}</div>
                                </div>
                                <div class="select-point-info img">
                                    <div class="select-point-title-img">示&ensp;意&ensp;图：</div>
                                    <div class="select-point-content-img">
                                        <img :src="selectPoint?.img" style="width: 100%; height: 100%" alt=""/>
                                    </div>
                                </div>
                                <div class="select-point-info enterpriseList" v-if="type !== 'grandBlueprint'">
                                    <div class="select-point-title-enterprise">入驻企业：</div>
                                    <div class="select-point-content-enterprise">
                                        <div v-for="(enterprise, index) in selectPoint?.enterpriseList" :key="index" class="enterprise-item">
                                            <div class="enterprise-logo">
                                                <img v-if="enterprise.logo" :src="enterprise.logo" alt="企业logo" />
                                                <div v-else class="no-logo"></div>
                                            </div>
                                            <div class="enterprise-info">
                                                <div class="enterprise-name">{{ enterprise.name }}</div>
                                                <div class="enterprise-info">
                                                    <div class="enterprise-category">{{ enterprise.enterpriseCategoryLabel }}</div>
                                                    <div class="enterprise-progress">{{ enterprise.projectProgressLabel }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </m-card>
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup>
import {onMounted, shallowRef, onBeforeUnmount, ref} from "vue";
import mCard from "@/components/mCard/index.vue"
import {World} from "./map.js";
import emitter from "@/utils/emitter";
import {listEnterpriseAll} from "@/api/brain";
import { listDictData } from "@/api/system";

const canvasMap = shallowRef(null);

const category = ref([])
const progress = ref([])

const props = defineProps({
    type: {
        type: String,
        default: 'grandBlueprint'
    },
})

onMounted(() => {
    loadDictData()
    emitter.$on("loadMap", loadMap);
    // 监听barLabelClick事件
    emitter.$on("barLabelClick", handleBarLabelClick);
});
onBeforeUnmount(() => {
    canvasMap.value && canvasMap.value.destroy();
    emitter.$off("loadMap", loadMap);
    // 移除事件监听
    emitter.$off("barLabelClick", handleBarLabelClick);
});

async function loadDictData() {
    const categoryRes = await listDictData('brain_enterprise_category')
    const progressRes = await listDictData('brain_enterprise_progress')
    category.value = categoryRes.data
    progress.value = progressRes.data
    console.log(progress.value)
}

function loadMap(assets) {
    canvasMap.value = new World(document.getElementById("canvasMap"), assets, props.type);
    canvasMap.value.time.pause();
}

// 控制弹窗显示的状态
const showDialog = ref(false)
const selectPoint = ref(null)

async function handleBarLabelClick(item) {
    // 当接收到barLabelClick事件时，可以在这里处理
    console.log('接收到点击事件，名称：', item);
    selectPoint.value = item
    if (props.type === 'silverEconomy') {
        try {
            const response = await listEnterpriseAll({location: item.location, silverEconomy: '1'})
            selectPoint.value.enterpriseList = response.map(item => {
                return {
                    ...item,
                    enterpriseCategoryLabel: category.value.find(it => it.dictValue === item.enterpriseCategory)?.dictLabel,
                    projectProgressLabel: progress.value.find(it => it.dictValue === item.projectProgress)?.dictLabel,
                }
            })
            console.log(selectPoint.value)
        } catch (error) {
            console.error('获取企业列表数据失败:', error)
        }
    }
    showDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
    showDialog.value = false
    selectPoint.value = null
}

async function play() {
    canvasMap.value.time.resume();
    canvasMap.value.animateTl.timeScale(1); // 设置播放速度正常
    canvasMap.value.animateTl.play();
}

defineExpose({
    loadMap,
    play,
    canvasMap,
});
</script>

<style lang="scss">
.map {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #000;

    .info-point {
        background: rgba(0, 0, 0, 0.5);
        color: #a3dcde;
        font-size: 14px;
        width: 170px;
        height: 76px;
        padding: 16px 12px 0;
        margin-bottom: 30px;
        will-change: transform;

        &-wrap {
            &:after,
            &:before {
                display: block;
                content: "";
                position: absolute;
                top: 0;
                width: 15px;
                height: 15px;
                border-top: 1px solid #4b87a6;
            }

            &:before {
                left: 0;
                border-left: 1px solid #4b87a6;
            }

            &:after {
                right: 0;
                border-right: 1px solid #4b87a6;
            }

            &-inner {
                &:after,
                &:before {
                    display: block;
                    content: "";
                    position: absolute;
                    bottom: 0;
                    width: 15px;
                    height: 15px;
                    border-bottom: 1px solid #4b87a6;
                }

                &:before {
                    left: 0;
                    border-left: 1px solid #4b87a6;
                }

                &:after {
                    right: 0;
                    border-right: 1px solid #4b87a6;
                }
            }
        }

        &-line {
            position: absolute;
            top: 7px;
            right: 12px;
            display: flex;

            .line {
                width: 5px;
                height: 2px;
                margin-right: 5px;
                background: #17e5c3;
            }
        }

        &-content {
            .content-item {
                display: flex;
                height: 28px;
                line-height: 28px;
                background: rgba(35, 47, 58, 0.6);
                margin-bottom: 5px;

                .label {
                    width: 60px;
                    padding-left: 10px;
                }

                .value {
                    color: #ffffff;
                }
            }
        }
    }

    .provinces-label {
        &-wrap {
            transform: translate(50%, 200%);
            opacity: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 18px;
            width: 300px;
            height: 80px;
            border-radius: 30px 30px 30px 30px;
            background: rgba(0, 0, 0, 0.4);
        }

        &-wrap.park {
            background: rgba(255, 215, 0, 0.4);
        }

        .number {
            color: #fff;
            font-size: 45px;
            font-weight: 700;
            flex-shrink: 0;

            .unit {
                color: #fff;
                font-size: 18px;
                font-weight: 400;
                opacity: 0.5;
                padding-left: 5px;
            }
        }

        .name {
            color: #fff;
            font-size: 24px;
            font-weight: 700;

            span {
                display: block;
            }

            .en {
                color: #fff;
                font-size: 15px;
                opacity: 0.5;
                font-weight: 700;
            }
        }

        .no {
            color: #7efbf6;
            text-shadow: 0 0 5px #7efbf6, 0 0 10px #7efbf6;
            font-size: 30px;
            font-weight: 700;
        }

        .yellow {
            .no {
                color: #fef99e !important;
                text-shadow: 0 0 5px #fef99e, 0 0 10px #fef99e !important;
            }
        }
    }

    .china-label {
        color: #fff;

        font-size: 12px;
        will-change: transform;

        .other-label {
            display: flex;
            align-items: center;
            padding: 5px;
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.6);
            will-change: transform;
        }

        &.blur {
            filter: blur(2px);
            opacity: 0.5;
        }

        .label-icon {
            display: block;
            width: 20px;
            height: 20px;
            margin: 0 10px 0 0;
        }
    }

    .map-label {
        padding: 5px;
        color: #fff;
        will-change: transform;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 4.5px;
        -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 20%, rgba(255, 255, 255, 0.3));

        .other-label {
            display: flex;
            flex-direction: column;
        }

        span {
            font-size: 46px;

            &:last-child {
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #a7d5ef;
            }
        }
    }

    .decoration-label {
        // &.reflect {
        //   -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 20%, rgba(255, 255, 255, 0.3));
        // }
        // padding-bottom: 10px;
        .label-icon {
            display: block;
            width: 40px;
            height: 40px;
        }
    }

    .other-label {
        transform: translateY(200%);
        opacity: 0;
        background: none;
        will-change: transform;
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

.select-point-scroll-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;

    &.silverEconomy {

        .select-point-container {
            overflow-y: auto;

            .select-point-info {
                flex-shrink: 0;
            }
        }
    }

    .select-point-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;

        .select-point-info {
            display: flex;
            overflow: hidden;

            .select-point-title-intro, .select-point-title-img, .select-point-title-enterprise {
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

            .select-point-content-intro {
                font-size: 16px;
                line-height: 24px;
                color: #ffffff;
            }

            .select-point-content-img {
                flex-grow: 1;
            }

            .select-point-content-enterprise {
                overflow-y: auto;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;

                .enterprise-item {
                    display: flex;
                    flex-direction: row;
                    gap: 8px;
                    padding: 8px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    align-items: center;
                    width: calc(50% - 22px);
                    flex-shrink: 0;

                    .enterprise-logo {
                        flex-shrink: 0;
                        width: 60px;
                        height: 60px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        img {
                            max-width: 60px;
                            max-height: 60px;
                            object-fit: contain;
                        }

                        .no-logo {
                            width: 60px;
                            height: 60px;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px dashed rgba(255, 255, 255, 0.3);
                        }
                    }

                    .enterprise-info {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        gap: 4px;
                    }

                    .enterprise-name {
                        color: #00f2ff;
                        font-size: 14px;
                        font-weight: 600;
                    }

                    .enterprise-info {
                        display: flex;
                        gap: 8px;

                        .enterprise-category, .enterprise-progress {
                            color: #ffffff;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>
