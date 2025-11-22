<script setup>
import {ref, onMounted, computed, watch, nextTick} from 'vue';
import mCard from "@/components/mCard/index.vue"
import CountTo from "@/components/mCountTo/index.js"
import { gsap } from 'gsap';
import {listFundDataAll, listFundTypeAll} from "@/api/brain.js";

const props = defineProps({
    goalValue: {
        type: Number,
        default: 200
    },
    animationDuration: {
        type: Number,
        default: 3
    }
});

const animatedValue = ref(0.0);
const jhztzTypeId = ref('')
const jhztzData = ref('')

// 计算属性
const progressPercentage = computed(() => {
    return Math.min((animatedValue.value / props.goalValue) * 100, 100);
});

// 装饰数据点位置
const getDataPointStyle = (index) => {
    const angle = (index - 1) * 45; // 0, 45, 90, 135, 180度
    const radius = 60 + Math.random() * 20;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        animationDelay: `${index * 0.5}s`
    };
};

// Lifecycle hooks
onMounted(() => {
    init()
});

async function init() {
    await getListFundTypeAll()
    await getListFundDataAll(jhztzTypeId.value)
    // 数据加载完成后启动动画
    await nextTick()
    setTimeout(animateValues, 500);
}

async function getListFundTypeAll() {
    try {
        const response = await listFundTypeAll()
        jhztzTypeId.value = response.find(it => it.code === 'jhztz').id;
    } catch (error) {
        console.error('获取基金类型数据失败:', error)
    }
}

async function getListFundDataAll(id) {
    try {
        const response = await listFundDataAll({fundTypeId: id})
        jhztzData.value = response[response.length - 1].value
    } catch (error) {
        console.error(`获取基金数据失败 (id: ${id}):`, error)
    }
}

// 动画函数
const animateValues = () => {
    // 使用GSAP实现平滑的数字动画
    gsap.to(animatedValue, {
        duration: props.animationDuration,
        value: jhztzData.value,
        ease: "power2.out",
        onUpdate: () => {
            animatedValue.value = parseFloat(animatedValue.value.toFixed(1));
        }
    });
    
    // 添加容器动画
    gsap.fromTo('.investment-container', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );
    
    // 添加信息项动画
    gsap.fromTo('.info-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5, ease: "power3.out" }
    );
};

// 监听数据变化
watch(() => jhztzData.value, () => {
    animateValues();
});

</script>

<template>
    <div class="right-card">
        <m-card title="总投资完成情况">
            <div class="investment-container">
                <!-- 主要数值显示区域 -->
                <div class="main-value-section">
                    <div class="value-display">
                        <div class="current-value">
                            <CountTo 
                                :startVal="0" 
                                :endVal="animatedValue" 
                                :decimals="1" 
                                :duration="3000" 
                                :autoplay="true"
                                class="value-number"
                            />
                            <span class="value-unit">亿元</span>
                        </div>
                        <div class="value-label">当前完成投资</div>
                    </div>
                    
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
                            <div class="progress-text">{{ progressPercentage.toFixed(1) }}%</div>
                        </div>
                        <div class="target-info">
                            <span>目标：{{ props.goalValue }}亿元</span>
                        </div>
                    </div>
                </div>
                
                <!-- 装饰性图形 -->
                <div class="decoration-area">
                    <div class="circle-decoration">
                        <div class="circle circle-1"></div>
                        <div class="circle circle-2"></div>
                        <div class="circle circle-3"></div>
                    </div>
                    
                    <!-- 数据点 -->
                    <div class="data-points">
                        <div class="data-point" v-for="i in 5" :key="i" :style="getDataPointStyle(i)"></div>
                    </div>
                </div>
                
                <!-- 底部信息 -->
                <!-- <div class="info-section">
                    <div class="info-item">
                        <div class="info-label">增长率</div>
                        <div class="info-value">+12.5%</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">项目数</div>
                        <div class="info-value">45个</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">完成度</div>
                        <div class="info-value">{{ progressPercentage.toFixed(0) }}%</div>
                    </div>
                </div> -->
            </div>
        </m-card>
    </div>
</template>

<style scoped lang="scss">
.investment-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.06) 0%, transparent 50%);
        box-sizing: border-box;
}

.main-value-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.value-display {
    text-align: center;
    margin-bottom: 30px;
}

.current-value {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin-bottom: 8px;
}

.value-number {
    font-size: 48px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 20px rgba(48, 220, 255, 0.6);
    margin-right: 8px;
}

.value-unit {
    font-size: 18px;
    color: #00FF88;
    font-weight: 500;
}

.value-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
}

.progress-bar-container {
    width: 100%;
    max-width: 300px;
}

.progress-bar {
    position: relative;
    width: 100%;
    height: 12px;
    background: rgba(48, 220, 255, 0.1);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #30DCFF 0%, #00FF88 50%, #8B5CF6 100%);
    border-radius: 6px;
    transition: width 3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(48, 220, 255, 0.5);
    position: relative;
}

.progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    border-radius: 0 6px 6px 0;
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
}

.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: #ffffff;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.target-info {
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
}

.decoration-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.circle-decoration {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
}

.circle {
    position: absolute;
    border: 1px solid;
    border-radius: 50%;
    opacity: 0.3;
    animation: float 6s ease-in-out infinite;
}

.circle-1 {
    width: 60px;
    height: 60px;
    border-color: #30DCFF;
    animation-delay: 0s;
}

.circle-2 {
    width: 40px;
    height: 40px;
    border-color: #00FF88;
    top: 20px;
    left: 20px;
    animation-delay: 2s;
}

.circle-3 {
    width: 80px;
    height: 80px;
    border-color: #8B5CF6;
    top: -10px;
    left: -10px;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.data-points {
    position: absolute;
    width: 100%;
    height: 100%;
}

.data-point {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #30DCFF;
    border-radius: 50%;
    box-shadow: 0 0 6px #30DCFF;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
}

.info-section {
    display: flex;
    justify-content: space-around;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid rgba(48, 220, 255, 0.2);
}

.info-item {
    text-align: center;
    flex: 1;
}

.info-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 4px;
}

.info-value {
    font-size: 14px;
    color: #30DCFF;
    font-weight: bold;
    text-shadow: 0 0 6px rgba(48, 220, 255, 0.4);
}
</style>