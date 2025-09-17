<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from "vue";
import mCard from "@/components/mCard/index.vue"
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { listDictData } from "@/api/system";
import { listEnterpriseAll } from "@/api/brain";
import keyEnterpriseData from "@/views/gdMap/map/keyEnterpriseData.js";
import { useRoute } from "vue-router";

// 注册DrawSVGPlugin插件
gsap.registerPlugin(DrawSVGPlugin);

const emit = defineEmits(['starClick'])
const route = useRoute() // 获取路由信息

const stars = ref([
    { id: '', type: '', name: '', x: 15, y: 35, delay: 0, size: 'large' },      // 天枢-勺口最外侧
    { id: '', type: '', name: '', x: 25, y: 15, delay: 0.2, size: 'medium' },    // 天璇-勺口内侧
    { id: '', type: '', name: '', x: 45, y: 18, delay: 0.4, size: 'medium' },    // 天玑-勺口内侧
    { id: '', type: '', name: '', x: 50, y: 40, delay: 0.6, size: 'large' },     // 天权-勺口最内侧
    { id: '', type: '', name: '', x: 65, y: 45, delay: 0.8, size: 'small' },     // 玉衡-斗柄第一节
    { id: '', type: '', name: '', x: 78, y: 47, delay: 1.0, size: 'small' },     // 开阳-斗柄第二节
    { id: '', type: '', name: '', x: 88, y: 42, delay: 1.2, size: 'medium' }     // 摇光-斗柄末端
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

// 监听路由变化，重置动画状态
watch(() => route.path, async (newPath, oldPath) => {
    // 当路由切换到当前页面时，重置动画状态
    if (newPath === '/industryCluster' && oldPath && oldPath !== '/industryCluster') {
        console.log('检测到路由切换到industryCluster，重置动画状态');
        await resetAnimationState();
    }
});

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete);
});

// 重置动画状态的函数
async function resetAnimationState() {
    console.log('重置北斗七星动画状态');
    isAnimationPlayed.value = false;
    
    // 重新初始化星星数据
    await initStars();
    console.log('重新初始化后的stars数据:', stars.value);
    
    // 重置所有动画元素的状态
    gsap.set(".lines path", { drawSVG: "0%", visibility: "hidden" });
    gsap.set(".star", { 
        opacity: 0, 
        scale: 0, 
        rotation: -360,
        pointerEvents: "auto" // 确保点击事件可用
    });
    gsap.set(".big-dipper", { opacity: 0, scale: 0.5 });
    
    // 等待一小段时间确保DOM更新完成
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('动画状态重置完成');
}

function handlePageLoadComplete() {
    // 检查动画是否已经执行过，避免重复执行
    if (isAnimationPlayed.value) {
        console.log('动画已执行过，跳过重复执行');
        return
    }
    
    console.log('开始执行北斗七星动画');
    isAnimationPlayed.value = true
    let tl = gsap.timeline();

    // 初始化状态
    gsap.set(".lines path", { drawSVG: "0%", visibility: "visible" });
    gsap.set(".star", { opacity: 0, scale: 0, rotation: -360 });
    gsap.set(".big-dipper", { opacity: 0, scale: 0.5 });
    
    // 1. 整体容器出现
    tl.to(".big-dipper", {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
    }, 0);
    
    // 2. 连线绘制动画 - 更慢更优雅
    tl.to(".lines path", {
        drawSVG: "100%",
        duration: 4,
        ease: "power2.inOut"
    }, 0.8);
    
    // 3. 北斗七星依次出现 - 增强的3D效果
    stars.value.forEach((star, index) => {
        tl.fromTo(`.star-${index}`,
            { 
                opacity: 0, 
                scale: 0,
                rotation: -360,
                z: -100
            },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                z: 0,
                duration: 1.5, 
                ease: "elastic.out(1, 0.3)"
            },
            2 + star.delay * 0.3
        );
        
        // 每个星星出现后的确认闪烁
        tl.to(`.star-${index} .star-circle`, {
            scale: 1.3,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 3
        }, 2.5 + star.delay * 0.3);
        
        // 文字清晰度增强
        tl.to(`.star-${index} .star-name`, {
            textShadow: "0 0 5px rgba(0,0,0,1), 0 0 10px rgba(48,220,255,1), 1px 1px 2px rgba(0,0,0,1)",
            duration: 0.5,
            ease: "power2.out"
        }, 2.8 + star.delay * 0.3);
    });
    
    // 4. 最终整体发光效果
    tl.to(".big-dipper", {
        filter: "drop-shadow(0 0 30px rgba(48, 220, 255, 0.6)) drop-shadow(0 0 60px rgba(0, 255, 136, 0.4))",
        duration: 2,
        ease: "power2.out"
    }, 5);
    
    // 5. 环形扩散效果启动和动画完成事件
    tl.call(() => {
        // 启动环形动画
        gsap.to(".ring", {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2
        });
        
        // 确保点击事件可用
        gsap.set(".star", { pointerEvents: "auto" });
        
        console.log('北斗七星主体动画完成，准备触发完成事件')
        
        // 发送北斗七星动画完成事件
        const starCompleteEvent = new CustomEvent('starAnimationComplete');
        window.dispatchEvent(starCompleteEvent);
    }, null, 6);  // 保持在6秒时触发，这是合理的时机
}

