<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import mCard from "@/components/mCard/index.vue"
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { listDictData } from "@/api/system";
import { listEnterpriseAll } from "@/api/brain";

// 注册DrawSVGPlugin插件
gsap.registerPlugin(DrawSVGPlugin);

const emit = defineEmits(['starClick', 'animationComplete'])

const enterpriseTypes = ref([])
const isAnimationPlayed = ref(false) // 添加动画执行状态标志

// 定义每个类型的颜色配置
const typeColors = [
    {
        primary: 'rgba(34, 197, 94, 0.9)',   // 绿色
        secondary: 'rgba(22, 163, 74, 0.7)',
        tertiary: 'rgba(21, 128, 61, 0.5)',
        light: '#D1FAE5',
        enterprise: 'rgba(74, 222, 128, 0.9)'
    },
    {
        primary: 'rgba(59, 130, 246, 0.9)',   // 蓝色
        secondary: 'rgba(37, 99, 235, 0.7)',
        tertiary: 'rgba(29, 78, 216, 0.5)',
        light: '#DBEAFE',
        enterprise: 'rgba(96, 165, 250, 0.9)'
    },
    {
        primary: 'rgba(168, 85, 247, 0.9)',   // 紫色
        secondary: 'rgba(147, 51, 234, 0.7)',
        tertiary: 'rgba(126, 34, 206, 0.5)',
        light: '#EDE9FE',
        enterprise: 'rgba(196, 181, 253, 0.9)'
    },
    {
        primary: 'rgba(245, 158, 11, 0.9)',   // 橙色
        secondary: 'rgba(217, 119, 6, 0.7)',
        tertiary: 'rgba(180, 83, 9, 0.5)',
        light: '#FEF3C7',
        enterprise: 'rgba(251, 191, 36, 0.9)'
    },
    {
        primary: 'rgba(239, 68, 68, 0.9)',    // 红色
        secondary: 'rgba(220, 38, 38, 0.7)',
        tertiary: 'rgba(185, 28, 28, 0.5)',
        light: '#FEE2E2',
        enterprise: 'rgba(248, 113, 113, 0.9)'
    },
    {
        primary: 'rgba(16, 185, 129, 0.9)',   // 青色
        secondary: 'rgba(5, 150, 105, 0.7)',
        tertiary: 'rgba(4, 120, 87, 0.5)',
        light: '#D1FAE5',
        enterprise: 'rgba(52, 211, 153, 0.9)'
    },
    {
        primary: 'rgba(236, 72, 153, 0.9)',   // 粉色
        secondary: 'rgba(219, 39, 119, 0.7)',
        tertiary: 'rgba(190, 24, 93, 0.5)',
        light: '#FCE7F3',
        enterprise: 'rgba(244, 114, 182, 0.9)'
    }
];

