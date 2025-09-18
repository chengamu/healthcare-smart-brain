<script setup lang="ts">
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
    animationTimeline.set('.background-video', {
        opacity: 0
    });

    // 背景星星动画
    animationTimeline.to('.background-video', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });
}

onMounted(() => {
    window.addEventListener('backgroundLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('backgroundLoaded', handlePageLoadComplete)
    if (animationTimeline) {
        animationTimeline.kill();
    }
})
</script>

<template>
    <div class="background-container">
        <!-- 背景视频 -->
        <video class="background-video" autoplay loop muted>
            <source src="@/assets/images/index_bg.mp4" type="video/mp4">
        </video>
    </div>
</template>

<style scoped lang="scss">
.background-container {
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
    opacity: 0
}
</style>