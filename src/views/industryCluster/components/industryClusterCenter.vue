<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref } from "vue";
import mCard from "@/components/mCard/index.vue"
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { listDictData } from "@/api/system";
import { listEnterpriseAll } from "@/api/brain";
import keyEnterpriseData from "@/views/gdMap/map/keyEnterpriseData.js";

// 注册DrawSVGPlugin插件
gsap.registerPlugin(DrawSVGPlugin);

const emit = defineEmits(['starClick'])

const stars = ref([
    { id: '', type: '', name: '', x: 8, y: 34, delay: 0 },      // 斗身-勺口最外侧
    { id: '', type: '', name: '', x: 16, y: 10, delay: 0.2 },    // 斗身-勺口内侧
    { id: '', type: '', name: '', x: 36, y: 12, delay: 0.4 },    // 斗身-勺口内侧
    { id: '', type: '', name: '', x: 41, y: 36, delay: 0.6 },    // 斗身-勺口最内侧
    { id: '', type: '', name: '', x: 58, y: 40, delay: 0.8 },    // 斗柄-第一节
    { id: '', type: '', name: '', x: 75, y: 42, delay: 1.0 },    // 斗柄-第二节
    { id: '', type: '', name: '', x: 91, y: 40, delay: 1.2 }     // 斗柄-末端
]);
const isAnimationPlayed = ref(false) // 添加动画执行状态标志

// 初始化北斗七星数据，按照更准确的勺子形状排列
const initStars = async () => {
    try {
        const response = await listDictData('brain_enterprise_type')
        console.log(response)
        response.data.forEach((item, index) => {
            stars.value[index].id = item.id
            stars.value[index].type = item.dictValue
            stars.value[index].name = item.dictLabel
        });
    } catch (error) {
        console.error('获取企业类别数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
};

onMounted(async () => {
    await initStars();
    window.addEventListener('pageLoaded', handlePageLoadComplete);
});

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete);
});

function handlePageLoadComplete() {
    // 检查动画是否已经执行过，避免重复执行
    if (isAnimationPlayed.value) {
        return
    }
    
    isAnimationPlayed.value = true
    let tl = gsap.timeline();

    // 先隐藏连线
    gsap.set(".lines path", { drawSVG: "0%", visibility: "visible" });
    
    // 添加连线动画
    tl.to(".lines path", {
        drawSVG: "100%",
        duration: 2,
        ease: "power1.inOut"
    }, 1);
    
    // 北斗七星动画
    stars.value.forEach((star, index) => {
        tl.fromTo(`.star-${index}`,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
            1.2 + star.delay
        );
    });
}

// 控制企业列表弹窗显示的状态
const showEnterpriseListDialog = ref(false)
const enterpriseTypeName = ref('')
const enterpriseList = ref(null)

