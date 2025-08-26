<script setup>
import {ref, onMounted} from "vue"
import mCard from "@/components/mCard/index.vue"

const showCards = ref([false, false, false])

onMounted(() => {
    // 依次显示卡片，每张卡片间隔500ms
    setTimeout(() => {
        showCards.value[0] = true
    }, 500)

    setTimeout(() => {
        showCards.value[1] = true
    }, 1000)

    setTimeout(() => {
        showCards.value[2] = true
    }, 1500)
})

const kpiData = [
    {name: '生命谷', value1: '1200亩', value2: ''},
    {name: '东盛慧谷', value1: '150亩', value2: '28万方'},
    {name: '健康岛', value1: '1100亩', value2: ''}
]
</script>

<template>
    <div class="left-card">
        <m-card title="空间规划解读">
            <div class="kpi-container">
                <div
                    v-for="(item, index) in kpiData"
                    :key="index"
                    class="kpi-card"
                    :class="[
                        { 'show': showCards[index] },
                        `card-${index}`
                    ]"
                >
                    <div class="kpi-card-inner">
                        <div class="kpi-card-back">
                            <div class="kpi-title">{{ item.name }}</div>
                            <div class="kpi-value">
                                <div>{{ item.value1 }}</div>
                                <div v-if="item.value2" class="kpi-value2">{{ item.value2 }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
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
    height: 120px;
    perspective: 1000px;
    opacity: 0;
    position: absolute;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);

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
    //box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.kpi-card-back {
    //background: linear-gradient(135deg, rgba(26, 57, 77, 0.9), rgba(48, 220, 255, 0.15));
    //border: 1px solid rgba(48, 220, 255, 0.7);
    transform: rotateY(180deg);
    //box-shadow: 0 0 30px rgba(48, 220, 255, 0.6);
}

.kpi-title {
    font-size: 18px;
    font-weight: bold;
    color: #30DCFF;
    margin-bottom: 10px;
    text-align: center;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.6);
}

.kpi-value {
    font-size: 22px;
    font-weight: bold;
    color: white;
    text-align: center;
    text-shadow: 0 0 12px rgba(48, 220, 255, 0.8);
    
    span {
        &:first-child {
            font-size: 24px;
            background: linear-gradient(to bottom, #fff, #a0eaff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
}

.kpi-value2 {
    font-size: 16px;
    color: #30DCFF;
    margin-left: 5px;
    font-weight: bold;
}

// 添加动画效果
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
        animation: float 3s ease-in-out infinite;
    }
    
    &.card-1.show {
        animation-delay: 0.2s;
    }
    
    &.card-2.show {
        animation-delay: 0.4s;
    }
}
</style>