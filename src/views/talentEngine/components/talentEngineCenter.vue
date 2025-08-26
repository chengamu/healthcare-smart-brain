<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

function handlePageLoadComplete() {
    let tl = gsap.timeline()

    // 球体动画
    tl.fromTo(".sphere",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" },
        1.0
    )

    // 圆环动画
    tl.fromTo(".cicle3",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        1.2
    )

    // 节点动画
    tl.fromTo(".cicle8, .cicle9, .cicle10",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        1.8
    )
}

onMounted(() => {
    window.addEventListener('pageLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete)
})
</script>

<template>
    <div class="innovation-container">
        <div class="sphere">
            <div class="sphere-bg"></div>
        </div>
        <div class="cicle3"></div>
        <div class="cicle8">
            <span>行业专家</span>
            <p>智库引领</p>
        </div>
        <div class="cicle9">
            <span>技术经理人</span>
            <p>转化衔接</p>
        </div>
        <div class="cicle10">
            <span>技能人才</span>
            <p>支撑落地</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.innovation-container {
    width: 100%;
    height: 100%;
}

/* 添加初始隐藏状态 */
.innovation-container .sphere,
.innovation-container .cicle3,
.innovation-container .cicle8,
.innovation-container .cicle9,
.innovation-container .cicle10 {
    opacity: 0;
}
.innovation-container .data2 {
    left: 45%;
    top: 3%;
}
.innovation-container .data3 {
    left: 65%;
    top: 5%;
}
.innovation-container .data4 {
    left: 75%;
    top: 28%;
}
.innovation-container .sphere {
    width: 30rem;
    height: 30rem;
    position: relative;
    margin: 14% auto 0;
}
.innovation-container .sphere .sphere-bg {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(@/assets/images/talentEngine/newdz.png) no-repeat center;
    background-size: contain;
}
.innovation-container .cicle3 {
    width: 50rem;
    height: 50rem;
    background: url(@/assets/images/funnel/circle.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    top: 20%;
    left: 50%;
    transform-style: preserve-3d;
    transform: translateX(-50%) rotateX(75deg);
    animation: rotate3 20s linear infinite;
}
.innovation-container .cicle8,
.innovation-container .cicle9,
.innovation-container .cicle10 {
    width: 8rem;
    height: 8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    border-radius: 50%;
    line-height: 3rem;
}
.innovation-container .cicle8 span,
.innovation-container .cicle9 span,
.innovation-container .cicle10 span {
    font-family: 'LCdd';
    display: block;
    text-align: center;
    font-size: 1.125rem;
    margin-top: 1rem;
}
.innovation-container .cicle8 p,
.innovation-container .cicle9 p,
.innovation-container .cicle10 p {
    text-align: center;
    font-size: 1rem;
}
.innovation-container .cicle8 {
    background: url(@/assets/images/funnel/circle1.png) no-repeat;
    background-size: 100%;
    color: #f29701;
    animation: rotateTriangle1 15s linear infinite;
}

.innovation-container .cicle9 {
    background: url(@/assets/images/funnel/circle2.png) no-repeat;
    background-size: 100%;
    color: #0ac1c7;
    animation: rotateTriangle2 15s linear infinite;
}

.innovation-container .cicle10 {
    background: url(@/assets/images/funnel/circle1.png) no-repeat;
    background-size: 100%;
    color: #f29701;
    animation: rotateTriangle3 15s linear infinite;
}

@keyframes rotate3 {
    0% {
        transform: translateX(-50%) rotateX(75deg) rotateZ(0);
    }
    100% {
        transform: translateX(-50%) rotateX(75deg) rotateZ(360deg);
    }
}

@keyframes rotateTriangle1 {
    0% {
        transform: translate(-50%, -50%) rotate(0deg) translate(20rem) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg) translate(20rem) rotate(-360deg);
    }
}

@keyframes rotateTriangle2 {
    0% {
        transform: translate(-50%, -50%) rotate(120deg) translate(20rem) rotate(-120deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(480deg) translate(20rem) rotate(-480deg);
    }
}

@keyframes rotateTriangle3 {
    0% {
        transform: translate(-50%, -50%) rotate(240deg) translate(20rem) rotate(-240deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(600deg) translate(20rem) rotate(-600deg);
    }
}
</style>