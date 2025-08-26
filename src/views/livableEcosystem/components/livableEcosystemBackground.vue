<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
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

    // // 设置初始状态 - 所有元素透明
    // animationTimeline.set('.rain', {
    //     opacity: 0
    // });
    //
    // // 背景星星动画
    // animationTimeline.to('.rain', {
    //     opacity: 1,
    //     duration: 1,
    //     ease: "power2.out"
    // });
}

onMounted(() => {
    window.addEventListener('backgroundLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('backgroundLoaded', handlePageLoadComplete)
})
</script>

<template>
    <div class="background-container">
        <canvas class="rain"></canvas>
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
    background: url(@/assets/images/livableEcosystem/ac-bj.jpg) no-repeat;
    background-size: 100%;
}
</style>