<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

function dashed() {
    var canvas = document.querySelector('.dashed')
    var ctx = canvas.getContext('2d')
    var w = canvas.width = document.querySelector('.innovation-container').clientWidth
    var h = canvas.height = document.querySelector('.innovation-container').clientHeight / 3 * 2
    ctx.lineWidth = 3
    ctx.setLineDash([3, 3]);
    ctx.fillStyle = '#93f8fb'
    ctx.shadowOffsetX = 0;
    // 阴影的y偏移
    ctx.shadowOffsetY = 0;
    // 阴影颜色
    ctx.shadowColor = '#93f8fb';
    // 阴影的模糊半径
    ctx.shadowBlur = 15;
    ctx.save()  //缓存初始状态
    // 绘制第一条曲线
    ctx.beginPath()
    var grd = ctx.createLinearGradient(w / 11 * 2, h / 3, w / 5 * 2, h);
    grd.addColorStop(0, "#54e2e6");
    grd.addColorStop(1, "#065261");
    ctx.strokeStyle = grd;
    ctx.moveTo(w / 5 * 2, h)
    ctx.quadraticCurveTo(w / 5, h / 6 * 5, w / 11 * 2, h / 3);
    ctx.stroke();
    // 绘制第一条曲线上的圆光效果
    ctx.beginPath()
    ctx.moveTo(w / 11 * 2, h / 3)
    ctx.arc(w / 11 * 2, h / 3, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.save()
    // 绘制第二条线
    ctx.beginPath()
    var grd = ctx.createLinearGradient(w / 11 * 3.3, h / 2, w / 3 * 1.1, h / 6 * 5);
    grd.addColorStop(0, "#e08d03");
    grd.addColorStop(1, "#2e6a5c");
    ctx.strokeStyle = grd;
    ctx.moveTo(w / 3 * 1.1, h / 6 * 5)
    ctx.quadraticCurveTo(w / 5 * 1.5, h / 6 * 4.2, w / 11 * 3.3, h / 2);
    ctx.stroke();
    // 绘制第二条曲线上的圆光效果
    ctx.beginPath()
    ctx.moveTo(w / 11 * 3.3, h / 2)
    ctx.arc(w / 11 * 3.3, h / 2, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.save()
    // 绘制第三条线
    ctx.beginPath()
    var grd = ctx.createLinearGradient(w / 3 * 1.4, h / 5, w / 5 * 2, h / 2);
    grd.addColorStop(0, "#e08d03");
    grd.addColorStop(1, "#2e6a5c");
    ctx.strokeStyle = grd;
    ctx.moveTo(w / 5 * 2, h / 2 )
    ctx.quadraticCurveTo(w / 3 * 1.2, h / 4 * 1.4, w / 3 * 1.4, h / 5);
    ctx.stroke();
    // 绘制第三条曲线上的圆光效果
    ctx.beginPath()
    ctx.moveTo(w / 3 * 1.4, h / 5)
    ctx.arc(w / 3 * 1.4, h / 5, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.save()
    // 绘制第四条线
    ctx.beginPath()
    var grd = ctx.createLinearGradient(w / 5 * 3.1, h / 3*1.2, w / 5 * 3.2, h / 2 * 1.5);
    grd.addColorStop(0, "#e08d03");
    grd.addColorStop(1, "#2e6a5c");
    ctx.strokeStyle = grd;
    ctx.moveTo(w / 5 * 3.2, h / 2 * 1.5)
    ctx.quadraticCurveTo(w / 5 * 3.35, h / 2 * 1.2, w / 5 * 3.1, h / 3*1.2);
    ctx.stroke();
    // 绘制第四条曲线上的圆光效果
    ctx.beginPath()
    ctx.moveTo( w / 5 * 3.1, h / 3*1.2)
    ctx.arc( w / 5 * 3.1, h / 3*1.2, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.save()
    // 绘制第五条线
    ctx.beginPath()
    var grd = ctx.createLinearGradient(w / 5 * 3.3, h / 4, w / 5 * 3.2, h / 2 * 1.9);
    grd.addColorStop(0, "#e08d03");
    grd.addColorStop(1, "#2e6a5c");
    ctx.strokeStyle = grd;
    ctx.moveTo(w / 5 * 3.03, h / 2 * 1.9)
    ctx.quadraticCurveTo(w / 5 * 3.8, h / 2 * 1.2, w / 5 * 3.3, h / 4);
    ctx.stroke();
    // 绘制第五条曲线上的圆光效果
    ctx.beginPath()
    ctx.moveTo(w / 5 * 3.3, h / 4)
    ctx.arc(w / 5 * 3.3, h / 4, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.save()
    // 绘制第六条线
    ctx.beginPath()
    var grd = ctx.createLinearGradient(w / 5 * 3.8, h / 2*1.2, w / 5 * 2.9, h);
    grd.addColorStop(0, "#e08d03");
    grd.addColorStop(1, "#2e6a5c");
    ctx.strokeStyle = grd;
    ctx.moveTo(w / 5 * 2.9, h)
    ctx.quadraticCurveTo(w / 5 * 3.7, h / 2 * 1.6, w / 5 * 3.8, h / 2*1.2);
    ctx.stroke();
    // 绘制第六条曲线上的圆光效果
    ctx.beginPath()
    ctx.moveTo(w / 5 * 3.8, h / 2*1.2)
    ctx.arc(w / 5 * 3.8, h / 2*1.2, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    ctx.save()
}

function handlePageLoadComplete() {
    let tl = gsap.timeline()

    tl.fromTo(".dashed",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" },
        1.0
    )

    // 数据项动画
    tl.fromTo(".data1",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        0.5
    )
    tl.fromTo(".data2",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        0.7
    )
    tl.fromTo(".data3",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        0.9
    )
    tl.fromTo(".data4",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
        1.1
    )

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
    tl.fromTo(".cicle4, .cicle5, .cicle6, .cicle7",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" },
        1.4
    )

    // 节点动画
    tl.fromTo(".cicle8, .cicle9, .cicle10, .cicle11",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        1.8
    )
}

onMounted(() => {
    nextTick(() => {
        dashed()
    })
    window.addEventListener('pageLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete)
})
</script>

<template>
    <div class="innovation-container">
        <div class="data1">
            <span>一类创新药/个</span>
            <p>1</p>
        </div>
        <div class="data2">
            <span>关键技术攻坚/个</span>
            <p>5</p>
        </div>
        <div class="data3">
            <span>二、三类医疗器械/个</span>
            <p>7</p>
        </div>
        <div class="data4">
            <span>研发投入/亿元</span>
            <p>2.5</p>
        </div>
        <canvas class="dashed"></canvas>
        <div class="sphere">
            <div class="sphere-bg"></div>
        </div>
        <div class="cicle3"></div>
        <div class="cicle4"></div>
        <div class="cicle5"></div>
        <div class="cicle6"></div>
        <div class="cicle7"></div>
        <div class="cicle8">
            <p>临床需求发现</p>
        </div>
        <div class="cicle9">
            <p>理论基础研究</p>
        </div>
        <div class="cicle10">
            <p>技术成果转化</p>
        </div>
        <div class="cicle11">
            <p>终端市场应用</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.innovation-container {
    width: 100%;
    height: 100%;
}

/* 添加初始隐藏状态 */
.innovation-container .data1,
.innovation-container .data2,
.innovation-container .data3,
.innovation-container .data4,
.innovation-container .dashed,
.innovation-container .sphere,
.innovation-container .cicle3,
.innovation-container .cicle4,
.innovation-container .cicle5,
.innovation-container .cicle6,
.innovation-container .cicle7,
.innovation-container .cicle8,
.innovation-container .cicle9,
.innovation-container .cicle10,
.innovation-container .cicle11 {
    opacity: 0;
}
.innovation-container .data1,
.innovation-container .data2,
.innovation-container .data3,
.innovation-container .data4 {
    width: 12rem;
    height: 4rem;
    position: absolute;
}
.innovation-container .data1 span,
.innovation-container .data2 span,
.innovation-container .data3 span,
.innovation-container .data4 span {
    color: #0ac1c7;
    font-size: 20px;
    font-family: '宋体';
}
.innovation-container .data1 p,
.innovation-container .data2 p,
.innovation-container .data3 p,
.innovation-container .data4 p {
    font-family: 'LCdd';
    font-size: 32px;
    color: #f29701;
}
.innovation-container .data1 {
    left: 17%;
    top: 12%;
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
.innovation-container .dashed {
    position: absolute;
    left: 0;
    top: 0;
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
    background: url(@/assets/images/funnel/53earth.png) no-repeat center;
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
.innovation-container .cicle4 {
    width: 20rem;
    height: 20rem;
    position: absolute;
    top: 60%;
    left: 50%;
    transform-style: preserve-3d;
    background: url(@/assets/images/funnel/53gqright.png) no-repeat center;
    background-size: 100%;
    transform: translateX(-50%) rotateX(75deg);
    animation: rotate3 2s linear infinite;
}
.innovation-container .cicle5 {
    width: 20rem;
    height: 20rem;
    position: absolute;
    top: 62%;
    left: 50%;
    transform-style: preserve-3d;
    background: url(@/assets/images/funnel/53gqleft.png) no-repeat center;
    background-size: 100%;
    transform: translateX(-50%) rotateX(75deg);
    animation: rotate4 2s linear infinite;
}
.innovation-container .cicle6 {
    width: 17rem;
    height: 17rem;
    position: absolute;
    top: 70%;
    left: 50%;
    transform-style: preserve-3d;
    background: url(@/assets/images/funnel/535gqbottomright.png) no-repeat center;
    background-size: 100%;
    transform: translateX(-50%) rotateX(75deg);
    animation: rotate3 2s linear infinite;
}
.innovation-container .cicle7 {
    width: 17rem;
    height: 17rem;
    position: absolute;
    top: 72%;
    left: 50%;
    transform-style: preserve-3d;
    background: url(@/assets/images/funnel/53gqbottomleft.png) no-repeat center;
    background-size: 100%;
    transform: translateX(-50%) rotateX(75deg);
    animation: rotate4 2s linear infinite;
}
.innovation-container .cicle8,
.innovation-container .cicle9,
.innovation-container .cicle10,
.innovation-container .cicle11 {
    width: 8rem;
    height: 8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    margin-left: -2.5rem;
    border-radius: 50%;
    line-height: 8rem;
}
.innovation-container .cicle8 span,
.innovation-container .cicle9 span,
.innovation-container .cicle10 span,
.innovation-container .cicle11 span {
    font-family: 'LCdd';
    display: block;
    margin-left: 25%;
    font-size: 4rem;
    margin-top: 20%;
}
.innovation-container .cicle8 p,
.innovation-container .cicle9 p,
.innovation-container .cicle10 p,
.innovation-container .cicle11 p {
    text-align: center;
    font-size: 1rem;
}
.innovation-container .cicle8 {
    background: url(@/assets/images/funnel/circle1.png) no-repeat;
    background-size: 100%;
    animation: rotate5 20s linear infinite;
    color: #f29701;
}
.innovation-container .cicle9 {
    background: url(@/assets/images/funnel/circle2.png) no-repeat;
    background-size: 100%;
    animation: rotate6 20s linear infinite;
    color: #0ac1c7;
}
.innovation-container .cicle10 {
    background: url(@/assets/images/funnel/circle1.png) no-repeat;
    background-size: 100%;
    animation: rotate7 20s linear infinite;
    color: #f29701;
}
.innovation-container .cicle11 {
    background: url(@/assets/images/funnel/circle2.png) no-repeat;
    background-size: 100%;
    color: #0ac1c7;
    animation: rotate8 20s linear infinite;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes rotate2 {
    0% {
        transform: rotateX(75deg) rotateZ(0);
    }
    100% {
        transform: rotateX(75deg) rotateZ(360deg);
    }
}
@keyframes rotate3 {
    0% {
        transform: translateX(-50%) rotateX(75deg) rotateZ(0);
    }
    100% {
        transform: translateX(-50%) rotateX(75deg) rotateZ(360deg);
    }
}
@keyframes rotate4 {
    0% {
        transform: translateX(-50%) rotateX(75deg) rotateZ(0);
    }
    100% {
        transform: translateX(-50%) rotateX(75deg) rotateZ(-360deg);
    }
}
@keyframes rotate5 {
    0% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, 270, 0, 0, 1);
        z-index: 100;
    }
    1% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, 269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    2% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, 267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    3% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, 265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    4% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, 261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    5% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, 256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    6% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, 251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    7% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, 244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    8% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, 236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    9% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, 227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    10% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, 218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    11% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, 208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    12% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, 196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    13% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, 184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    14% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, 172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    15% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, 158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    16% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, 144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    17% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, 130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    18% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, 114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    19% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, 99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    20% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, 83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    21% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, 67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    22% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, 50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    23% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, 33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    24% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, 16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    25% {
        transform: matrix3d(1.23333, 0, 0, 0, 0, 1.23333, 0, 0, 0, 0, 1, 0, 0, 100, 0, 1);
        z-index: 101;
    }
    26% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, -16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    27% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, -33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    28% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, -50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    29% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, -67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    30% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, -83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    31% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, -99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    32% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, -114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    33% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, -130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    34% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, -144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    35% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, -158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    36% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, -172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    37% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, -184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    38% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, -196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    39% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, -208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    40% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, -218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    41% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, -227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    42% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, -236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    43% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, -244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    44% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, -251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    45% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, -256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    46% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, -261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    47% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, -265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    48% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, -267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    49% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, -269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    50% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, -270, 0, 0, 1);
        z-index: 100;
    }
    51% {
        transform: matrix3d(0.87907, 0, 0, 0, 0, 0.87907, 0, 0, 0, 0, 1, 0, -269.46722, -6.27905, 0, 1);
        z-index: 99.93721;
    }
    52% {
        transform: matrix3d(0.85822, 0, 0, 0, 0, 0.85822, 0, 0, 0, 0, 1, 0, -267.87097, -12.53332, 0, 1);
        z-index: 99.87467;
    }
    53% {
        transform: matrix3d(0.83754, 0, 0, 0, 0, 0.83754, 0, 0, 0, 0, 1, 0, -265.21756, -18.73813, 0, 1);
        z-index: 99.81262;
    }
    54% {
        transform: matrix3d(0.8171, 0, 0, 0, 0, 0.8171, 0, 0, 0, 0, 1, 0, -261.51745, -24.86899, 0, 1);
        z-index: 99.75131;
    }
    55% {
        transform: matrix3d(0.79699, 0, 0, 0, 0, 0.79699, 0, 0, 0, 0, 1, 0, -256.78526, -30.9017, 0, 1);
        z-index: 99.69098;
    }
    56% {
        transform: matrix3d(0.77729, 0, 0, 0, 0, 0.77729, 0, 0, 0, 0, 1, 0, -251.03965, -36.81246, 0, 1);
        z-index: 99.63188;
    }
    57% {
        transform: matrix3d(0.75807, 0, 0, 0, 0, 0.75807, 0, 0, 0, 0, 1, 0, -244.3033, -42.57793, 0, 1);
        z-index: 99.57422;
    }
    58% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, -236.6028, -48.17537, 0, 1);
        z-index: 99.51825;
    }
    59% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, -227.96854, -53.58268, 0, 1);
        z-index: 99.46417;
    }
    60% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, -218.43459, -58.77853, 0, 1);
        z-index: 99.41221;
    }
    61% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, -208.03857, -63.7424, 0, 1);
        z-index: 99.36258;
    }
    62% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, -196.82153, -68.45471, 0, 1);
        z-index: 99.31545;
    }
    63% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, -184.82772, -72.89686, 0, 1);
        z-index: 99.27103;
    }
    64% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, -172.10447, -77.05132, 0, 1);
        z-index: 99.22949;
    }
    65% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, -158.70201, -80.9017, 0, 1);
        z-index: 99.19098;
    }
    66% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, -144.67323, -84.43279, 0, 1);
        z-index: 99.15567;
    }
    67% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, -130.07348, -87.63067, 0, 1);
        z-index: 99.12369;
    }
    68% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, -114.96039, -90.4827, 0, 1);
        z-index: 99.09517;
    }
    69% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, -99.39361, -92.97765, 0, 1);
        z-index: 99.07022;
    }
    70% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, -83.43456, -95.10565, 0, 1);
        z-index: 99.04894;
    }
    71% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, -67.14622, -96.85831, 0, 1);
        z-index: 99.03142;
    }
    72% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, -50.59289, -98.22872, 0, 1);
        z-index: 99.01771;
    }
    73% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, -33.83989, -99.21146, 0, 1);
        z-index: 99.00789;
    }
    74% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, -16.95333, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    75% {
        transform: matrix3d(0.56667, 0, 0, 0, 0, 0.56667, 0, 0, 0, 0, 1, 0, 0.00015, -99.99999, 0, 1);
        z-index: 99;
    }
    76% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, 16.95364, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    77% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, 33.84024, -99.21145, 0, 1);
        z-index: 99.00789;
    }
    78% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, 50.59331, -98.2287, 0, 1);
        z-index: 99.01771;
    }
    79% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, 67.14674, -96.85828, 0, 1);
        z-index: 99.03142;
    }
    80% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, 83.4352, -95.1056, 0, 1);
        z-index: 99.04894;
    }
    81% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, 99.39444, -92.97758, 0, 1);
        z-index: 99.07022;
    }
    82% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, 114.96147, -90.48262, 0, 1);
        z-index: 99.09517;
    }
    83% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, 130.07487, -87.63055, 0, 1);
        z-index: 99.12369;
    }
    84% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, 144.67503, -84.43264, 0, 1);
        z-index: 99.15567;
    }
    85% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, 158.70434, -80.9015, 0, 1);
        z-index: 99.19099;
    }
    86% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, 172.10748, -77.05106, 0, 1);
        z-index: 99.22949;
    }
    87% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, 184.83158, -72.89652, 0, 1);
        z-index: 99.27103;
    }
    88% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, 196.82649, -68.45427, 0, 1);
        z-index: 99.31546;
    }
    89% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, 208.04493, -63.74182, 0, 1);
        z-index: 99.36258;
    }
    90% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, 218.4427, -58.77778, 0, 1);
        z-index: 99.41222;
    }
    91% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, 227.97887, -53.58172, 0, 1);
        z-index: 99.46418;
    }
    92% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, 236.61593, -48.17414, 0, 1);
        z-index: 99.51826;
    }
    93% {
        transform: matrix3d(0.75808, 0, 0, 0, 0, 0.75808, 0, 0, 0, 0, 1, 0, 244.31993, -42.57636, 0, 1);
        z-index: 99.57424;
    }
    94% {
        transform: matrix3d(0.7773, 0, 0, 0, 0, 0.7773, 0, 0, 0, 0, 1, 0, 251.06067, -36.81045, 0, 1);
        z-index: 99.6319;
    }
    95% {
        transform: matrix3d(0.797, 0, 0, 0, 0, 0.797, 0, 0, 0, 0, 1, 0, 256.81175, -30.89914, 0, 1);
        z-index: 99.69101;
    }
    96% {
        transform: matrix3d(0.81711, 0, 0, 0, 0, 0.81711, 0, 0, 0, 0, 1, 0, 261.55076, -24.86574, 0, 1);
        z-index: 99.75134;
    }
    97% {
        transform: matrix3d(0.83755, 0, 0, 0, 0, 0.83755, 0, 0, 0, 0, 1, 0, 265.25934, -18.73401, 0, 1);
        z-index: 99.81266;
    }
    98% {
        transform: matrix3d(0.85824, 0, 0, 0, 0, 0.85824, 0, 0, 0, 0, 1, 0, 267.92326, -12.52811, 0, 1);
        z-index: 99.87472;
    }
    99% {
        transform: matrix3d(0.87909, 0, 0, 0, 0, 0.87909, 0, 0, 0, 0, 1, 0, 269.5325, -6.27248, 0, 1);
        z-index: 99.93728;
    }
    100% {
        transform: matrix3d(0.90003, 0, 0, 0, 0, 0.90003, 0, 0, 0, 0, 1, 0, 270.08133, 0.00827, 0, 1);
        z-index: 100.00008;
    }
}
@keyframes rotate6 {
    0% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, -16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    1% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, -33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    2% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, -50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    3% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, -67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    4% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, -83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    5% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, -99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    6% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, -114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    7% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, -130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    8% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, -144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    9% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, -158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    10% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, -172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    11% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, -184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    12% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, -196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    13% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, -208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    14% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, -218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    15% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, -227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    16% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, -236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    17% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, -244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    18% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, -251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    19% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, -256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    20% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, -261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    21% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, -265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    22% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, -267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    23% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, -269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    24% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, -270, 0, 0, 1);
        z-index: 100;
    }
    25% {
        transform: matrix3d(0.87907, 0, 0, 0, 0, 0.87907, 0, 0, 0, 0, 1, 0, -269.46722, -6.27905, 0, 1);
        z-index: 99.93721;
    }
    26% {
        transform: matrix3d(0.85822, 0, 0, 0, 0, 0.85822, 0, 0, 0, 0, 1, 0, -267.87097, -12.53332, 0, 1);
        z-index: 99.87467;
    }
    27% {
        transform: matrix3d(0.83754, 0, 0, 0, 0, 0.83754, 0, 0, 0, 0, 1, 0, -265.21756, -18.73813, 0, 1);
        z-index: 99.81262;
    }
    28% {
        transform: matrix3d(0.8171, 0, 0, 0, 0, 0.8171, 0, 0, 0, 0, 1, 0, -261.51745, -24.86899, 0, 1);
        z-index: 99.75131;
    }
    29% {
        transform: matrix3d(0.79699, 0, 0, 0, 0, 0.79699, 0, 0, 0, 0, 1, 0, -256.78526, -30.9017, 0, 1);
        z-index: 99.69098;
    }
    30% {
        transform: matrix3d(0.77729, 0, 0, 0, 0, 0.77729, 0, 0, 0, 0, 1, 0, -251.03965, -36.81246, 0, 1);
        z-index: 99.63188;
    }
    31% {
        transform: matrix3d(0.75807, 0, 0, 0, 0, 0.75807, 0, 0, 0, 0, 1, 0, -244.3033, -42.57793, 0, 1);
        z-index: 99.57422;
    }
    32% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, -236.6028, -48.17537, 0, 1);
        z-index: 99.51825;
    }
    33% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, -227.96854, -53.58268, 0, 1);
        z-index: 99.46417;
    }
    34% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, -218.43459, -58.77853, 0, 1);
        z-index: 99.41221;
    }
    35% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, -208.03857, -63.7424, 0, 1);
        z-index: 99.36258;
    }
    36% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, -196.82153, -68.45471, 0, 1);
        z-index: 99.31545;
    }
    37% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, -184.82772, -72.89686, 0, 1);
        z-index: 99.27103;
    }
    38% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, -172.10447, -77.05132, 0, 1);
        z-index: 99.22949;
    }
    39% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, -158.70201, -80.9017, 0, 1);
        z-index: 99.19098;
    }
    40% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, -144.67323, -84.43279, 0, 1);
        z-index: 99.15567;
    }
    41% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, -130.07348, -87.63067, 0, 1);
        z-index: 99.12369;
    }
    42% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, -114.96039, -90.4827, 0, 1);
        z-index: 99.09517;
    }
    43% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, -99.39361, -92.97765, 0, 1);
        z-index: 99.07022;
    }
    44% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, -83.43456, -95.10565, 0, 1);
        z-index: 99.04894;
    }
    45% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, -67.14622, -96.85831, 0, 1);
        z-index: 99.03142;
    }
    46% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, -50.59289, -98.22872, 0, 1);
        z-index: 99.01771;
    }
    47% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, -33.83989, -99.21146, 0, 1);
        z-index: 99.00789;
    }
    48% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, -16.95333, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    49% {
        transform: matrix3d(0.56667, 0, 0, 0, 0, 0.56667, 0, 0, 0, 0, 1, 0, 0.00015, -99.99999, 0, 1);
        z-index: 99;
    }
    50% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, 16.95364, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    51% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, 33.84024, -99.21145, 0, 1);
        z-index: 99.00789;
    }
    52% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, 50.59331, -98.2287, 0, 1);
        z-index: 99.01771;
    }
    53% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, 67.14674, -96.85828, 0, 1);
        z-index: 99.03142;
    }
    54% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, 83.4352, -95.1056, 0, 1);
        z-index: 99.04894;
    }
    55% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, 99.39444, -92.97758, 0, 1);
        z-index: 99.07022;
    }
    56% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, 114.96147, -90.48262, 0, 1);
        z-index: 99.09517;
    }
    57% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, 130.07487, -87.63055, 0, 1);
        z-index: 99.12369;
    }
    58% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, 144.67503, -84.43264, 0, 1);
        z-index: 99.15567;
    }
    59% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, 158.70434, -80.9015, 0, 1);
        z-index: 99.19099;
    }
    60% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, 172.10748, -77.05106, 0, 1);
        z-index: 99.22949;
    }
    61% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, 184.83158, -72.89652, 0, 1);
        z-index: 99.27103;
    }
    62% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, 196.82649, -68.45427, 0, 1);
        z-index: 99.31546;
    }
    63% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, 208.04493, -63.74182, 0, 1);
        z-index: 99.36258;
    }
    64% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, 218.4427, -58.77778, 0, 1);
        z-index: 99.41222;
    }
    65% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, 227.97887, -53.58172, 0, 1);
        z-index: 99.46418;
    }
    66% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, 236.61593, -48.17414, 0, 1);
        z-index: 99.51826;
    }
    67% {
        transform: matrix3d(0.75808, 0, 0, 0, 0, 0.75808, 0, 0, 0, 0, 1, 0, 244.31993, -42.57636, 0, 1);
        z-index: 99.57424;
    }
    68% {
        transform: matrix3d(0.7773, 0, 0, 0, 0, 0.7773, 0, 0, 0, 0, 1, 0, 251.06067, -36.81045, 0, 1);
        z-index: 99.6319;
    }
    69% {
        transform: matrix3d(0.797, 0, 0, 0, 0, 0.797, 0, 0, 0, 0, 1, 0, 256.81175, -30.89914, 0, 1);
        z-index: 99.69101;
    }
    70% {
        transform: matrix3d(0.81711, 0, 0, 0, 0, 0.81711, 0, 0, 0, 0, 1, 0, 261.55076, -24.86574, 0, 1);
        z-index: 99.75134;
    }
    71% {
        transform: matrix3d(0.83755, 0, 0, 0, 0, 0.83755, 0, 0, 0, 0, 1, 0, 265.25934, -18.73401, 0, 1);
        z-index: 99.81266;
    }
    72% {
        transform: matrix3d(0.85824, 0, 0, 0, 0, 0.85824, 0, 0, 0, 0, 1, 0, 267.92326, -12.52811, 0, 1);
        z-index: 99.87472;
    }
    73% {
        transform: matrix3d(0.87909, 0, 0, 0, 0, 0.87909, 0, 0, 0, 0, 1, 0, 269.5325, -6.27248, 0, 1);
        z-index: 99.93728;
    }
    74% {
        transform: matrix3d(0.90003, 0, 0, 0, 0, 0.90003, 0, 0, 0, 0, 1, 0, 270.08133, 0.00827, 0, 1);
        z-index: 100.00008;
    }
    75% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, 270, 0, 0, 1);
        z-index: 100;
    }
    76% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, 269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    77% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, 267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    78% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, 265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    79% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, 261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    80% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, 256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    81% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, 251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    82% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, 244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    83% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, 236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    84% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, 227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    85% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, 218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    86% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, 208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    87% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, 196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    88% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, 184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    89% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, 172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    90% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, 158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    91% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, 144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    92% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, 130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    93% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, 114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    94% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, 99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    95% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, 83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    96% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, 67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    97% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, 50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    98% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, 33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    99% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, 16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    100% {
        transform: matrix3d(1.23333, 0, 0, 0, 0, 1.23333, 0, 0, 0, 0, 1, 0, 0, 100, 0, 1);
        z-index: 101;
    }
}
@keyframes rotate7 {
    0% {
        transform: matrix3d(0.85822, 0, 0, 0, 0, 0.85822, 0, 0, 0, 0, 1, 0, -267.87097, -12.53332, 0, 1);
        z-index: 99.87467;
    }
    1% {
        transform: matrix3d(0.83754, 0, 0, 0, 0, 0.83754, 0, 0, 0, 0, 1, 0, -265.21756, -18.73813, 0, 1);
        z-index: 99.81262;
    }
    2% {
        transform: matrix3d(0.8171, 0, 0, 0, 0, 0.8171, 0, 0, 0, 0, 1, 0, -261.51745, -24.86899, 0, 1);
        z-index: 99.75131;
    }
    3% {
        transform: matrix3d(0.79699, 0, 0, 0, 0, 0.79699, 0, 0, 0, 0, 1, 0, -256.78526, -30.9017, 0, 1);
        z-index: 99.69098;
    }
    4% {
        transform: matrix3d(0.77729, 0, 0, 0, 0, 0.77729, 0, 0, 0, 0, 1, 0, -251.03965, -36.81246, 0, 1);
        z-index: 99.63188;
    }
    5% {
        transform: matrix3d(0.75807, 0, 0, 0, 0, 0.75807, 0, 0, 0, 0, 1, 0, -244.3033, -42.57793, 0, 1);
        z-index: 99.57422;
    }
    6% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, -236.6028, -48.17537, 0, 1);
        z-index: 99.51825;
    }
    7% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, -227.96854, -53.58268, 0, 1);
        z-index: 99.46417;
    }
    8% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, -218.43459, -58.77853, 0, 1);
        z-index: 99.41221;
    }
    9% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, -208.03857, -63.7424, 0, 1);
        z-index: 99.36258;
    }
    10% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, -196.82153, -68.45471, 0, 1);
        z-index: 99.31545;
    }
    11% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, -184.82772, -72.89686, 0, 1);
        z-index: 99.27103;
    }
    12% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, -172.10447, -77.05132, 0, 1);
        z-index: 99.22949;
    }
    13% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, -158.70201, -80.9017, 0, 1);
        z-index: 99.19098;
    }
    14% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, -144.67323, -84.43279, 0, 1);
        z-index: 99.15567;
    }
    15% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, -130.07348, -87.63067, 0, 1);
        z-index: 99.12369;
    }
    16% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, -114.96039, -90.4827, 0, 1);
        z-index: 99.09517;
    }
    17% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, -99.39361, -92.97765, 0, 1);
        z-index: 99.07022;
    }
    18% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, -83.43456, -95.10565, 0, 1);
        z-index: 99.04894;
    }
    19% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, -67.14622, -96.85831, 0, 1);
        z-index: 99.03142;
    }
    20% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, -50.59289, -98.22872, 0, 1);
        z-index: 99.01771;
    }
    21% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, -33.83989, -99.21146, 0, 1);
        z-index: 99.00789;
    }
    22% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, -16.95333, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    23% {
        transform: matrix3d(0.56667, 0, 0, 0, 0, 0.56667, 0, 0, 0, 0, 1, 0, 0.00015, -99.99999, 0, 1);
        z-index: 99;
    }
    24% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, 16.95364, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    25% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, 33.84024, -99.21145, 0, 1);
        z-index: 99.00789;
    }
    26% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, 50.59331, -98.2287, 0, 1);
        z-index: 99.01771;
    }
    27% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, 67.14674, -96.85828, 0, 1);
        z-index: 99.03142;
    }
    28% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, 83.4352, -95.1056, 0, 1);
        z-index: 99.04894;
    }
    29% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, 99.39444, -92.97758, 0, 1);
        z-index: 99.07022;
    }
    30% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, 114.96147, -90.48262, 0, 1);
        z-index: 99.09517;
    }
    31% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, 130.07487, -87.63055, 0, 1);
        z-index: 99.12369;
    }
    32% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, 144.67503, -84.43264, 0, 1);
        z-index: 99.15567;
    }
    33% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, 158.70434, -80.9015, 0, 1);
        z-index: 99.19099;
    }
    34% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, 172.10748, -77.05106, 0, 1);
        z-index: 99.22949;
    }
    35% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, 184.83158, -72.89652, 0, 1);
        z-index: 99.27103;
    }
    36% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, 196.82649, -68.45427, 0, 1);
        z-index: 99.31546;
    }
    37% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, 208.04493, -63.74182, 0, 1);
        z-index: 99.36258;
    }
    38% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, 218.4427, -58.77778, 0, 1);
        z-index: 99.41222;
    }
    39% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, 227.97887, -53.58172, 0, 1);
        z-index: 99.46418;
    }
    40% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, 236.61593, -48.17414, 0, 1);
        z-index: 99.51826;
    }
    41% {
        transform: matrix3d(0.75808, 0, 0, 0, 0, 0.75808, 0, 0, 0, 0, 1, 0, 244.31993, -42.57636, 0, 1);
        z-index: 99.57424;
    }
    42% {
        transform: matrix3d(0.7773, 0, 0, 0, 0, 0.7773, 0, 0, 0, 0, 1, 0, 251.06067, -36.81045, 0, 1);
        z-index: 99.6319;
    }
    43% {
        transform: matrix3d(0.797, 0, 0, 0, 0, 0.797, 0, 0, 0, 0, 1, 0, 256.81175, -30.89914, 0, 1);
        z-index: 99.69101;
    }
    44% {
        transform: matrix3d(0.81711, 0, 0, 0, 0, 0.81711, 0, 0, 0, 0, 1, 0, 261.55076, -24.86574, 0, 1);
        z-index: 99.75134;
    }
    45% {
        transform: matrix3d(0.83755, 0, 0, 0, 0, 0.83755, 0, 0, 0, 0, 1, 0, 265.25934, -18.73401, 0, 1);
        z-index: 99.81266;
    }
    46% {
        transform: matrix3d(0.85824, 0, 0, 0, 0, 0.85824, 0, 0, 0, 0, 1, 0, 267.92326, -12.52811, 0, 1);
        z-index: 99.87472;
    }
    47% {
        transform: matrix3d(0.87909, 0, 0, 0, 0, 0.87909, 0, 0, 0, 0, 1, 0, 269.5325, -6.27248, 0, 1);
        z-index: 99.93728;
    }
    48% {
        transform: matrix3d(0.90003, 0, 0, 0, 0, 0.90003, 0, 0, 0, 0, 1, 0, 270.08133, 0.00827, 0, 1);
        z-index: 100.00008;
    }
    49% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, 270, 0, 0, 1);
        z-index: 100;
    }
    50% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, 269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    51% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, 267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    52% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, 265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    53% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, 261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    54% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, 256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    55% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, 251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    56% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, 244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    57% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, 236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    58% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, 227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    59% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, 218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    60% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, 208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    61% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, 196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    62% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, 184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    63% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, 172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    64% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, 158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    65% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, 144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    66% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, 130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    67% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, 114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    68% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, 99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    69% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, 83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    70% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, 67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    71% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, 50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    72% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, 33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    73% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, 16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    74% {
        transform: matrix3d(1.23333, 0, 0, 0, 0, 1.23333, 0, 0, 0, 0, 1, 0, 0, 100, 0, 1);
        z-index: 101;
    }
    75% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, -16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    76% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, -33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    77% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, -50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    78% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, -67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    79% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, -83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    80% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, -99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    81% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, -114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    82% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, -130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    83% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, -144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    84% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, -158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    85% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, -172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    86% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, -184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    87% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, -196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    88% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, -208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    89% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, -218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    90% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, -227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    91% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, -236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    92% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, -244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    93% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, -251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    94% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, -256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    95% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, -261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    96% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, -265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    97% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, -267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    98% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, -269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    99% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, -270, 0, 0, 1);
        z-index: 100;
    }
    100% {
        transform: matrix3d(0.87907, 0, 0, 0, 0, 0.87907, 0, 0, 0, 0, 1, 0, -269.46722, -6.27905, 0, 1);
        z-index: 99.93721;
    }
}
@keyframes rotate8 {
    0% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, 50.59331, -98.2287, 0, 1);
        z-index: 99.01771;
    }
    1% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, 67.14674, -96.85828, 0, 1);
        z-index: 99.03142;
    }
    2% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, 83.4352, -95.1056, 0, 1);
        z-index: 99.04894;
    }
    3% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, 99.39444, -92.97758, 0, 1);
        z-index: 99.07022;
    }
    4% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, 114.96147, -90.48262, 0, 1);
        z-index: 99.09517;
    }
    5% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, 130.07487, -87.63055, 0, 1);
        z-index: 99.12369;
    }
    6% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, 144.67503, -84.43264, 0, 1);
        z-index: 99.15567;
    }
    7% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, 158.70434, -80.9015, 0, 1);
        z-index: 99.19099;
    }
    8% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, 172.10748, -77.05106, 0, 1);
        z-index: 99.22949;
    }
    9% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, 184.83158, -72.89652, 0, 1);
        z-index: 99.27103;
    }
    10% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, 196.82649, -68.45427, 0, 1);
        z-index: 99.31546;
    }
    11% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, 208.04493, -63.74182, 0, 1);
        z-index: 99.36258;
    }
    12% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, 218.4427, -58.77778, 0, 1);
        z-index: 99.41222;
    }
    13% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, 227.97887, -53.58172, 0, 1);
        z-index: 99.46418;
    }
    14% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, 236.61593, -48.17414, 0, 1);
        z-index: 99.51826;
    }
    15% {
        transform: matrix3d(0.75808, 0, 0, 0, 0, 0.75808, 0, 0, 0, 0, 1, 0, 244.31993, -42.57636, 0, 1);
        z-index: 99.57424;
    }
    16% {
        transform: matrix3d(0.7773, 0, 0, 0, 0, 0.7773, 0, 0, 0, 0, 1, 0, 251.06067, -36.81045, 0, 1);
        z-index: 99.6319;
    }
    17% {
        transform: matrix3d(0.797, 0, 0, 0, 0, 0.797, 0, 0, 0, 0, 1, 0, 256.81175, -30.89914, 0, 1);
        z-index: 99.69101;
    }
    18% {
        transform: matrix3d(0.81711, 0, 0, 0, 0, 0.81711, 0, 0, 0, 0, 1, 0, 261.55076, -24.86574, 0, 1);
        z-index: 99.75134;
    }
    19% {
        transform: matrix3d(0.83755, 0, 0, 0, 0, 0.83755, 0, 0, 0, 0, 1, 0, 265.25934, -18.73401, 0, 1);
        z-index: 99.81266;
    }
    20% {
        transform: matrix3d(0.85824, 0, 0, 0, 0, 0.85824, 0, 0, 0, 0, 1, 0, 267.92326, -12.52811, 0, 1);
        z-index: 99.87472;
    }
    21% {
        transform: matrix3d(0.87909, 0, 0, 0, 0, 0.87909, 0, 0, 0, 0, 1, 0, 269.5325, -6.27248, 0, 1);
        z-index: 99.93728;
    }
    22% {
        transform: matrix3d(0.90003, 0, 0, 0, 0, 0.90003, 0, 0, 0, 0, 1, 0, 270.08133, 0.00827, 0, 1);
        z-index: 100.00008;
    }
    23% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, 270, 0, 0, 1);
        z-index: 100;
    }
    24% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, 269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    25% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, 267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    26% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, 265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    27% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, 261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    28% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, 256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    29% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, 251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    30% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, 244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    31% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, 236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    32% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, 227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    33% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, 218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    34% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, 208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    35% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, 196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    36% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, 184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    37% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, 172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    38% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, 158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    39% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, 144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    40% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, 130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    41% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, 114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    42% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, 99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    43% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, 83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    44% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, 67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    45% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, 50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    46% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, 33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    47% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, 16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    48% {
        transform: matrix3d(1.23333, 0, 0, 0, 0, 1.23333, 0, 0, 0, 0, 1, 0, 0, 100, 0, 1);
        z-index: 101;
    }
    49% {
        transform: matrix3d(1.23268, 0, 0, 0, 0, 1.23268, 0, 0, 0, 0, 1, 0, -16.95344, 99.80267, 0, 1);
        z-index: 100.99803;
    }
    50% {
        transform: matrix3d(1.2307, 0, 0, 0, 0, 1.2307, 0, 0, 0, 0, 1, 0, -33.83997, 99.21147, 0, 1);
        z-index: 100.99211;
    }
    51% {
        transform: matrix3d(1.22743, 0, 0, 0, 0, 1.22743, 0, 0, 0, 0, 1, 0, -50.59295, 98.22873, 0, 1);
        z-index: 100.98229;
    }
    52% {
        transform: matrix3d(1.22286, 0, 0, 0, 0, 1.22286, 0, 0, 0, 0, 1, 0, -67.14627, 96.85832, 0, 1);
        z-index: 100.96858;
    }
    53% {
        transform: matrix3d(1.21702, 0, 0, 0, 0, 1.21702, 0, 0, 0, 0, 1, 0, -83.43459, 95.10565, 0, 1);
        z-index: 100.95106;
    }
    54% {
        transform: matrix3d(1.20993, 0, 0, 0, 0, 1.20993, 0, 0, 0, 0, 1, 0, -99.39363, 92.97765, 0, 1);
        z-index: 100.92978;
    }
    55% {
        transform: matrix3d(1.20161, 0, 0, 0, 0, 1.20161, 0, 0, 0, 0, 1, 0, -114.96041, 90.48271, 0, 1);
        z-index: 100.90483;
    }
    56% {
        transform: matrix3d(1.1921, 0, 0, 0, 0, 1.1921, 0, 0, 0, 0, 1, 0, -130.07349, 87.63067, 0, 1);
        z-index: 100.87631;
    }
    57% {
        transform: matrix3d(1.18144, 0, 0, 0, 0, 1.18144, 0, 0, 0, 0, 1, 0, -144.67323, 84.43279, 0, 1);
        z-index: 100.84433;
    }
    58% {
        transform: matrix3d(1.16967, 0, 0, 0, 0, 1.16967, 0, 0, 0, 0, 1, 0, -158.70202, 80.9017, 0, 1);
        z-index: 100.80902;
    }
    59% {
        transform: matrix3d(1.15684, 0, 0, 0, 0, 1.15684, 0, 0, 0, 0, 1, 0, -172.10448, 77.05132, 0, 1);
        z-index: 100.77051;
    }
    60% {
        transform: matrix3d(1.14299, 0, 0, 0, 0, 1.14299, 0, 0, 0, 0, 1, 0, -184.82772, 72.89686, 0, 1);
        z-index: 100.72897;
    }
    61% {
        transform: matrix3d(1.12818, 0, 0, 0, 0, 1.12818, 0, 0, 0, 0, 1, 0, -196.82153, 68.45471, 0, 1);
        z-index: 100.68455;
    }
    62% {
        transform: matrix3d(1.11247, 0, 0, 0, 0, 1.11247, 0, 0, 0, 0, 1, 0, -208.03858, 63.7424, 0, 1);
        z-index: 100.63742;
    }
    63% {
        transform: matrix3d(1.09593, 0, 0, 0, 0, 1.09593, 0, 0, 0, 0, 1, 0, -218.43459, 58.77853, 0, 1);
        z-index: 100.58779;
    }
    64% {
        transform: matrix3d(1.07861, 0, 0, 0, 0, 1.07861, 0, 0, 0, 0, 1, 0, -227.96854, 53.58268, 0, 1);
        z-index: 100.53583;
    }
    65% {
        transform: matrix3d(1.06058, 0, 0, 0, 0, 1.06058, 0, 0, 0, 0, 1, 0, -236.6028, 48.17537, 0, 1);
        z-index: 100.48175;
    }
    66% {
        transform: matrix3d(1.04193, 0, 0, 0, 0, 1.04193, 0, 0, 0, 0, 1, 0, -244.3033, 42.57793, 0, 1);
        z-index: 100.42578;
    }
    67% {
        transform: matrix3d(1.02271, 0, 0, 0, 0, 1.02271, 0, 0, 0, 0, 1, 0, -251.03965, 36.81246, 0, 1);
        z-index: 100.36812;
    }
    68% {
        transform: matrix3d(1.00301, 0, 0, 0, 0, 1.00301, 0, 0, 0, 0, 1, 0, -256.78526, 30.9017, 0, 1);
        z-index: 100.30902;
    }
    69% {
        transform: matrix3d(0.9829, 0, 0, 0, 0, 0.9829, 0, 0, 0, 0, 1, 0, -261.51745, 24.86899, 0, 1);
        z-index: 100.24869;
    }
    70% {
        transform: matrix3d(0.96246, 0, 0, 0, 0, 0.96246, 0, 0, 0, 0, 1, 0, -265.21756, 18.73813, 0, 1);
        z-index: 100.18738;
    }
    71% {
        transform: matrix3d(0.94178, 0, 0, 0, 0, 0.94178, 0, 0, 0, 0, 1, 0, -267.87097, 12.53332, 0, 1);
        z-index: 100.12533;
    }
    72% {
        transform: matrix3d(0.92093, 0, 0, 0, 0, 0.92093, 0, 0, 0, 0, 1, 0, -269.46722, 6.27905, 0, 1);
        z-index: 100.06279;
    }
    73% {
        transform: matrix3d(0.9, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1, 0, -270, 0, 0, 1);
        z-index: 100;
    }
    74% {
        transform: matrix3d(0.87907, 0, 0, 0, 0, 0.87907, 0, 0, 0, 0, 1, 0, -269.46722, -6.27905, 0, 1);
        z-index: 99.93721;
    }
    75% {
        transform: matrix3d(0.85822, 0, 0, 0, 0, 0.85822, 0, 0, 0, 0, 1, 0, -267.87097, -12.53332, 0, 1);
        z-index: 99.87467;
    }
    76% {
        transform: matrix3d(0.83754, 0, 0, 0, 0, 0.83754, 0, 0, 0, 0, 1, 0, -265.21756, -18.73813, 0, 1);
        z-index: 99.81262;
    }
    77% {
        transform: matrix3d(0.8171, 0, 0, 0, 0, 0.8171, 0, 0, 0, 0, 1, 0, -261.51745, -24.86899, 0, 1);
        z-index: 99.75131;
    }
    78% {
        transform: matrix3d(0.79699, 0, 0, 0, 0, 0.79699, 0, 0, 0, 0, 1, 0, -256.78526, -30.9017, 0, 1);
        z-index: 99.69098;
    }
    79% {
        transform: matrix3d(0.77729, 0, 0, 0, 0, 0.77729, 0, 0, 0, 0, 1, 0, -251.03965, -36.81246, 0, 1);
        z-index: 99.63188;
    }
    80% {
        transform: matrix3d(0.75807, 0, 0, 0, 0, 0.75807, 0, 0, 0, 0, 1, 0, -244.3033, -42.57793, 0, 1);
        z-index: 99.57422;
    }
    81% {
        transform: matrix3d(0.73942, 0, 0, 0, 0, 0.73942, 0, 0, 0, 0, 1, 0, -236.6028, -48.17537, 0, 1);
        z-index: 99.51825;
    }
    82% {
        transform: matrix3d(0.72139, 0, 0, 0, 0, 0.72139, 0, 0, 0, 0, 1, 0, -227.96854, -53.58268, 0, 1);
        z-index: 99.46417;
    }
    83% {
        transform: matrix3d(0.70407, 0, 0, 0, 0, 0.70407, 0, 0, 0, 0, 1, 0, -218.43459, -58.77853, 0, 1);
        z-index: 99.41221;
    }
    84% {
        transform: matrix3d(0.68753, 0, 0, 0, 0, 0.68753, 0, 0, 0, 0, 1, 0, -208.03857, -63.7424, 0, 1);
        z-index: 99.36258;
    }
    85% {
        transform: matrix3d(0.67182, 0, 0, 0, 0, 0.67182, 0, 0, 0, 0, 1, 0, -196.82153, -68.45471, 0, 1);
        z-index: 99.31545;
    }
    86% {
        transform: matrix3d(0.65701, 0, 0, 0, 0, 0.65701, 0, 0, 0, 0, 1, 0, -184.82772, -72.89686, 0, 1);
        z-index: 99.27103;
    }
    87% {
        transform: matrix3d(0.64316, 0, 0, 0, 0, 0.64316, 0, 0, 0, 0, 1, 0, -172.10447, -77.05132, 0, 1);
        z-index: 99.22949;
    }
    88% {
        transform: matrix3d(0.63033, 0, 0, 0, 0, 0.63033, 0, 0, 0, 0, 1, 0, -158.70201, -80.9017, 0, 1);
        z-index: 99.19098;
    }
    89% {
        transform: matrix3d(0.61856, 0, 0, 0, 0, 0.61856, 0, 0, 0, 0, 1, 0, -144.67323, -84.43279, 0, 1);
        z-index: 99.15567;
    }
    90% {
        transform: matrix3d(0.6079, 0, 0, 0, 0, 0.6079, 0, 0, 0, 0, 1, 0, -130.07348, -87.63067, 0, 1);
        z-index: 99.12369;
    }
    91% {
        transform: matrix3d(0.59839, 0, 0, 0, 0, 0.59839, 0, 0, 0, 0, 1, 0, -114.96039, -90.4827, 0, 1);
        z-index: 99.09517;
    }
    92% {
        transform: matrix3d(0.59007, 0, 0, 0, 0, 0.59007, 0, 0, 0, 0, 1, 0, -99.39361, -92.97765, 0, 1);
        z-index: 99.07022;
    }
    93% {
        transform: matrix3d(0.58298, 0, 0, 0, 0, 0.58298, 0, 0, 0, 0, 1, 0, -83.43456, -95.10565, 0, 1);
        z-index: 99.04894;
    }
    94% {
        transform: matrix3d(0.57714, 0, 0, 0, 0, 0.57714, 0, 0, 0, 0, 1, 0, -67.14622, -96.85831, 0, 1);
        z-index: 99.03142;
    }
    95% {
        transform: matrix3d(0.57257, 0, 0, 0, 0, 0.57257, 0, 0, 0, 0, 1, 0, -50.59289, -98.22872, 0, 1);
        z-index: 99.01771;
    }
    96% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, -33.83989, -99.21146, 0, 1);
        z-index: 99.00789;
    }
    97% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, -16.95333, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    98% {
        transform: matrix3d(0.56667, 0, 0, 0, 0, 0.56667, 0, 0, 0, 0, 1, 0, 0.00015, -99.99999, 0, 1);
        z-index: 99;
    }
    99% {
        transform: matrix3d(0.56732, 0, 0, 0, 0, 0.56732, 0, 0, 0, 0, 1, 0, 16.95364, -99.80266, 0, 1);
        z-index: 99.00197;
    }
    100% {
        transform: matrix3d(0.5693, 0, 0, 0, 0, 0.5693, 0, 0, 0, 0, 1, 0, 33.84024, -99.21145, 0, 1);
        z-index: 99.00789;
    }
}
</style>