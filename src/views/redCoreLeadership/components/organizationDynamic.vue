<template>
    <div class="left-card">
        <m-card title="组织动态">
            <div class="dynamic-container">
                <div v-if="dynamicData && dynamicData.length > 0" class="dynamic-list" v-auto-scroll>
                    <div 
                        v-for="(item, index) in dynamicData" 
                        :key="index" 
                        class="dynamic-item"
                    >
                        <div class="content">{{ item.content }}</div>
                        <div class="progress">{{ item.progress }}</div>
                    </div>
                </div>
                <div v-else class="no-data">暂无数据</div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import mCard from "@/components/mCard/index.vue";
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const {
    configValue: zzdt,
    getConfigKeyFunc: fetchZzdt
} = useGetConfigKey('brain.redCoreLeadership.zzdt')

const dynamicData = ref([])

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchZzdt(),
    ])

    try {
        const parsedData = JSON.parse(zzdt.value)
        dynamicData.value = parsedData || []
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        dynamicData.value = [
            {
                content: '新设中共绍兴市金柯（绍兴）生物医药创新中心有限公司支部委员会，由刘颖同志担任支部书记',
                progress: '10.18通过审议'
            },
        ]
    }
}
</script>

<style scoped lang="scss">
.dynamic-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    box-sizing: border-box;
}

.dynamic-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y: auto;
}

.dynamic-item {
    display: flex;
    flex-direction: column;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border-left: 4px solid #409EFF;
    
    .content {
        font-size: 14px;
        color: #ffffff;
        margin-bottom: 8px;
        line-height: 1.4;
    }
    
    .progress {
        font-size: 12px;
        color: #909399;
        text-align: right;
    }
}

.no-data {
    color: #909399;
    font-size: 14px;
    text-align: center;
    width: 100%;
}
</style>