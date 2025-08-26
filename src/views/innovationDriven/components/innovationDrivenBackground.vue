<script setup>
import { nextTick, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

function rainBg() {
    var c = document.querySelector(".rain");
    var ctx = c.getContext("2d");//获取canvas上下文
    var w = c.width = document.querySelector('.background-container').clientWidth;
    var h = c.height = document.querySelector('.background-container').clientHeight;
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
    animationTimeline.set('.rain', {
        opacity: 0
    });

    // 背景星星动画
    animationTimeline.to('.rain', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });
}

onMounted(() => {
    nextTick(() => {
        rainBg()
    })
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
    background: url(@/assets/images/funnel/53bg.png) no-repeat;
    background-size: 100%;
    //background-color: rgba(0, 0, 0, 0.7);
}

.background-container .rain {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
}
</style>