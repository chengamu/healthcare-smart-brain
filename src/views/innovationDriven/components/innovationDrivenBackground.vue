<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const emit = defineEmits(['animationComplete']);

function rainBg() {
    var c = document.querySelector(".rain");
    if (!c) {
        console.error('未找到 .rain 元素');
        return;
    }
    
    var ctx = c.getContext("2d");//获取canvas上下文
    var container = document.querySelector('.background-container');
    if (!container) {
        console.error('未找到 .background-container 元素');
        return;
    }
    
    var w = c.width = container.clientWidth || window.innerWidth;
    var h = c.height = container.clientHeight || window.innerHeight;
    //设置canvas宽、高
    
    console.log('雨滴背景初始化，尺寸:', w, 'x', h);

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
                linearGradient.addColorStop(0, '#30DCFF') // 使用项目主色调
                // 设置终止颜色
                linearGradient.addColorStop(1, '#001122') // 深蓝色背景
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

    //初始化雨滴
    var rs = []
    for (var i = 0; i < 15; i++) { // 增加雨滴数量
        setTimeout(function () {
            var r = new RainDrop();
            r.init();
            rs.push(r);
        }, i * 200) // 减少延迟
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
    console.log('雨滴动画已启动');
}

let animationTimeline = null;

function handlePageLoadComplete() {
    // 页面加载完成后启动动画
    console.log('背景组件收到页面加载完成事件');
    nextTick(() => {
        initAnimations();
    });
}

function initAnimations() {
    // 创建时间线
    animationTimeline = gsap.timeline();

    // 设置初始状态 - 所有元素透明
    animationTimeline.set('.rain', {
        opacity: 0
    });

    // 背景雨滴动画
    animationTimeline.to('.rain', {
        opacity: 0.6, // 提高透明度使雨滴更可见
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            // 动画完成后向父组件发送事件
            emit('animationComplete');
        }
    });
}

onMounted(() => {
    nextTick(() => {
        rainBg()
    })
})

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
    // 移除背景图片，使用透明背景让3D结构成为视觉焦点
    background: transparent;
}

.background-container .rain {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0.8; // 提高透明度使雨滴效果更明显
}
</style>