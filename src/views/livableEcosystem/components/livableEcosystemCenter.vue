<script setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

const emit = defineEmits(['animationComplete'])

const getImageUrl = (name) => {
    return new URL(`../../../assets/images/livableEcosystem/${name}`, import.meta.url).href
}

let animationTimeline = null;

function handlePageLoadComplete() {
    // 页面加载完成后启动动画
    nextTick(() => {
        initAnimations();
    });
}

function initAnimations() {
    // 创建时间线
    animationTimeline = gsap.timeline({
        onComplete: () => {
            // 所有动画完成后发送事件
            console.log('宜居生态动画全部完成，向父组件发送完成事件')
            emit('animationComplete')
        }
    });

    // 设置初始状态 - 所有元素透明
    animationTimeline.set('.livable-i-mv, .livable-im-building, .livable--circle', {
        opacity: 0
    });
    
    // 添加元素动画
    animationTimeline.to('.livable-i-mv', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "power2.out"
    })
    .to('.livable-im-building', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "power2.out"
    }, "-=0.5")
    .to('.livable--circle', {
        opacity: 1,
        duration: 1,
        scale: 1.1,
        ease: "elastic.out(1, 0.3)"
    }, "-=0.3");
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
    <div class="livable-container">
        <div class="aac-animation-img">
            <img class="livable-i-mv" :src="getImageUrl('main-view.png')" alt="" srcset="" />
            <img class="livable-im-building" :src="getImageUrl('building.png')" alt="" srcset="" />
            <div class="livable--circle">
                <div class="circle circle1">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('szhsfjs.png')" alt="" srcset="" />
                    <span class="circle-text-main">企业服务</span>
                </div>
                <div class="circle circle2">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('jcfwzq.png')" alt="" srcset="" />
                    <span class="circle-text-main">技术服务</span>
                </div>
                <div class="circle circle3">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('pragpyycj.png')" alt="" srcset="" />
                    <span class="circle-text-main">医疗器械一站式服务</span>
                </div>
                <div class="circle circle4">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('dsjyy.png')" alt="" srcset="" />
                    <span class="circle-text-main">人力资源服务</span>
                </div>
                <div class="circle circle5">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('szhnlkfpt.png')" alt="" srcset="" />
                    <span class="circle-text-main">营销服务</span>
                </div>
                <div class="circle circle6">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('bbzx.png')" alt="" srcset="" />
                    <span class="circle-text-main">金融服务</span>
                </div>
                <div class="circle circle7">
                    <img class="circle-img-pop" :src="getImageUrl('base1.png')" alt="" srcset="" />
                    <img class="circle-img-bg" :src="getImageUrl('NO1.icon.png')" alt="" srcset="" />
                    <img class="circle-img-bg-icon" :src="getImageUrl('qnsclmtd.png')" alt="" srcset="" />
                    <span class="circle-text-main">产业社区综合服务</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.livable-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    background-image: url('@/assets/images/livableEcosystem/particle.png');
    background-size: contain;
    background-repeat: no-repeat;
    .aac-animation-img{
        flex: 1;
        flex-shrink: 0;
        position: relative;
        .livable-i-mv{
            position: absolute;
            bottom: 25%;
            left: 0;
            right: 0;
            height: 500px;
            width: 100%;
            opacity: 0;
        }
        .livable-im-building{
            position: absolute;
            left: 50%;
            bottom: 60%;
            width: 250px;
            animation: hover-animation1 3s infinite linear;
            opacity: 0;
        }
        .livable--circle{
            position: absolute;
            bottom: 15%;
            left: 10%;
            right: 10%;
            height: 500px;
            border-radius: 50%;
            opacity: 0;
        }
    }
}
@keyframes hover-animation1 {
    0% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(-30px);
    }
    100% {
        transform: translateX(-50%) translateY(0);
    }
}
@keyframes rotateAnimation {
    0% {
        transform: translate3d(4px, 48px, 0) scale3d(0.8, 0.6, 1);
    }
    50% {
        transform: translate3d(4px, 48px, 0) scale3d(0.9, 0.65, 1);
    }
    100% {
        transform: translate3d(4px, 48px, 0) scale3d(0.8, 0.6, 1);
    }
}

.aac-animation-img{
    .circle {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        position: absolute;
        .circle-img-pop{
            width: 100%;
            height: 100%;
        }
        .circle-img-bg{
            width: 80%;
            height: 80%;
            position: absolute;
            top: -34px;
            left: 31px;
        }
        .circle-img-bg-icon{
            height: 36%;
            position: absolute;
            top: 30px;
            left: 50px;
            width: 36%;
        }
        .circle-text{
            position: absolute;
            top: 40px;
            left: 111px;
            display: inline-block;
            width: 80px;
            height: 80px;
            font-size: 24px;
            color: #fff;
        }
        .circle-text-main{
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            font-size: 24px;
            color: #fff;
            font-style: italic;
            white-space: nowrap;
        }
    }
    .circle1 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
    }

    .circle2 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -9.428571428571429s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) -3.4285714285714284s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) -3.4285714285714284s infinite alternate;
    }

    .circle3 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -12.857142857142858s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) -6.857142857142857s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) -6.857142857142857s infinite alternate;
    }

    .circle4 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -16.285714285714285s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) -10.285714285714285s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) -10.285714285714285s infinite alternate;
    }

    .circle5 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -19.714285714285715s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) -13.714285714285714s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) -13.714285714285714s infinite alternate;
    }
    .circle6 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -23.142857142857142s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) -17.142857142857142s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) -17.142857142857142s infinite alternate;
    }
    .circle7 {
        animation: animX 12s cubic-bezier(0.36, 0, 0.64, 1) -26.57142857142857s infinite alternate,
        animY 12s cubic-bezier(0.36, 0, 0.64, 1) -20.57142857142857s infinite alternate,
        scale 24s cubic-bezier(0.36, 0, 0.64, 1) -20.57142857142857s infinite alternate;
    }

    @keyframes animX {
        0% {
            left: 0;
        }

        100% {
            left: calc(100% - 150px);
        }
    }

    @keyframes animY {
        0% {
            top: -4%;
        }

        100% {
            top: 65%;
        }
    }
    @keyframes scale {

        0% {
            transform: scale(0.5);
            opacity: 0.5;
        }

        50% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0.5);
            opacity: 0.5;
        }
    }
}
</style>