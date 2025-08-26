<template>
    <div class="left-card">
        <m-card title="服务人才群众">
            <div class="serve-container">
                <div class="serve-data" v-for="(item, index) in serveData" :key="index">
                    <div class="serve-icon" v-if="item.icon"
                         :style="{ backgroundColor: item.bgColor, color: item.color }">
                        <i :class="'fas ' + item.icon"></i>
                    </div>
                    <div class="serve-name">
                        {{ item.name }}
                    </div>
                    <div>
                        <span class="serve-num">{{ item.count }}</span><span>{{ item.unit }}</span>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import mCard from "@/components/mCard/index.vue";

const serveData = ref([
    {
        icon: 'fas fa-capsules',
        name: '组织联谊活动',
        count: '2',
        unit: '次',
        bgColor: '#409EFF',
        color: '#FFFFFF'
    },
    {
        icon: 'fas fa-heartbeat',
        name: '提供法律咨询',
        count: '53',
        unit: '次',
        bgColor: '#67C23A',
        color: '#FFFFFF'
    },
    {
        icon: 'fas fa-heartbeat',
        name: '关怀困难员工',
        count: '10',
        unit: '次',
        bgColor: '#E6A23C',
        color: '#FFFFFF'
    }
]);
</script>

<style scoped lang="scss">
.serve-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.serve-data {
    width: 156px;
    height: 176px;
    background-image: url("@/assets/images/redCore/bg_data_2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    color: #ffffff;
}

.serve-icon {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.serve-num {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: bold;
    background: linear-gradient(to right, #409EFF, #67C23A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>