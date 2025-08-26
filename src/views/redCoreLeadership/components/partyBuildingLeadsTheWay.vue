<template>
    <div class="right-card">
        <m-card title="党的动态">
            <div class="activities-list" v-auto-scroll>
                <div 
                    v-for="(item, index) in activitiesData" 
                    :key="index" 
                    class="activity-item"
                >
                    <div class="activity-party">{{ item.party }}</div>
                    <div class="activity-content">
                        <div class="activity-activity">{{ item.activity }}</div>
                        <div class="activity-time">{{ item.time }}</div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import mCard from "@/components/mCard/index.vue"

const activitiesData = ref([
    { party: '绍兴医疗健康产业社区功能性联合党委', activity: '牵头建立健康产业党建联盟共建', time: '2025.01.04' },
    { party: '科技型企业党总支', activity: '推广智慧健康平台', time: '2025.02.04' },
    { party: '服务性机构党支部', activity: '组织健康讲座与科普宣传', time: '2025.03.04' },
    { party: '社区管理党支部', activity: '组织医患沟通座谈会', time: '2025.04.04' },
    { party: '新兴领域流动党员党支部', activity: '组建党员健康志愿服务队', time: '2025.05.04' },
])
</script>

<style scoped lang="scss">
.activities-list {
    height: 100%;
    padding: 20px;
    color: white;
    box-sizing: border-box;
    overflow-y: auto;
}

.activity-item {
    padding: 15px;
    margin-bottom: 15px;
    background: linear-gradient(135deg, rgba(26, 57, 77, 0.7), rgba(48, 220, 255, 0.1));
    border-radius: 8px;
    border: 1px solid rgba(48, 220, 255, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(48, 220, 255, 0.4);
        border-color: rgba(48, 220, 255, 0.6);
    }

    &:last-child {
        margin-bottom: 0;
    }
}

.activity-party {
    font-size: 16px;
    font-weight: bold;
    color: #30DCFF;
    margin-bottom: 8px;
    text-shadow: 0 0 4px rgba(48, 220, 255, 0.6);
}

.activity-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.activity-activity {
    font-size: 14px;
    color: #fff;
    flex: 1;
    margin-right: 10px;
}

.activity-time {
    font-size: 12px;
    color: #30DCFF;
    white-space: nowrap;
}
</style>