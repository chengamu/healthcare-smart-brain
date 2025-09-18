<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

const emit = defineEmits(['animationComplete']);

// 状态管理
const showDecorations = ref(false);    // 是否显示红色装饰元素

const containerRef = ref(null);

let animationTimeline = null;
let decorationAnimations = [];

function handlePageLoadComplete() {
    // 页面加载完成后启动动画
    nextTick(() => {
        showDecorations.value = true;
        
        // 启动装饰元素动画
        nextTick(() => {
            initDecorationAnimations();
            
            // 通知其他组件页面加载完成
            const event = new CustomEvent('pageLoaded');
            window.dispatchEvent(event);
        });
    });
}

function initDecorationAnimations() {
    // 创建装饰元素动画时间线
    animationTimeline = gsap.timeline();
    
    // 星星闪烁动画
    animationTimeline.to('.decoration-star', {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // 粒子漂浮动画
    animationTimeline.to('.floating-particle', {
        opacity: 0.8,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");
    
    // 光环脉冲动画
    animationTimeline.to('.pulse-ring', {
        opacity: 0.6,
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
    }, "-=1");
    
    // 启动持续动画
    startContinuousAnimations();
}

function startContinuousAnimations() {
    // 星星持续闪烁
    gsap.to('.decoration-star', {
        opacity: 0.3,
        duration: 2,
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
        ease: "power2.inOut"
    });
    
    // 粒子漂浮
    gsap.to('.floating-particle', {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 4,
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
        ease: "power1.inOut"
    });
    
    // 光环脉冲
    gsap.to('.pulse-ring', {
        scale: 1.5,
        opacity: 0.2,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        onComplete: () => {
            // 动画完成后向父组件发送事件
            emit('animationComplete');
        }
    });
}

onMounted(() => {
    // 直接启动装饰动画
    handlePageLoadComplete();
});

// 在组件卸载前清理
onBeforeUnmount(() => {
    if (animationTimeline) {
        animationTimeline.kill();
    }
});

defineExpose({
    handlePageLoadComplete
})
</script>

<template>
    <div ref="containerRef" class="center-container">
        <!-- 红色装饰元素层 -->
        <div 
            class="decorations-layer"
            :class="{ 'active': showDecorations }"
        >
            <!-- 星星装饰 -->
            <div class="decoration-star star-1">⭐</div>
            <div class="decoration-star star-2">✦</div>
            <div class="decoration-star star-3">★</div>
            <div class="decoration-star star-4">✧</div>
            <div class="decoration-star star-5">⋆</div>
            
            <!-- 漂浮粒子 -->
            <div class="floating-particle particle-1"></div>
            <div class="floating-particle particle-2"></div>
            <div class="floating-particle particle-3"></div>
            <div class="floating-particle particle-4"></div>
            <div class="floating-particle particle-5"></div>
            
            <!-- 脉冲光环 -->
            <div class="pulse-ring ring-1"></div>
            <div class="pulse-ring ring-2"></div>
            <div class="pulse-ring ring-3"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.center-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: transparent; // 改为透明背景
}

// 装饰元素层
.decorations-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    pointer-events: none;
    
    &.active {
        opacity: 1;
    }
}

// 星星装饰样式
.decoration-star {
    position: absolute;
    font-size: 24px;
    color: #dc2626;
    opacity: 0;
    transform: scale(0.5);
    filter: drop-shadow(0 0 8px #dc2626);
    animation: twinkle 3s infinite;
    
    &.star-1 {
        top: 15%;
        left: 20%;
        font-size: 32px;
        animation-delay: 0s;
    }
    
    &.star-2 {
        top: 25%;
        right: 25%;
        font-size: 28px;
        animation-delay: 0.5s;
    }
    
    &.star-3 {
        bottom: 30%;
        left: 15%;
        font-size: 36px;
        animation-delay: 1s;
    }
    
    &.star-4 {
        bottom: 20%;
        right: 20%;
        font-size: 24px;
        animation-delay: 1.5s;
    }
    
    &.star-5 {
        top: 40%;
        left: 50%;
        transform: translateX(-50%) scale(0.5);
        font-size: 30px;
        animation-delay: 2s;
    }
}

// 漂浮粒子
.floating-particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #dc2626 0%, #ef4444 50%, transparent 100%);
    border-radius: 50%;
    opacity: 0;
    box-shadow: 0 0 12px #dc2626;
    
    &.particle-1 {
        top: 20%;
        left: 30%;
    }
    
    &.particle-2 {
        top: 60%;
        right: 30%;
    }
    
    &.particle-3 {
        bottom: 40%;
        left: 40%;
    }
    
    &.particle-4 {
        top: 35%;
        right: 15%;
    }
    
    &.particle-5 {
        bottom: 25%;
        left: 60%;
    }
}

// 脉冲光环
.pulse-ring {
    position: absolute;
    border: 2px solid rgba(220, 38, 38, 0.6);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.8);
    
    &.ring-1 {
        top: 30%;
        left: 25%;
        width: 80px;
        height: 80px;
    }
    
    &.ring-2 {
        bottom: 35%;
        right: 30%;
        width: 60px;
        height: 60px;
    }
    
    &.ring-3 {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        width: 100px;
        height: 100px;
    }
}

// 动画定义
@keyframes twinkle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.6;
    }
    50% {
        transform: translateY(-10px) rotate(180deg);
        opacity: 1;
    }
}

// 硬件加速优化
.decorations-layer {
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: opacity, transform;
}

.center-container {
    transform: translateZ(0);
    backface-visibility: hidden;
}
</style>