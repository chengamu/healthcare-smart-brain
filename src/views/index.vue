<template>
    <div class="large-screen">
        <index-background></index-background>
        <div class="large-screen-wrap" id="large-screen">
            <!-- 顶部菜单 -->
            <top-menu is-index></top-menu>
            <!-- 底部托盘 -->
            <bottom-tray></bottom-tray>
            <!-- 左右装饰线 -->
            <div class="large-screen-left-zsline"></div>
            <div class="large-screen-right-zsline"></div>
        </div>
    </div>
</template>

<script setup>
import {onMounted} from "vue"
import indexBackground from "@/views/indexBackground.vue"
import topMenu from "@/components/topMenu/index.vue"
import bottomTray from "@/components/bottomTray/index.vue"

import gsap from "gsap"
import autofit from "autofit.js"

onMounted(() => {
    // 自动适配
    autofit.init({
        dh: 1080,
        dw: 1920,
        el: "#large-screen",
        resize: true,
    })

    // 背景动画完成后，立即启动其他组件
    const backgroundEvent = new CustomEvent('backgroundLoaded');
    window.dispatchEvent(backgroundEvent);
    
    // 立即加载其他组件
    loadOtherComponents();
})

// 加载其他组件
function loadOtherComponents() {
    let tl = gsap.timeline({ paused: false })
    
    tl.addLabel("start", 0)
    tl.addLabel("menu", 0.3)
    tl.addLabel("fullscreen", 0.6)
    tl.addLabel("topRow", 1.2)
    tl.addLabel("bottomRow", 1.8)
    
    // 头部组件动画（首页模式下也显示）
    tl.to(".m-header", { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power4.out" 
    }, "start")
    
    // 底部托盘动画
    tl.to(".bottom-tray", { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "power4.out" 
    }, "start")
    
    // 传统顶部菜单动画（非首页模式）
    tl.to(".top-menu", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
    }, "menu")
    
    // 全屏菜单容器动画（首页模式）
    tl.fromTo(".fullscreen-menu", 
        {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)"
        },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.out"
        }, "fullscreen")
    
    // 上排菜单卡片动画（前三个）
    tl.fromTo(".menu-card:nth-child(-n+3)", 
        {
            y: 80,
            opacity: 0,
            scale: 0.7,
            rotateX: 20
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            stagger: 0.15
        }, "topRow")
    
    // 下排菜单卡片动画（后三个）
    tl.fromTo(".menu-card:nth-child(n+4)", 
        {
            y: 80,
            opacity: 0,
            scale: 0.7,
            rotateX: 20
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            stagger: 0.15
        }, "bottomRow")
    
    // 装饰线条动画
    tl.to(".large-screen-left-zsline, .large-screen-right-zsline", {
        opacity: 1,
        scaleY: 1,
        duration: 1.8,
        ease: "power2.out"
    }, "start+=0.2")
    
    // 添加完成后的微调动画
    tl.add(() => {
        const menuCards = document.querySelectorAll('.menu-card');
        menuCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform += ' perspective(1000px)';
            }, index * 100);
        });
    }, "bottomRow+=0.5")
}

</script>

<style lang="scss">
@import "~@/assets/style/home.scss";

/* 装饰线条样式 */
.large-screen-left-zsline,
.large-screen-right-zsline {
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(59, 130, 246, 0.6) 20%,
        rgba(59, 130, 246, 0.8) 50%,
        rgba(59, 130, 246, 0.6) 80%,
        transparent 100%
    );
    
    /* 初始状态 */
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center;
}

.large-screen-left-zsline {
    left: 20px;
}

.large-screen-right-zsline {
    right: 20px;
}

/* 大屏容器样式优化 */
.large-screen {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.large-screen-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>