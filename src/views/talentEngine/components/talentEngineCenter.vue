<template>
    <div class="future-3d-container" ref="containerRef">
        <div class="header-zone" ref="titleRef">
            <h1 class="main-title">{{ title }}</h1>
            <div class="title-underline"></div>
        </div>

        <div class="team-zone" ref="teamRef">
            <div
                v-for="(team, index) in teamData"
                :key="`team-${index}`"
                class="team-card"
                :class="`team-${index}`"
            >
                <div class="team-content">
                    <div class="team-header">
                        <h2 class="team-title">{{ team.title }}</h2>
                    </div>
                    <div class="member-list">
                        <div v-for="(m, mi) in team.member" :key="mi" class="member-item">
                            <div class="name">{{ m.name }}</div>
                            <div class="identity">{{ m.identity }}</div>
                        </div>
                    </div>
                    <div class="function-box">
                        <div class="function-title">职&emsp;&emsp;&emsp;能</div>
                        <p class="function-text">{{ team.function }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="boost-zone" ref="boostRef">
            <div
                v-for="(boost, bIndex) in boostData"
                :key="`boost-${bIndex}`"
                class="boost-card"
            >
                <div class="boost-inner">
                    <div class="boost-header">
                        <span class="boost-name">{{ boost.name }}</span>
                    </div>
                    <div class="boost-resource">{{ boost.resource }}</div>
                    <div class="boost-footer">
                        <span class="assistant">对接人：{{ boost.assistant }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
import * as THREE from 'three'
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import gsap from 'gsap'

const emit = defineEmits(['animationComplete'])

const containerRef = ref(null)
const titleRef = ref(null)
const teamRef = ref(null)
const boostRef = ref(null)

let scene, camera, renderer, controls
let teamObjects = []
let boostObjects = []
let isAnimationStarted = false

const title = ref('银发经济助跑团')

// 目标数据
const teamData = ref([{
    title: '智囊团',
    member: [{
        name: '濮如松', identity: '柯桥区人大常委会原副主任',
    }, {
        name: '平水龙', identity: '柯桥区人大常委会原副主任',
    }, {
        name: '郑雪奎', identity: '绍兴市越城区经信局原局长',
    }, {
        name: '沈葵揆', identity: '东盛实业集团董事、曾在多家银行任职高管',
    }],
    function: '开展银发经济专题调研，形成《适老化改造白皮书》等智库成果；参与政府政策制定，提供产业发展建议；举办“银发经济论坛”，促进经验交流',
}, {
    title: '专家团',
    member: [{
        name: '宋国新', identity: '绍兴市公安局原副局长',
    }, {
        name: '叶利洪', identity: '绍兴市中心医院原党委书记兼副院长',
    }, {
        name: '何敏尔', identity: '绍兴第二人民医院肾内科原主任',
    }, {
        name: '徐家法', identity: '绍兴中心医院普外科原主任',
    }],
    function: '开展适老化产品研发指导（如智能辅具设计）；组织养老护理、健康管理等专业技术培训；建立“银发专利池”，促进技术成果转化',
}, {
    title: '服务团',
    member: [{
        name: '倪爱凤', identity: '柯桥区安昌街道原副主任',
    }, {
        name: '金家良', identity: '柯桥区安昌街道原副主任',
    }],
    function: '开展健康养老指导；组织园区银发消费促进活动；运营“时间银行”互助养老平台',
}])

const boostData = ref([{
    name: '绍兴柯北医院', resource: '绍兴市中心医院医联体成员单位床位200余张', assistant: '叶利洪'
}, {
    name: '绍兴明州康复医院', resource: '床位300余张', assistant: '郑雪奎'
}, {
    name: '浙江灵玑生物科技有限公司', resource: '获投资1000万元', assistant: '宋国新'
}, {
    name: '绍兴百立康医疗科技有限公司', resource: '获投资500万元', assistant: '宋国新'
}, {
    name: '浙江文达医药科技有限公司', resource: '获投资8000万元', assistant: '郑雪奎'
}, {
    name: '浙江金柯生物医药有限公司', resource: '获投资1000万元', assistant: '沈葵揆'
}, {
    name: '浙江鑫康合生物医药科技有限公司', resource: '获投资5000万元', assistant: '何敏尔'
}, {
    name: '浙江迈亚塔菌检智能科技有限公司', resource: '获投资2000万元', assistant: '徐家法'
}])

function handlePageLoadComplete() {
    nextTick(() => {
        if (!isAnimationStarted) {
            init3D()
            isAnimationStarted = true
        }
    })
}

// 初始化 3D 环境
const init3D = () => {
    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
    camera.position.set(0, 0, 1000)

    renderer = new CSS3DRenderer()
    renderer.setSize(width, height)
    containerRef.value.appendChild(renderer.domElement)

    controls = new TrackballControls(camera, renderer.domElement)
    controls.noPan = true

    // 创建 3D 对象
    create3DObjects()
    // 启动入场动画
    runIntroAnimation()
    animate()
}

const create3DObjects = () => {
    // 处理团队卡片
    const teamEls = teamRef.value.querySelectorAll('.team-card')
    teamEls.forEach(el => {
        const obj = new CSS3DObject(el)
        obj.position.set(0, 0, -1000) // 初始在深处
        scene.add(obj)
        teamObjects.push(obj)
    })

    // 处理助力企业卡片
    const boostEls = boostRef.value.querySelectorAll('.boost-card')
    boostEls.forEach(el => {
        const obj = new CSS3DObject(el)
        obj.position.set(0, -500, -1000) // 初始在下方
        scene.add(obj)
        boostObjects.push(obj)
    })
}

const runIntroAnimation = () => {
    const tl = gsap.timeline()
    const containerHeight = containerRef.value.clientHeight

    // 1. 顶部标题落下
    tl.fromTo(titleRef.value,
        {y: -100, opacity: 0},
        {y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)"}
    )

    // 2. 中部团队卡片居中展开
    const teamY = (containerHeight / 2) - 252
    teamObjects.forEach((obj, i) => {
        // 计算居中位置，三个卡片宽度为300，间隔为20px
        const totalCards = teamObjects.length;
        const cardWidth = 300;
        const spacing = 20;
        const totalWidth = totalCards * cardWidth + (totalCards - 1) * spacing;
        const startX = -totalWidth / 2 + (i * (cardWidth + spacing)) + cardWidth / 2; // 每个卡片的中心位置

        tl.to(obj.position, {
            x: startX,
            y: teamY, // 使用计算后的 Y
            z: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.7")
        gsap.to(obj.element, {opacity: 1, duration: 0.5})
    })

    // 3. 底部助力卡片分为两行，每行4个
    const baseBoostY = teamY - 300
    boostObjects.forEach((obj, i) => {
        // 计算行列位置，每行4个卡片
        const cardsPerRow = 4;
        const cardWidth = 220;
        const cardHeight = 150;
        const spacingX = 20;
        const spacingY = 20;

        const row = Math.floor(i / cardsPerRow); // 0或1，表示第几行
        const col = i % cardsPerRow; // 0-3，表示第几个

        // 计算每行的居中位置
        const totalWidth = cardsPerRow * cardWidth + (cardsPerRow - 1) * spacingX;
        const startX = -totalWidth / 2 + col * (cardWidth + spacingX) + cardWidth / 2;
        const startY = baseBoostY - row * (cardHeight + spacingY); // 第一行在上面，第二行在下面

        tl.to(obj.position, {
            x: startX,
            y: startY, // 使用计算后的 Y
            z: -100,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
                // 当最后一个元素动画完成时，发送animationComplete事件
                if (i === boostObjects.length - 1) {
                    emit('animationComplete')
                }
            }
        }, "-=0.6")
        gsap.to(obj.element, {opacity: 1, duration: 0.5})
    })
}

const animate = () => {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

onMounted(() => {
    window.addEventListener('resize', onWindowResize)
})

const onWindowResize = () => {
    camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
}

onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize)
})

// 暴露方法给父组件调用
defineExpose({
    handlePageLoadComplete
})
</script>

<style scoped lang="scss">
.future-3d-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

/* 顶部标题区 */
.header-zone {
    position: absolute;
    top: 0;
    height: 42px;
    width: 100%;
    z-index: 10;
    text-align: center;
    opacity: 0;

    .main-title {
        color: #fff;
        font-size: 32px;
        line-height: 40px;
        margin: 0;
        text-shadow: 0 0 15px rgba(0, 243, 255, 0.6);
        background: linear-gradient(to bottom, #fff, #40a9ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .title-underline {
        width: 400px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00f3ff, transparent);
        margin: 0 auto;
    }
}

/* 中部团队卡片 */
.team-zone {
    position: absolute;
    top: 42px;
    height: 300px;
    width: 100%;
    pointer-events: none;
}

.team-card {
    width: 300px;
    height: 400px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    color: #fff;
    opacity: 0;
    pointer-events: auto;

    &.team-0 {
        border-left: 5px solid #1890ff;
    }

    &.team-1 {
        border-left: 5px solid #52c41a;
    }

    &.team-2 {
        border-left: 5px solid #fa8c16;
    }

    .team-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;

        .team-header {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #240b06;
            margin-bottom: 4px;

            .team-title {
                font-size: 20px;
                color: #00f3ff;
            }
        }

        .member-item {
            text-align: center;

            .name {
                font-weight: bold;
                margin-right: 8px;
                color: #00f3ff;
                font-size: 18px;
            }

            .identity {
                font-size: 12px;
                color: #fff;
                margin: 4px 0
            }
        }

        .function-box {
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .function-title {
                text-align: center;
                width: 160px;
                background: #240b06;
                border-radius: 20px;
                font-size: 14px;
                line-height: 16px;
            }

            .function-text {
                padding: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 4px;
                font-size: 13px;
                line-height: 1.5;
            }
        }
    }
}


/* 底部助力卡片 */
.boost-zone {
    position: absolute;
    top: 342px;
    bottom: 0;
    width: 100%;
    pointer-events: none;
}

.boost-card {
    width: 220px;
    padding: 8px;
    box-sizing: border-box;
    background: rgba(0, 243, 255, 0.05);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 10px;
    color: #fff;
    opacity: 0;
    pointer-events: auto;

    .boost-name {
        display: block;
        font-weight: bold;
        margin-top: 8px;
        font-size: 18px;
        line-height: 22px;
        height: 44px;
        color: #00f3ff;
    }

    .boost-resource {
        font-size: 16px;
        color: #ffffff;
        margin: 10px 0;
        height: 36px;
    }

    .boost-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 8px;
        font-size: 12px;
        color: #00f3ff;
    }
}
</style>