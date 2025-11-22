<template>
    <div class="right-card">
        <m-card title="配套公寓">
            <div class="apartment-container" v-auto-scroll>
                <div class="apartment-list">
                    <div v-for="(apartment, index) in apartmentData" :key="index"
                         class="apartment-item">
                        <div class="item-header">
                            <span class="item-name">{{ apartment.type }}</span>
                            <span class="item-value">{{ apartment.usage }}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" 
                                 :style="{ 
                                   width: apartment.usage + '%',
                                   backgroundColor: apartment.color
                                 }"></div>
                        </div>
                        <div class="item-details">
                            <span>已入住: {{ apartment.occupied }}套</span>
                            <span>总数: {{ apartment.total }}套</span>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import {
    useGetConfigKey
} from '@/hooks/useGetConfigKey'

/**
 * 参数获取
 */
const {
    configValue: rcgysyl,
    getConfigKeyFunc: fetchRcgysyl
} = useGetConfigKey('brain.livableEcosystem.rcgysyl') // 智慧大脑-产城生态-人才公寓使用率

const apartmentData = ref([
    // {
    //     type: '高层公寓',
    //     usage: 87.5,
    //     occupied: 175,
    //     total: 200,
    //     color: '#30DCFF'
    // },
    // {
    //     type: '多层公寓',
    //     usage: 92.3,
    //     occupied: 120,
    //     total: 130,
    //     color: '#00FF88'
    // },
    // {
    //     type: '别墅区',
    //     usage: 68.0,
    //     occupied: 34,
    //     total: 50,
    //     color: '#8B5CF6'
    // },
    // {
    //     type: '青年公寓',
    //     usage: 95.2,
    //     occupied: 238,
    //     total: 250,
    //     color: '#FF6B6B'
    // }
])

onMounted(() => {
    init()
});

async function init(str) {
    // 获取需要的参数
    await Promise.all([
        fetchRcgysyl(),
    ])
    apartmentData.value = JSON.parse(rcgysyl.value)
}
</script>

<style scoped lang="scss">
.apartment-container {
    padding: 20px;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}

.apartment-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.apartment-item {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 12px 16px;
    border: 1px solid rgba(48, 220, 255, 0.3);
    height: calc(50% - 10px);
    
    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        
        .item-name {
            font-size: 16px;
            color: #ffffff;
            font-weight: 600;
        }
        
        .item-value {
            font-size: 18px;
            color: #30DCFF;
            font-weight: bold;
        }
    }
    
    .progress-bar {
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
        
        .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 1s ease;
        }
    }
    
    .item-details {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
    }
}
</style>