async function handleStarClick(star) {
    try {
        const response = await listEnterpriseAll({ type: star.type })
        enterpriseList.value = response
        enterpriseTypeName.value = star.name
        showEnterpriseListDialog.value = true
    } catch (error) {
        console.error('获取企业列表数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

// 关闭弹窗
const closeEnterpriseListDialog = () => {
    showEnterpriseListDialog.value = false
    enterpriseType.value = ''
    enterpriseList.value = null
}



// 控制弹窗显示的状态
const showEnterpriseDialog = ref(false)
// 当前选中的企业信息
const enterprise = ref(null)

// 处理点击事件，显示弹窗
const handleGroupClick = (group) => {
    enterprise.value = group
    showEnterpriseDialog.value = true
}

// 关闭弹窗
const closeEnterpriseDialog = () => {
    showEnterpriseDialog.value = false
    enterprise.value = null
}
</script>

<template>
    <div class="innovation-container">
        <!-- 北斗七星 -->
        <div class="big-dipper">
            <!-- 连线 -->
            <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d="M8,34
                       L16,10
                       L36,12
                       L41,36
                       L58,40
                       L75,42
                       L91,40"
                    stroke="#00bfff"
                    stroke-width="0.3"
                    fill="none"
                    class="constellation-line"
                />
            </svg>
            
            <!-- 星星 -->
            <div 
                v-for="(star, index) in stars"
                :key="star.id"
                :class="['star', `star-${index}`]"
                :style="{
                    left: star.x + '%',
                    top: star.y + '%'
                }"
                @click="handleStarClick(star)"
            >
                <div class="star-circle">
                    <div class="star-name">{{ star.name }}</div>
                </div>
            </div>
        </div>
    </div>
    <!--企业列表弹窗-->
    <Teleport to="body">
        <div v-if="showEnterpriseListDialog" class="dialog-overlay" @click="closeEnterpriseListDialog">
            <div class="dialog-content" @click.stop>
                <m-card :title="enterpriseTypeName" :width="800" :height="650">
                    <div class="key-enterprise-container" v-auto-scroll>
                        <div class="image-group">
                            <div class="image-list">
                                <div
                                    v-for="enterprise in enterpriseList"
                                    :key="enterprise.name"
                                    class="image-item"
                                    @click="handleGroupClick(enterprise)"
                                >
                                    <img :src="enterprise.logo" :alt="enterprise.name" />
                                    <div class="image-info">
                                        <div class="image-name">{{ enterprise.name }}</div>
                                        <div class="image-development">发展方向：{{ enterprise.developmentName || '-' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
    <!-- 弹窗 -->
    <Teleport to="body">
        <div v-if="showEnterpriseDialog" class="dialog-overlay" @click="closeEnterpriseDialog" style="z-index: 2000">
            <div class="dialog-content" @click.stop style="background: #000000">
                <m-card :title="enterprise?.name" width="800" height="650">
                    <div class="enterprise-detail">
                        <div class="enterprise-image">
                            <img :src="enterprise?.logo" :alt="enterprise?.name" />
                        </div>
                        <div class="enterprise-info">
                            <div class="info-item">
                                <label>企业名称：</label>
                                <span>{{ enterprise?.name }}</span>
                            </div>
                            <div class="info-item">
                                <label>所属行业：</label>
                                <span>{{ enterpriseTypeName }}</span>
                            </div>
                            <div class="info-item">
                                <label>发展方向：</label>
                                <span>{{ enterprise?.developmentName || '-' }}</span>
                            </div>
                            <div class="info-item">
                                <label>企业地址：</label>
                                <span>{{ enterprise?.address || '-' }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="enterprise-detail">
                        <div class="enterprise-info">
                            <div class="info-item" v-if="enterprise?.mainBusiness">
                                <label>主营业务：</label>
                                <span class="intro-text">{{ enterprise?.mainBusiness || '-' }}</span>
                            </div>
                            <div class="info-item" v-if="enterprise?.description">
                                <label>企业描述：</label>
                                <span class="intro-text">{{ enterprise?.description || '-' }}</span>
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.innovation-container {
    width: 100%;
    height: 100%;
    position: relative;
}

/* 添加初始隐藏状态 */
.innovation-container .star {
    opacity: 0;
}

/* 北斗七星样式 */
.big-dipper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.star {
    position: absolute;
    transform: translate(-50%, -50%);
    opacity: 0;
    z-index: 10; /* 确保星星在连线之上 */
    cursor: pointer;
}

.star-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 191, 255, 0.3), rgba(0, 191, 255, 0.1));
    border: 2px solid #00bfff;
    box-shadow: 0 0 15px #00bfff, 0 0 30px rgba(0, 191, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: twinkle 3s infinite alternate;
}

.star-name {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    text-shadow: 0 0 10px #00bfff;
}

.lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* 确保连线在星星之下 */
}

.constellation-line {
    visibility: hidden;
}

@keyframes twinkle {
    0% {
        opacity: 0.7;
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1.05);
    }
}

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
                margin: 8px 0;
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