<template>
    <div class="left-card">
        <m-card title="服务企业发展">
            <div class="service-container">
                <div class="service-data" v-for="(item, index) in serviceData" :key="index">
                    <div class="service-top">
                        <div class="service-icon" v-if="item.icon"
                             :style="{ backgroundColor: item.bgColor, color: item.color }">
                            <i :class="'fas ' + item.icon"></i>
                        </div>
                        <div class="service-name">
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="service-bottom">
                        <div class="service-num">
                            {{ item.num }}
                        </div>
                        <div class="service-unit">
                            {{ item.unit }}
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import mCard from "@/components/mCard/index.vue";
const serviceData = ref([
    {
        name: '开展银企对接',
        num: 37,
        unit: '次',
        icon: 'fa-building',
        bgColor: 'rgba(0, 180, 42, 0.2)',
        color: 'rgb(0, 180, 42)'
    },
    {
        name: '解决企业难题',
        num: 56,
        unit: '次',
        icon: 'fa-user',
        bgColor: 'rgba(255, 125, 0, 0.2)',
        color: 'rgb(255, 125, 0)'
    },
    {
        name: '政策宣讲次数',
        num: 6,
        unit: '次',
        icon: 'fa-chart-line',
        bgColor: 'rgba(245, 63, 63, 0.2)',
        color: 'rgb(245, 63, 63)'
    },
])
</script>

<style scoped lang="scss">
.service-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.service-data {
    width: 12.5rem;
    height: 10rem;
    background-image: url("@/assets/images/redCore/bg_data_1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    /*padding: 2rem 1.5rem;*/
}

.service-top, .service-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.service-bottom {
    align-items: end;
}

.service-icon {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.service-num {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: bold;
}

.service-unit {
    font-size: 0.875rem;
    line-height: 2rem;
    font-weight: 400;
    /*color: rgb(3, 83, 176);*/
}
.main-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 22rem;
}

.nav-container {
    display: flex;
    height: calc(100% - 3rem);
    gap: 0.25rem;
}
</style>