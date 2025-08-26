<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// 注册DrawSVGPlugin插件
gsap.registerPlugin(DrawSVGPlugin);

function rainBg() {
    var c = document.querySelector(".rain");
    var ctx = c.getContext("2d");//获取canvas上下文
    var w = c.width = document.querySelector('.total').clientWidth;
    var h = c.height = document.querySelector('.total').clientHeight;
    //设置canvas宽、高

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function RainDrop() { }
    //雨滴对象 这是绘制雨滴动画的关键
    RainDrop.prototype = {
        init: function () {
            this.x = random(0, w);//雨滴的位置x
            this.y = h;//雨滴的位置y
            this.color = 'hsl(180, 100%, 50%)';//雨滴颜色 长方形的填充色
            this.vy = random(4, 5);//雨滴下落速度
            this.hit = 0;//下落的最大值
            this.size = 2;//长方形宽度
        },
        draw: function () {
            if (this.y > this.hit) {
                var linearGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.size * 30)
                // 设置起始颜色
                linearGradient.addColorStop(0, '#14789c')
                // 设置终止颜色
                linearGradient.addColorStop(1, '#090723')
                // 设置填充样式
                ctx.fillStyle = linearGradient
                ctx.fillRect(this.x, this.y, this.size, this.size * 50);//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
            }
            this.update();//更新位置
        },
        update: function () {
            if (this.y > this.hit) {
                this.y -= this.vy;//未达到底部，增加雨滴y坐标
            } else {
                this.init();
            }
        }
    };

    function resize() {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
    }

    //初始化一个雨滴

    var rs = []
    for (var i = 0; i < 10; i++) {
        setTimeout(function () {
            var r = new RainDrop();
            r.init();
            rs.push(r);
        }, i * 300)
    }

    function anim() {
        ctx.clearRect(0, 0, w, h);//填充背景色，注意不要用clearRect，否则会清空前面的雨滴，导致不能产生叠加的效果
        for (var i = 0; i < rs.length; i++) {
            rs[i].draw();//绘制雨滴
        }
        requestAnimationFrame(anim);//控制动画帧
    }

    window.addEventListener("resize", resize);
    //启动动画
    anim()

}

function handlePageLoadComplete() {
    let tl = gsap.timeline()

    // 设置初始可见性
    tl.set(".svg-element", { visibility: "visible" })
    
    // 雨滴背景动画
    tl.fromTo(".rain",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" },
        1.0
    )
    
    // SVG圆环动画
    tl.fromTo("svg circle",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.5, ease: "power2.out" },
        "-=1.2"
    )
    
    // 分段圆弧动画
    tl.fromTo("svg path",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1, ease: "power2.out" },
        "-=0.8"
    )
    
    // 衍生线动画
    tl.fromTo("svg line",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1, ease: "power2.out" },
        "-=0.8"
    )
    
    // 箭头动画
    tl.fromTo("svg polygon",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.5"
    )
    
    // 标签文字动画
    tl.fromTo("svg text",
        { opacity: 0, y: "+=20" },
        { opacity: 1, y: "-=20", duration: 0.8, ease: "power2.out", stagger: 0.1 },
        "-=0.5"
    )
}

onMounted(() => {
    nextTick(() => {
        rainBg()
    })
    window.addEventListener('pageLoaded', handlePageLoadComplete)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('pageLoaded', handlePageLoadComplete)
})

import { computed } from 'vue'

// 定义圆环分段
const segments = [
    { start: 0, end: 33, color: '#409eff', rounded: true, gap: '28,2', label1: '行业专家', label2: '智库引领', offsetY: 20 },
    { start: 33, end: 67, color: '#67c23a', rounded: true, gap: '38,2', label1: '技术经理人', label2: '转化衔接', offsetX: -60 },
    { start: 67, end: 100, color: '#f56c6c', rounded: true, gap: '28,2', label1: '技能人才', label2: '支撑落地', offsetY: -30 },
]