// 控制企业列表弹窗显示的状态
const showEnterpriseListDialog = ref(false)
const enterpriseTypeName = ref('')
const enterpriseList = ref(null)

async function handleStarClick(star) {
    console.log('点击星星:', star);
    console.log('当前时间:', new Date().toLocaleTimeString());
    console.log('动画状态:', isAnimationPlayed.value);
    
    // 检查星星数据是否完整
    if (!star.type || !star.name) {
        console.error('星星数据不完整:', star);
        alert('星星数据不完整，请稍后再试');
        return;
    }
    
    try {
        console.log('开始调用API, type:', star.type);
        const response = await listEnterpriseAll({ type: star.type })
        console.log('API调用成功:', response);
        enterpriseList.value = response
        enterpriseTypeName.value = star.name
        showEnterpriseListDialog.value = true
    } catch (error) {
        console.error('获取企业列表数据失败:', error)
        alert('获取企业数据失败：' + error.message);
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
}

// 添加一个测试函数
function testClick() {
    console.log('测试点击事件生效！');
    alert('点击事件正常！');
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
                <defs>
                    <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#30DCFF" />
                        <stop offset="33%" stop-color="#00FF88" />
                        <stop offset="66%" stop-color="#8B5CF6" />
                        <stop offset="100%" stop-color="#30DCFF" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/> 
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M15,35
                       L25,15
                       L45,18
                       L50,40
                       L65,45
                       L78,47
                       L88,42"
                    stroke="url(#constellationGradient)"
                    stroke-width="0.3"
                    fill="none"
                    class="constellation-line"
                    filter="url(#glow)"
                />
            </svg>
            
            <!-- 星星 -->
            <div 
                v-for="(star, index) in stars"
                :key="`star-${index}`"
                :class="['star', `star-${index}`, `star-${star.size}`]"
                :style="{
                    left: star.x + '%',
                    top: star.y + '%'
                }"
                @click="handleStarClick(star)"
                @mousedown="() => console.log('鼠标按下:', star.name || 'star-' + index)"
                @mouseup="() => console.log('鼠标释放:', star.name || 'star-' + index)"
            >
                <div class="star-circle">
                    <div class="star-glow"></div>
                    <div class="star-core"></div>
                    <div class="star-name">{{ star.name }}</div>
                </div>
                <div class="star-rings">
                    <div class="ring ring-1"></div>
                    <div class="ring ring-2"></div>
                    <div class="ring ring-3"></div>
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
    background: 
        radial-gradient(ellipse at 30% 30%, rgba(48, 220, 255, 0.03) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 70%, rgba(0, 255, 136, 0.02) 0%, transparent 50%),
        radial-gradient(ellipse at center, rgba(139, 92, 246, 0.01) 0%, transparent 70%);
    overflow: hidden;
}

.innovation-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="50" cy="50" r="0.5" fill="%2330DCFF" opacity="0.4"/><circle cx="150" cy="80" r="0.3" fill="%2300FF88" opacity="0.3"/><circle cx="80" cy="150" r="0.4" fill="%238B5CF6" opacity="0.2"/><circle cx="120" cy="20" r="0.2" fill="%2330DCFF" opacity="0.5"/><circle cx="180" cy="140" r="0.3" fill="%2300FF88" opacity="0.2"/></svg>') repeat;
    animation: starField 120s linear infinite;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
}