// 初始化企业类型和企业数据
const initEnterpriseData = async () => {
    try {
        const response = await listDictData('brain_enterprise_type')
        console.log(response)
        
        const typePositions = [
            { x: 18, y: 22 },
            { x: 82, y: 22 },
            { x: 50, y: 50 },
            { x: 15, y: 60 },
            { x: 85, y: 60 },
            { x: 35, y: 80 },
            { x: 65, y: 80 }
        ];
        
        const types = [];
        
        // 循环调用listEnterpriseAll获取所有企业数据
        for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i];
            try {
                const enterpriseResponse = await listEnterpriseAll({ type: item.dictValue })
                enterpriseGroupByType.value[item.dictValue] = enterpriseResponse
                
                // 计算企业围绕类型圆的位置
                const enterprises = enterpriseResponse.map((enterprise, index) => {
                    const angle = (index / enterpriseResponse.length) * 2 * Math.PI;
                    // 根据企业数量动态调整围绕半径
                    const baseRadius = 100; // 基础半径
                    const maxRadius = 120; // 最大半径
                    const minRadius = 90; // 最小半径
                    const enterpriseCount = enterpriseResponse.length;
                    
                    let radius;
                    if (enterpriseCount <= 3) {
                        radius = minRadius; // 企业数量少时距离近
                    } else if (enterpriseCount <= 6) {
                        radius = baseRadius + (enterpriseCount - 3) * 10; // 渐进增加
                    } else {
                        radius = maxRadius; // 企业数量多时距离远
                    }
                    
                    const centerX = 0; // 相对于类型圆中心的偏移
                    const centerY = 0;
                    return {
                        ...enterprise,
                        x: centerX + Math.cos(angle) * radius,
                        y: centerY + Math.sin(angle) * radius,
                        delay: index * 0.1
                    };
                });
                
                types.push({
                    id: item.id,
                    type: item.dictValue,
                    name: item.dictLabel,
                    x: typePositions[i]?.x || 50,
                    y: typePositions[i]?.y || 50,
                    enterprises: enterprises,
                    delay: i * 0.2
                });
                
                console.log(`获取${item.dictLabel}企业数据:`, enterpriseResponse)
            } catch (enterpriseError) {
                console.error(`获取${item.dictLabel}企业数据失败:`, enterpriseError)
                enterpriseGroupByType.value[item.dictValue] = []
                
                types.push({
                    id: item.id,
                    type: item.dictValue,
                    name: item.dictLabel,
                    x: typePositions[i]?.x || 50,
                    y: typePositions[i]?.y || 50,
                    enterprises: [],
                    delay: i * 0.2
                });
            }
        }
        
        enterpriseTypes.value = types;
        console.log('所有企业数据按类型分组:', enterpriseGroupByType.value)
        console.log('企业类型布局数据:', enterpriseTypes.value)
    } catch (error) {
        console.error('获取企业类别数据失败:', error)
        // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
    }
};

onMounted(async () => {
    await initEnterpriseData();
});

let animationTimeline = null;

function handlePageLoadComplete() {
    // 检查动画是否已经执行过，避免重复执行
    if (isAnimationPlayed.value) {
        return
    }
    
    isAnimationPlayed.value = true
    animationTimeline = gsap.timeline();
    
    // 1. 整体容器出现
    animationTimeline.to(".enterprise-cluster", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
    }, 0);
    
    // 2. 企业类型圆依次出现
    enterpriseTypes.value.forEach((type, typeIndex) => {
        animationTimeline.fromTo(`.type-circle-${typeIndex}`,
            { 
                opacity: 0, 
                scale: 0,
                rotation: -180
            },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                duration: 0.6, 
                ease: "back.out(1.7)"
            },
            0.5 + type.delay
        );
        
        // 3. 企业小圆围绕类型圆出现
        type.enterprises.forEach((enterprise, enterpriseIndex) => {
            animationTimeline.fromTo(`.enterprise-circle-${typeIndex}-${enterpriseIndex}`,
                { 
                    opacity: 0, 
                    scale: 0,
                    rotation: -360
                },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotation: 0,
                    duration: 0.4, 
                    ease: "elastic.out(1, 0.3)"
                },
                1.0 + type.delay + enterprise.delay
            );
        });
    });
    
    // 4. 最终整体发光效果
    animationTimeline.to(".enterprise-cluster", {
        filter: "drop-shadow(0 0 20px rgba(48, 220, 255, 0.3))",
        duration: 0.8,
        ease: "power2.out"
    }, 2.0);
    
    // 5. 确保点击事件可用
    animationTimeline.call(() => {
        gsap.set(".type-circle, .enterprise-circle", { pointerEvents: "auto" });
    }, null, 2.2);
    
    // 6. 动画完成后向父组件发送事件
    animationTimeline.call(() => {
        emit('animationComplete');
    }, null, 2.5);
}

// 控制企业列表弹窗显示的状态
const showEnterpriseListDialog = ref(false)
const enterpriseTypeName = ref('')
const enterpriseList = ref(null)
const enterpriseGroupByType = ref({})

async function handleTypeClick(type) {
    // 检查类型数据是否完整
    if (!type.type || !type.name) {
        console.error('企业类型数据不完整:', type);
        return;
    }
    
    try {
        const response = enterpriseGroupByType.value[type.type] || []
        enterpriseList.value = response
        enterpriseTypeName.value = type.name
        showEnterpriseListDialog.value = true
    } catch (error) {
        console.error('获取企业列表数据失败:', error)
    }
}