// 计算 SVG 圆弧路径
const getArcPath = (startPercent, endPercent) => {
    const x = 250
    const y = 250
    const r = 200
    const startAngle = (startPercent / 100) * Math.PI * 2
    const endAngle = (endPercent / 100) * Math.PI * 2

    const x1 = x + r * Math.cos(startAngle)
    const y1 = y + r * Math.sin(startAngle)
    const x2 = x + r * Math.cos(endAngle)
    const y2 = y + r * Math.sin(endAngle)

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

// 计算分段中点位置
const getMidPoint = (startPercent, endPercent, extend = 0) => {
    const x = 250
    const y = 250
    const r = 200 + extend
    const midPercent = (startPercent + endPercent) / 2
    const angle = (midPercent / 100) * Math.PI * 2

    const pointX = x + r * Math.cos(angle)
    const pointY = y + r * Math.sin(angle)

    return { x: pointX, y: pointY }
}

// 计算衍生线的终点位置
const getEndPoint = (startPercent, endPercent) => {
    return getMidPoint(startPercent, endPercent, 100) // 延长100像素
}

// 计算箭头方向
const getArrowPoints = (startPercent, endPercent) => {
    const startPoint = getMidPoint(startPercent, endPercent)
    const endPoint = getEndPoint(startPercent, endPercent)
    
    // 计算箭头的两个角点
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x)
    const arrowSize = 10
    const arrowAngle = Math.PI / 6 // 30度
    
    const arrowPoint1 = {
        x: endPoint.x - arrowSize * Math.cos(angle - arrowAngle),
        y: endPoint.y - arrowSize * Math.sin(angle - arrowAngle)
    }
    
    const arrowPoint2 = {
        x: endPoint.x - arrowSize * Math.cos(angle + arrowAngle),
        y: endPoint.y - arrowSize * Math.sin(angle + arrowAngle)
    }
    
    return {
        startPoint,
        endPoint,
        arrowPoint1,
        arrowPoint2
    }
}
</script>

<template>
    <div class="funnel-container">
        <div class="left"></div>
        <!-- 销售总额 -->
        <div class="total">
            <svg width="500" height="500" viewBox="0 0 500 500">
                <g transform="rotate(0, 250, 250)">
                    <!-- 背景圆环 -->
                    <circle
                        cx="250"
                        cy="250"
                        r="200"
                        fill="none"
                        stroke="#e6e6e6"
                        stroke-width="80"
                        class="svg-element"
                    />

                    <!-- 分段圆弧 -->
                    <path
                        v-for="(segment, index) in segments"
                        :key="index"
                        :d="getArcPath(segment.start, segment.end)"
                        :stroke="segment.color"
                        :stroke-width="80"
                        :stroke-linecap="segment.rounded ? 'round' : 'butt'"
                        fill="none"
                        :style="{ strokeDasharray: segment.gap }"
                        class="svg-element"
                    />
                </g>
                
                <!-- 衍生线、箭头和标签 -->
                <template v-for="(segment, index) in segments" :key="index">
                    <g>
                        <!-- 衍生线 -->
                        <line
                            :x1="getMidPoint(segment.start, segment.end).x"
                            :y1="getMidPoint(segment.start, segment.end).y"
                            :x2="getEndPoint(segment.start, segment.end).x"
                            :y2="getEndPoint(segment.start, segment.end).y"
                            stroke="white"
                            stroke-width="2"
                            class="svg-element"
                        />
                        
                        <!-- 箭头 -->
                        <polygon
                            :points="`${getArrowPoints(segment.start, segment.end).endPoint.x},${getArrowPoints(segment.start, segment.end).endPoint.y} ${getArrowPoints(segment.start, segment.end).arrowPoint1.x},${getArrowPoints(segment.start, segment.end).arrowPoint1.y} ${getArrowPoints(segment.start, segment.end).arrowPoint2.x},${getArrowPoints(segment.start, segment.end).arrowPoint2.y}`"
                            fill="white"
                            class="svg-element"
                        />
                        
                        <!-- 标签文字 -->
                        <text
                            :x="getEndPoint(segment.start, segment.end).x + (segment.offsetX || 0)"
                            :y="getEndPoint(segment.start, segment.end).y + (segment.offsetY || 0)"
                            text-anchor="middle"
                            fill="white"
                            font-size="20"
                            class="svg-element"
                        >
                            <tspan 
                                :x="getEndPoint(segment.start, segment.end).x + (segment.offsetX || 0)"
                                dy="0"
                            >
                                {{ segment.label1 }}
                            </tspan>
                            <tspan
                                :x="getEndPoint(segment.start, segment.end).x + (segment.offsetX || 0)"
                                dy="1.2em"
                                font-weight="bold"
                            >
                                {{ segment.label2 }}
                            </tspan>
                        </text>
                    </g>
                </template>
                
                <!-- 在圆环中心添加文字 -->
                <text
                    x="250"
                    y="250"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="white"
                    font-size="32"
                    font-weight="bold"
                    class="svg-element"
                >
                    三级人才联通
                </text>
            </svg>
            <canvas class="rain"></canvas>
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
    background: url(@/assets/images/talentEngine/bj.png) no-repeat;
    background-size: 100%;
    //background-color: rgba(0, 0, 0, 0.7);
}
.funnel-container .left {
    width: 20%;
    height: 70%;
    float: left;
}
.funnel-container .total {
    width: 60%;
    height: 85%;
    top: 15%;
    float: left;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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

svg {
    overflow: visible;
}

// 处理换行文本
text {
    white-space: pre;
}

// 确保SVG元素初始隐藏
.svg-element {
    visibility: hidden;
}
</style>