@keyframes starField {
    0% {
        transform: rotate(0deg) translate(0, 0);
    }
    100% {
        transform: rotate(360deg) translate(5px, 5px);
    }
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
    z-index: 10;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* 不同尺寸的星星 */
.star-large .star-circle {
    width: 110px;
    height: 110px;
}

.star-medium .star-circle {
    width: 85px;
    height: 85px;
}

.star-small .star-circle {
    width: 65px;
    height: 65px;
}

.star:hover {
    transform: translate(-50%, -50%) scale(1.15);
    z-index: 20;
}

.star-circle {
    position: relative;
    border-radius: 50%;
    background: 
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
        radial-gradient(circle at center, rgba(48, 220, 255, 0.9) 0%, rgba(48, 220, 255, 0.6) 40%, rgba(0, 255, 136, 0.4) 70%, transparent 100%);
    border: 2px solid rgba(48, 220, 255, 0.8);
    box-shadow: 
        0 0 15px rgba(48, 220, 255, 0.8), 
        0 0 30px rgba(48, 220, 255, 0.5),
        0 0 45px rgba(48, 220, 255, 0.3),
        inset 0 0 10px rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: starPulse 3s ease-in-out infinite;
    overflow: visible;
}

.star-glow {
    position: absolute;
    top: -20%;
    left: -20%;
    right: -20%;
    bottom: -20%;
    background: radial-gradient(circle, rgba(48, 220, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: glowPulse 4s ease-in-out infinite;
    z-index: -1;
}

.star-core {
    position: absolute;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 1) 0%, rgba(48, 220, 255, 0.8) 40%, rgba(0, 255, 136, 0.6) 100%);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    animation: coreRotate 8s linear infinite;
}

.star-name {
    color: #30DCFF;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    text-shadow: 
        0 0 3px rgba(0, 0, 0, 1),
        0 0 6px rgba(0, 0, 0, 0.8),
        0 0 10px rgba(48, 220, 255, 0.8),
        1px 1px 3px rgba(0, 0, 0, 1),
        -1px -1px 3px rgba(0, 0, 0, 1);
    z-index: 10;
    position: relative;
    line-height: 1.1;
    white-space: nowrap;
    padding: 3px 6px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(48, 220, 255, 0.5);
    backdrop-filter: blur(3px);
    font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.star-rings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.ring {
    position: absolute;
    border: 1px solid rgba(48, 220, 255, 0.3);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.ring-1 {
    width: 120px;
    height: 120px;
    animation: ringPulse 3s ease-in-out infinite;
}

.ring-2 {
    width: 150px;
    height: 150px;
    animation: ringPulse 3s ease-in-out infinite 1s;
    border-color: rgba(0, 255, 136, 0.2);
}

.ring-3 {
    width: 180px;
    height: 180px;
    animation: ringPulse 3s ease-in-out infinite 2s;
    border-color: rgba(139, 92, 246, 0.2);
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
    animation: constellationGlow 6s ease-in-out infinite;
    stroke-dasharray: 2, 1;
    stroke-linecap: round;
}

@keyframes starPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 
            0 0 15px rgba(48, 220, 255, 0.8), 
            0 0 30px rgba(48, 220, 255, 0.5),
            0 0 45px rgba(48, 220, 255, 0.3),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 
            0 0 20px rgba(0, 255, 136, 0.9), 
            0 0 40px rgba(0, 255, 136, 0.6),
            0 0 60px rgba(0, 255, 136, 0.4),
            inset 0 0 15px rgba(255, 255, 255, 0.3);
    }
}

@keyframes glowPulse {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.2);
    }
}

@keyframes coreRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes ringPulse {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.8);
        opacity: 0;
    }
}

@keyframes constellationGlow {
    0%, 100% {
        stroke: #30DCFF;
        filter: drop-shadow(0 0 3px #30DCFF);
    }
    33% {
        stroke: #00FF88;
        filter: drop-shadow(0 0 5px #00FF88);
    }
    66% {
        stroke: #8B5CF6;
        filter: drop-shadow(0 0 4px #8B5CF6);
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