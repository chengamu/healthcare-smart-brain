<script setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

let animationTimeline = null;

function handlePageLoadComplete() {
    // 页面加载完成后启动动画
    nextTick(() => {
        initAnimations();
    });
}

function initAnimations() {
    // 创建时间线
    animationTimeline = gsap.timeline();
    
    // 设置初始状态 - 所有元素透明
    animationTimeline.set('.base, .wheat-left, .wheat-right, .flag-1, .flag-2, .star1, .star2, .star3, .star4, .star5, .bird-container, .top-title, .star-bg', {
        opacity: 0
    });
    
    // 背景星星动画
    animationTimeline.to('.star-bg-1', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });
    
    animationTimeline.to('.star-bg-2', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8");
    
    animationTimeline.to('.star-bg-3', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8");
    
    // 基座动画
    animationTimeline.to('.base', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });
    
    // 左右麦穗动画
    animationTimeline.to('.wheat-left, .wheat-right', {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");
    
    // 旗帜动画
    animationTimeline.to('.flag-1', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.3");
    
    animationTimeline.to('.flag-2', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.7");
    
    
    // 星星动画（依次出现）
    animationTimeline.to('.star1', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.3");
    
    animationTimeline.to('.star2', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4");
    
    animationTimeline.to('.star3', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4");
    
    animationTimeline.to('.star4', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4");
    
    animationTimeline.to('.star5', {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4");
    
    // 鸟动画
    animationTimeline.to('.bird-container', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.2");
    
    // 标题动画
    animationTimeline.to('.top-title', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");
}

onMounted(() => {
    window.addEventListener('pageLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete)
    if (animationTimeline) {
        animationTimeline.kill();
    }
})
</script>

<template>
    <div class="red-container">
        <div class="star">
            <div class="star-bg star-bg-1"></div>
            <div class="star-bg star-bg-2"></div>
            <div class="star-bg star-bg-3"></div>
        </div>
        <div class="base"></div>
        <div class="center">
            <div class="center-container">
                <div class="wheat-left"></div>
                <div class="flag">
                    <div class="flag-container">
                        <div class="flag-1"></div>
                        <div class="flag-2"></div>
                    </div>
                </div>
                <div class="wheat-right"></div>
            </div>
        </div>
        <div class="top">
            <div class="top-container">
                <div class="star-container">
                    <div class="star1"></div>
                    <div class="star2"></div>
                    <div class="star3"></div>
                    <div class="star4"></div>
                    <div class="star5"></div>
                </div>
                <div class="bird-container"></div>
                <div class="top-title">党建联建</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.red-container {
    width: 100%;
    height: 100%;
}

// 背景星星样式
.red-container .star {
    position: absolute;
    top: 15%;
    left: 15%;
    right: 15%;
    bottom: 30%;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.red-container .star .star-bg {
    height: 100%;
    width: 33.33%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}

.red-container .star .star-bg-1 {
    background-image: url("@/assets/images/redCore/bg_star1.png");
}

.red-container .star .star-bg-2 {
    background-image: url("@/assets/images/redCore/bg_star2.png");
}

.red-container .star .star-bg-3 {
    background-image: url("@/assets/images/redCore/bg_star3.png");
}

.red-container .base {
    position: absolute;
    bottom: 0;
    height: 30%;
    left: 15%;
    right: 15%;
    background-image: url("@/assets/images/redCore/base.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .center {
    position: absolute;
    bottom: 20%;
    height: 60%;
    left: 20%;
    right: 20%;
}
.red-container .center-container {
    width: 100%;
    height: 100%;
    position: relative;
}
.red-container .center-container .wheat-left,
.red-container .center-container .wheat-right {
    position: absolute;
    bottom: 0;
    height: 30%;
    width: 20%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .center-container .wheat-left {
    left: 0;
    background-image: url("@/assets/images/redCore/wheat_left.png");
}
.red-container .center-container .wheat-right {
    right: 0;
    background-image: url("@/assets/images/redCore/wheat_right.png");
}
.red-container .center-container .flag {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
}
.red-container .center-container .flag .flag-container {
    width: 100%;
    height: 100%;
    position: relative;
}
.red-container .center-container .flag .flag-container .flag-1 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 10%;
    background-image: url("@/assets/images/redCore/flag1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 1;
    opacity: 0; /* 初始状态透明 */
}
.red-container .center-container .flag .flag-container .flag-2 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10%;
    right: 0;
    background-image: url("@/assets/images/redCore/flag2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 2;
    opacity: 0; /* 初始状态透明 */
}

.red-container .top {
    position: absolute;
    top: 5%;
    height: 15%;
    left: 15%;
    right: 15%;
}
.red-container .top .top-container {
    width: 100%;
    height: 100%;
    position: relative;
}
.red-container .top .top-container .star-container {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    display: flex;
}
.red-container .top .top-container .star-container .star1 {
    height: 75%;
    width: 30%;
    background-image: url("@/assets/images/redCore/star1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .top .top-container .star-container .star2 {
    margin-top: 10%;
    height: 70%;
    width: 25%;
    background-image: url("@/assets/images/redCore/star2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .top .top-container .star-container .star3 {
    margin-top: 15%;
    height: 60%;
    width: 20%;
    background-image: url("@/assets/images/redCore/star3.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .top .top-container .star-container .star4 {
    margin-top: 15%;
    height: 50%;
    width: 15%;
    background-image: url("@/assets/images/redCore/star4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .top .top-container .star-container .star5 {
    margin-top: 15%;
    height: 30%;
    width: 10%;
    background-image: url("@/assets/images/redCore/star5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
.red-container .top .top-container .top-title {
    position: absolute;
    top: 0;
    bottom: 70%;
    left: 15%;
    right: 15%;
    color: #ffffff;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 32px;
    font-family: '黑体';
    background-image: url("@/assets/images/redCore/top_title.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1%;
    box-sizing: border-box;
    opacity: 0; /* 初始状态透明 */
}

.red-container .top .top-container .bird-container {
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    display: flex;
    background-image: url("@/assets/images/redCore/bird.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0; /* 初始状态透明 */
}
// 旗帜飘扬动画
@keyframes flagWave {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(3deg);
    }
    50% {
        transform: rotate(0deg);
    }
    75% {
        transform: rotate(-3deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

//.red-container .center-container .flag .flag-container .flag-1,
//.red-container .center-container .flag .flag-container .flag-2 {
//    animation: flagWave 4s ease-in-out infinite;
//    transform-origin: top center;
//}
</style>