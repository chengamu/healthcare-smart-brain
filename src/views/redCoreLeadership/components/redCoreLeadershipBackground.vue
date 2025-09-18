<script setup lang="ts">
import {onBeforeUnmount, nextTick, ref } from "vue";
import gsap from "gsap";

const emit = defineEmits(['animationComplete']);

let animationTimeline = null;
const video1Ref = ref(null);
const video2Ref = ref(null);
// 使用相对路径来引用视频资源
const iniVideoUrl = '/src/assets/images/redCore/ini.mp4';
const bgVideoUrl = '/src/assets/images/redCore/bg.mp4';

// 当前显示的视频索引（1 或 2）
const activeVideoIndex = ref(1);

function handlePageLoadComplete() {
    // 页面加载完成后启动动画
    nextTick(() => {
        initAnimations();
        // 为第一个视频添加播放结束事件监听
        if (video1Ref.value) {
            video1Ref.value.addEventListener('ended', handleVideo1Ended);
        }
    });
}

function handleVideo1Ended() {
    // 当 ini.mp4 播放完成后切换到 bg.mp4
    switchToBackgroundVideo();
}

function switchToBackgroundVideo() {
    if (!video2Ref.value) return;
    
    // 设置第二个视频的源并预加载
    video2Ref.value.src = bgVideoUrl;
    video2Ref.value.loop = true;
    video2Ref.value.muted = true;
    
    // 当第二个视频可以播放时开始切换
    video2Ref.value.addEventListener('canplay', () => {
        // 开始播放第二个视频
        video2Ref.value.play();
        
        // 直接切换，不使用动画
        video1Ref.value.style.opacity = '0';
        video2Ref.value.style.opacity = '1';
        
        activeVideoIndex.value = 2;
    }, { once: true });
}

function initAnimations() {
    // 创建时间线
    animationTimeline = gsap.timeline();

    // 设置初始状态 - 所有元素透明
    animationTimeline.set('.background-video', {
        opacity: 0
    });
    
    // 设置第二个视频初始为完全透明
    animationTimeline.set(video2Ref.value, {
        opacity: 0
    });

    // 背景视频动画 - 只让第一个视频显示
    animationTimeline.to(video1Ref.value, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            // 动画完成后向父组件发送事件
            emit('animationComplete');
        }
    });
}

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    if (animationTimeline) {
        animationTimeline.kill();
    }
    if (video1Ref.value) {
        video1Ref.value.removeEventListener('ended', handleVideo1Ended);
    }
})

defineExpose({
    handlePageLoadComplete
})
</script>

<template>
    <div class="background-container">
        <!-- 双视频缓冲，实现平滑切换 -->
        <!-- 第一个视频：播放开场动画 ini.mp4 -->
        <video 
            ref="video1Ref"
            class="background-video" 
            autoplay 
            muted
            :src="iniVideoUrl"
        >
        </video>
        
        <!-- 第二个视频：播放背景视频 bg.mp4 -->
        <video 
            ref="video2Ref"
            class="background-video background-video-secondary" 
            muted
        >
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
    opacity: 0;
}

// 第二个视频的特殊样式
.background-video-secondary {
    z-index: -2; // 确保在第一个视频下方
}
</style>