<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// 注册DrawSVGPlugin插件
gsap.registerPlugin(DrawSVGPlugin);

onMounted(() => {
    window.addEventListener('pageLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete)
})

const handlePageLoadComplete = () => {
    // 页面加载完成后的处理逻辑
}
</script>

<template>
    <div class="funnel-container">
        <!-- 背景视频 -->
        <video class="background-video" autoplay loop muted>
            <source src="@/assets/images/integrationOfIndustryAndCity/bg.mp4" type="video/mp4">
        </video>

        <div class="left"></div>
        <!-- 销售总额 -->
        <div class="total">
            <!-- 3D魔方容器 -->
            <div class="cube-container">
                <div class="cube" ref="cube">
                    <!-- 魔方面板 -->
                    <div class="cube-face front">
                        <div class="face-content">
                            <div class="face-icon">企业服务</div>
                        </div>
                    </div>
                    <div class="cube-face back">
                        <div class="face-content">
                            <div class="face-icon">技术服务</div>
                        </div>
                    </div>
                    <div class="cube-face left">
                        <div class="face-content">
                            <div class="face-icon">医疗器械一站式服务</div>
                        </div>
                    </div>
                    <div class="cube-face right">
                        <div class="face-content">
                            <div class="face-icon">人力资源服务</div>
                        </div>
                    </div>
                    <div class="cube-face top">
                        <div class="face-content">
                            <div class="face-icon">营销服务</div>
                        </div>
                    </div>
                    <div class="cube-face bottom">
                        <div class="face-content">
                            <div class="face-icon">金融服务</div>
                        </div>
                    </div>

                    <!-- 粒子流动效果 -->
                    <div class="particles">
                        <div class="particle" v-for="i in 12" :key="i"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.funnel-container {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

// 背景视频样式
.background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    pointer-events: none; // 屏蔽视频点击事件
}

.funnel-container > .left {
    width: 20%;
    height: 70%;
    float: left;
    position: relative;
    z-index: 2; // 确保内容在视频上方
}

.funnel-container .total {
    width: 60%;
    height: 100%;
    float: left;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2; // 确保内容在视频上方
}

/* 添加初始隐藏状态 */
.funnel-container .rain {
    opacity: 0;
}

.funnel-container .total .rain {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}

/* 3D魔方样式 */
.cube-container {
    width: 200px;
    height: 200px;
    position: relative;
    perspective: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotate 20s infinite linear;
}

.cube-face {
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(21, 152, 255, 0.2);
    border: 2px solid rgba(21, 152, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(21, 152, 255, 0.3);
}

.front {
    transform: translateZ(100px);
}

.back {
    transform: rotateY(180deg) translateZ(100px);
}

.left {
    transform: rotateY(-90deg) translateZ(100px);
}

.right {
    transform: rotateY(90deg) translateZ(100px);
}

.top {
    transform: rotateX(90deg) translateZ(100px);
}

.bottom {
    transform: rotateX(-90deg) translateZ(100px);
}

.face-content {
    text-align: center;
    color: #fff;
}

.face-icon {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(21, 152, 255, 0.8);
}

/* 粒子效果 */
.particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.particle {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #1598FF;
    box-shadow: 0 0 10px #1598FF;
    animation: flow 4s infinite linear;
}

.particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { top: 10%; left: 50%; animation-delay: 0.3s; }
.particle:nth-child(3) { top: 10%; right: 10%; animation-delay: 0.6s; }
.particle:nth-child(4) { top: 50%; right: 10%; animation-delay: 0.9s; }
.particle:nth-child(5) { bottom: 10%; right: 10%; animation-delay: 1.2s; }
.particle:nth-child(6) { bottom: 10%; left: 50%; animation-delay: 1.5s; }
.particle:nth-child(7) { bottom: 10%; left: 10%; animation-delay: 1.8s; }
.particle:nth-child(8) { top: 50%; left: 10%; animation-delay: 2.1s; }
.particle:nth-child(9) { top: 25%; left: 25%; animation-delay: 2.4s; }
.particle:nth-child(10) { top: 25%; right: 25%; animation-delay: 2.7s; }
.particle:nth-child(11) { bottom: 25%; right: 25%; animation-delay: 3.0s; }
.particle:nth-child(12) { bottom: 25%; left: 25%; animation-delay: 3.3s; }

/* 动画 */
@keyframes rotate {
    0% {
        transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    100% {
        transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
}

@keyframes flow {
    0% {
        transform: translate(0, 0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translate(100px, 100px);
        opacity: 0;
    }
}
</style>