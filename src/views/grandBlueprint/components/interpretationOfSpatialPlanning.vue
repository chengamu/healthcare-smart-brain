<script setup>
import {ref, onMounted} from "vue"
import mCard from "@/components/mCard/index.vue"
import mCountTo from "@/components/mCountTo/index.js"
import gsap from "gsap"
import ShaoXingCityData from "@/views/gdMap/map/ShaoXingCityData"

const showCards = ref([false, false, false])
const startCount = ref([false, false, false])
const cardRefs = ref([])

onMounted(() => {
    // 依次显示卡片，每张卡片间隔500ms
    setTimeout(() => {
        showCards.value[0] = true
        setTimeout(() => startCount.value[0] = true, 300)
        addCardAnimation(0)
    }, 500)

    setTimeout(() => {
        showCards.value[1] = true
        setTimeout(() => startCount.value[1] = true, 300)
        addCardAnimation(1)
    }, 1000)

    setTimeout(() => {
        showCards.value[2] = true
        setTimeout(() => startCount.value[2] = true, 300)
        addCardAnimation(2)
    }, 1500)
})

const addCardAnimation = (index) => {
  if (cardRefs.value[index]) {
    gsap.from(cardRefs.value[index], {
      scale: 0.5,
      rotation: 180,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
  }
}

const handleCardHover = (index, isHover) => {
  if (cardRefs.value[index]) {
    gsap.to(cardRefs.value[index], {
      scale: isHover ? 1.1 : 1,
      rotationY: isHover ? 10 : 0,
      z: isHover ? 50 : 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }
}

const kpiData = JSON.parse(JSON.stringify(ShaoXingCityData))

// 控制弹窗显示的状态
const showDialog = ref(false)
const selectPoint = ref(null)

function handleBarLabelClick(item) {
    // 当接收到barLabelClick事件时，可以在这里处理
    console.log('接收到点击事件，名称：', item);
    showDialog.value = true
    selectPoint.value = item
}

// 关闭弹窗
const closeDialog = () => {
    showDialog.value = false
    selectPoint.value = null
}
</script>

<template>
    <div class="left-card">
        <m-card title="空间规划解读">
            <div class="kpi-container">
                <div
                    v-for="(item, index) in kpiData"
                    :key="index"
                    :ref="el => cardRefs[index] = el"
                    class="kpi-card"
                    :class="[
                        { 'show': showCards[index] },
                        `card-${index}`
                    ]"
                    :style="{ '--card-color': item.color }"
                    @mouseenter="handleCardHover(index, true)"
                    @mouseleave="handleCardHover(index, false)"
                    @click="handleBarLabelClick(item)"
                >
                    <div class="kpi-card-inner">
                        <div class="kpi-card-back">
                            <div class="kpi-icon">{{ item.icon }}</div>
                            <div class="kpi-title">{{ item.name }}</div>
                            <div class="kpi-value">
                                <div class="value-primary">
                                    <mCountTo 
                                        v-if="startCount[index]"
                                        :startVal="0" 
                                        :endVal="item.value"
                                        :duration="2000"
                                    />
                                    <span class="unit">{{ item.unit }}</span>
                                </div>
                                <div v-if="item.value2 > 0" class="value-secondary">
                                    <mCountTo 
                                        v-if="startCount[index]"
                                        :startVal="0" 
                                        :endVal="item.value2" 
                                        :duration="2000"
                                    />
                                    <span class="unit">{{ item.unit2 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
    <Teleport to="body">
          <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
              <div class="dialog-content" @click.stop>
                  <m-card :title="selectPoint?.name" width="800" height="530">
                      <div class="select-point-container">
                          <div class="select-point-info">
                              <div class="select-point-title-intro">简&emsp;介：</div>
                              <div class="select-point-content-intro">{{ selectPoint?.intro }}</div>
                          </div>
                          <div class="select-point-info">
                              <div class="select-point-title-img">示意图：</div>
                              <div class="select-point-content-img">
                                  <img :src="selectPoint?.img" style="width: 100%; height: 100%" alt="" />
                              </div>
                          </div>
                      </div>
                  </m-card>
              </div>
          </div>
      </Teleport>
</template>

<style scoped lang="scss">
.kpi-container {
    height: 100%;
    padding: 20px;
    position: relative;
    box-sizing: border-box;
}

.kpi-card {
    width: 28%;
    height: 130px;
    perspective: 1000px;
    opacity: 0;
    position: absolute;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 10;
    cursor: pointer;
    transform-style: preserve-3d;

    &.show {
        opacity: 1;
    }

    &.card-0 { // 生命谷 - 左下
        left: 5%;
        bottom: 25%;
        background-image: url("@/assets/images/grandBlueprint/yuan1-01.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    &.card-1 { // 东盛慧谷 - 居中顶部
        left: 36%;
        bottom: 10%;
        background-image: url("@/assets/images/grandBlueprint/yuan2-01.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    &.card-2 { // 健康岛 - 右下
        right: 5%;
        top: 10%;
        background-image: url("@/assets/images/grandBlueprint/yuan3-01.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}

.kpi-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    transform: rotateY(0deg);

    .kpi-card.show & {
        transform: rotateY(180deg);
    }
}

.kpi-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: rotateY(180deg);
    position: relative;
    overflow: hidden;
}

.kpi-icon {
    font-size: 24px;
    margin-bottom: 8px;
    animation: iconBounce 3s ease-in-out infinite;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.kpi-title {
    font-size: 18px;
    font-weight: bold;
    color: #30DCFF;
    margin-bottom: 12px;
    text-align: center;
    text-shadow: 0 0 10px rgba(48, 220, 255, 0.8);
    position: relative;
    z-index: 10;
}

.kpi-value {
    text-align: center;
    position: relative;
    z-index: 10;
}

.value-primary {
    font-size: 22px;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 12px rgba(48, 220, 255, 0.8);
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    :deep(.count-to-wrapper) {
        background: linear-gradient(to bottom, #fff, #a0eaff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        font-size: 22px;
    }
}

.value-secondary {
    font-size: 14px;
    color: var(--card-color);
    font-weight: bold;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    
    :deep(.count-to-wrapper) {
        font-size: 14px;
        color: var(--card-color);
    }
}

.unit {
    font-size: 14px;
    color: #30DCFF;
    margin-left: 4px;
    font-weight: bold;
}

// 动画定义
@keyframes iconBounce {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-5px) scale(1.1);
    }
}

// 添加浮动动画
@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}

.kpi-card {
    &.show {
        animation: float 4s ease-in-out infinite;
    }
    
    &.card-1.show {
        animation-delay: 0.5s;
    }
    
    &.card-2.show {
        animation-delay: 1s;
    }
}

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog-content {
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
    max-height: 80%;
    overflow: hidden;
}
.select-point-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    .select-point-info {
        display: flex;
        .select-point-title-intro, .select-point-title-img {
            flex-shrink: 0;
            color: #fff;
            font-size: 16px;
            line-height: 20px;
            font-family: "PingFangSc";
            font-weight: 600;
            background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .select-point-content-intro {
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
        }
        .select-point-content-img {
            flex-grow: 1;
        }
    }
}
</style>