// 处理企业圆点击事件
function handleEnterpriseClick(enterprise) {
    console.log('点击企业:', enterprise)
    handleGroupClick(enterprise)
}

// 处理图片加载失败
function handleImageError(event) {
    // 图片加载失败时隐藏图片元素
    event.target.style.display = 'none'
    console.log('企业logo加载失败:', event.target.alt)
}

// 暂停轨道动画
function pauseOrbitAnimation(typeIndex) {
    const orbitElement = document.querySelector(`.type-container:nth-child(${typeIndex + 1}) .enterprise-orbit`)
    if (orbitElement) {
        orbitElement.style.animationPlayState = 'paused'
    }
}

// 恢复轨道动画
function resumeOrbitAnimation(typeIndex) {
    const orbitElement = document.querySelector(`.type-container:nth-child(${typeIndex + 1}) .enterprise-orbit`)
    if (orbitElement) {
        orbitElement.style.animationPlayState = 'running'
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
// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    if (animationTimeline) {
        animationTimeline.kill();
    }
})

defineExpose({
    handlePageLoadComplete
})
</script>

<template>
    <div class="innovation-container">
        <!-- 企业集群 -->
        <div class="enterprise-cluster">
            <!-- 企业类型大圆 -->
            <div 
                v-for="(type, typeIndex) in enterpriseTypes"
                :key="`type-${typeIndex}`"
                class="type-container"
                :style="{
                    left: type.x + '%',
                    top: type.y + '%'
                }"
            >
                <!-- 类型大圆 -->
                <div 
                    :class="['type-circle', `type-circle-${typeIndex}`]"
                    :style="{
                        '--primary-color': typeColors[typeIndex % typeColors.length].primary,
                        '--secondary-color': typeColors[typeIndex % typeColors.length].secondary,
                        '--tertiary-color': typeColors[typeIndex % typeColors.length].tertiary,
                        '--light-color': typeColors[typeIndex % typeColors.length].light
                    }"
                    @click="handleTypeClick(type)"
                >
                    <div class="type-glow"></div>
                    <div class="type-core"></div>
                    <div class="type-name">{{ type.name }}</div>
                    <div class="type-count">{{ type.enterprises.length }}</div>
                </div>
                
                <!-- 围绕的企业小圆 -->
                <div 
                    class="enterprise-orbit"
                    :style="{
                        animationDelay: (typeIndex * 0.5) + 's'
                    }"
                >
                    <div 
                        v-for="(enterprise, enterpriseIndex) in type.enterprises"
                        :key="`enterprise-${typeIndex}-${enterpriseIndex}`"
                        :class="['enterprise-circle', `enterprise-circle-${typeIndex}-${enterpriseIndex}`]"
                        :style="{
                            left: enterprise.x + 'px',
                            top: enterprise.y + 'px',
                            '--enterprise-color': typeColors[typeIndex % typeColors.length].enterprise
                        }"
                        @click="handleEnterpriseClick(enterprise)"
                        @mouseenter="pauseOrbitAnimation(typeIndex)"
                        @mouseleave="resumeOrbitAnimation(typeIndex)"
                        :title="enterprise.name"
                    >
                        <div class="enterprise-glow"></div>
                        <div class="enterprise-core"></div>
                        <img 
                            v-if="enterprise.logo" 
                            :src="enterprise.logo" 
                            :alt="enterprise.name"
                            class="enterprise-logo"
                            @error="handleImageError($event)"
                        />
                    </div>
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

/* 企业集群样式 */
.enterprise-cluster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* 初始透明状态 */
    transform: scale(0.5); /* 初始缩放状态 */
}

.type-container {
    position: absolute;
    transform: translate(-50%, -50%);
}

/* 企业轨道容器 */
.enterprise-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: orbitRotation 20s linear infinite;
    transform-origin: center;
}

.enterprise-orbit:hover {
    animation-play-state: paused;
}

