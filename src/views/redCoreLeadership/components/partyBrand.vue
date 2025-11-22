<template>
    <div class="left-card">
        <m-card title="党建品牌">
            <div class="brand-container">
                <div class="brand-content" v-if="brandData">
                    <p v-html="formattedBrandData"></p>
                </div>
                <div class="brand-placeholder" v-else>
                    暂无数据
                </div>
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import mCard from "@/components/mCard/index.vue";
import { useGetConfigKey } from '@/hooks/useGetConfigKey'

const {
    configValue: djpp,
    getConfigKeyFunc: fetchDjpp
} = useGetConfigKey('brain.redCoreLeadership.djpp')

const brandData = ref('')

onMounted(() => {
    init()
})

async function init() {
    // 获取需要的参数
    await Promise.all([
        fetchDjpp(),
    ])

    try {
        brandData.value = djpp.value || ''
    } catch (e) {
        console.error('数据解析失败:', e)
        // 保留原始默认数据作为后备
        brandData.value = '“党建红引领科技蓝”品牌成功入选全国党建研究会非公专委会会刊《非公有制企业党建》“年度百佳园区党建品牌案例”榜单。'
    }
}

// 格式化品牌数据，为重点内容添加颜色标注
const formattedBrandData = computed(() => {
    if (!brandData.value) return ''
    
    // 替换重点内容为带颜色的HTML标签
    let formatted = brandData.value
    
    // 为品牌名称添加红色标注
    formatted = formatted.replace(/“党建红引领科技蓝”/g, '<span class="highlight-brand">“党建红引领科技蓝”</span>')
    
    // 为重要成就添加绿色标注
    formatted = formatted.replace(/成功入选/g, '<span class="highlight-success">成功入选</span>')
    
    // 为权威机构添加蓝色标注
    formatted = formatted.replace(/《非公有制企业党建》/g, 
        '<span class="highlight-authority">《非公有制企业党建》</span>')
    
    // 为荣誉添加金色标注
    formatted = formatted.replace(/“年度百佳园区党建品牌案例”/g, 
        '<span class="highlight-honor">“年度百佳园区党建品牌案例”</span>')
    
    return formatted
})
</script>

<style scoped lang="scss">
.brand-container {
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

.brand-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    p {
        font-size: 18px;
        line-height: 1.6;
        text-align: center;
        color: #ffffff;
        margin: 0;
        padding: 20px;
    }
}

// 使用深度选择器确保样式能应用到v-html动态插入的内容
.brand-content ::v-deep(.highlight-brand) {
    color: #ff4d4f; // 红色
    font-weight: bold;
    text-shadow: 0 0 8px rgba(255, 77, 79, 0.6);
}

.brand-content ::v-deep(.highlight-success) {
    color: #52c41a; // 绿色
    font-weight: bold;
    text-shadow: 0 0 8px rgba(82, 196, 26, 0.6);
}

.brand-content ::v-deep(.highlight-authority) {
    color: #1890ff; // 蓝色
    font-weight: bold;
    text-shadow: 0 0 8px rgba(24, 144, 255, 0.6);
}

.brand-content ::v-deep(.highlight-honor) {
    color: #faad14; // 金色
    font-weight: bold;
    text-shadow: 0 0 8px rgba(250, 173, 20, 0.6);
}

.brand-placeholder {
    font-size: 16px;
    color: #999;
    text-align: center;
}
</style>