/* 企业类型大圆 */
.type-circle {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: 
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
        radial-gradient(circle at center, var(--primary-color, rgba(34, 197, 94, 0.9)) 0%, var(--secondary-color, rgba(22, 163, 74, 0.7)) 40%, var(--tertiary-color, rgba(21, 128, 61, 0.5)) 70%, transparent 100%);
    border: 3px solid var(--primary-color, rgba(34, 197, 94, 0.9));
    box-shadow: 
        0 0 25px var(--primary-color, rgba(34, 197, 94, 0.8)), 
        0 0 50px var(--secondary-color, rgba(22, 163, 74, 0.6)),
        inset 0 0 20px rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    opacity: 0; /* 初始透明状态 */
    transform: scale(0); /* 初始缩放状态 */
    pointer-events: none; /* 初始禁用交互 */
}

.type-circle:hover {
    transform: scale(1.1);
    box-shadow: 
        0 0 35px var(--primary-color, rgba(34, 197, 94, 1)), 
        0 0 70px var(--secondary-color, rgba(22, 163, 74, 0.8)),
        inset 0 0 25px rgba(255, 255, 255, 0.4);
}

.type-glow {
    position: absolute;
    top: -30%;
    left: -30%;
    right: -30%;
    bottom: -30%;
    background: radial-gradient(circle, var(--primary-color, rgba(34, 197, 94, 0.5)) 0%, transparent 70%);
    border-radius: 50%;
    animation: typeGlowPulse 4s ease-in-out infinite;
    z-index: -1;
}

.type-core {
    position: absolute;
    width: 70%;
    height: 70%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, var(--primary-color, rgba(34, 197, 94, 0.7)) 50%, var(--secondary-color, rgba(22, 163, 74, 0.5)) 100%);
    border-radius: 50%;
    animation: typeCoreRotate 10s linear infinite;
}

.type-name {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-shadow: 0 0 10px var(--primary-color, rgba(34, 197, 94, 0.8)), 0 0 20px rgba(0, 0, 0, 0.8);
    z-index: 10;
    margin-bottom: 4px;
}

.type-count {
    color: var(--light-color, #D1FAE5);
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 0 8px var(--primary-color, rgba(34, 197, 94, 0.6));
    z-index: 10;
}

/* 企业小圆 */
.enterprise-circle {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--enterprise-color, rgba(74, 222, 128, 0.9)) 0%, var(--enterprise-color, rgba(74, 222, 128, 0.6)) 60%, transparent 100%);
    border: 3px solid var(--enterprise-color, rgba(74, 222, 128, 0.8));
    box-shadow: 0 0 15px var(--enterprise-color, rgba(74, 222, 128, 0.6));
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 0; /* 初始透明状态 */
    transform: translate(-50%, -50%) scale(0); /* 初始缩放状态 */
    pointer-events: none; /* 初始禁用交互 */
}

.enterprise-circle:hover {
    transform: translate(-50%, -50%) scale(1.3);
    box-shadow: 0 0 25px var(--enterprise-color, rgba(74, 222, 128, 0.9));
    z-index: 15;
}

.enterprise-logo {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    object-fit: contain;
    z-index: 10;
    background: #ffffff;
    border: 2px solid var(--enterprise-color, rgba(74, 222, 128, 0.5));
}

.enterprise-glow {
    position: absolute;
    top: -40%;
    left: -40%;
    right: -40%;
    bottom: -40%;
    background: radial-gradient(circle, var(--enterprise-color, rgba(74, 222, 128, 0.4)) 0%, transparent 70%);
    border-radius: 50%;
    animation: enterpriseGlowPulse 3s ease-in-out infinite;
}

.enterprise-core {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, var(--enterprise-color, rgba(74, 222, 128, 0.4)) 100%);
    border-radius: 50%;
    animation: enterpriseCoreRotate 6s linear infinite;
    z-index: 1;
}

@keyframes orbitRotation {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes typeGlowPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.2); }
}

@keyframes typeCoreRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes enterpriseGlowPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.3); }
}

@keyframes enterpriseCoreRotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
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