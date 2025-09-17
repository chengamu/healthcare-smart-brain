<script setup>
import {onMounted, ref} from "vue"
import mCard from "@/components/mCard/index.vue"
import {listEnterpriseAll, listTechnologyAll} from "@/api/brain.js";
import {listDictData} from "@/api/system.js";

const emit = defineEmits(['update:technologyData'])

const technologyList = ref([])
const enterpriseList = ref([])
const dictList = ref([{
    name: 'brain_technology_label', data: []
}, {
    name: 'brain_technology_deadline', data: []
}])

onMounted(() => {
    init()
})

async function init() {
    await getListEnterpriseAll()
    await getListDictData('brain_technology_label', 0)
    await getListDictData('brain_technology_deadline', 1)
    await getListTechnologyAll()
}

const getListDictData = async (dictName, index) => {
    try {
        const response = await listDictData(dictName)
        let data = response.data.map((item, index) => {
            return {
                label: item.dictLabel,
                value: item.dictValue
            }
        });
        dictList.value[index].data = data
    } catch (error) {
        console.error('获取企业类别数据失败:', error)
    }
};

async function getListEnterpriseAll() {
    try {
        const response = await listEnterpriseAll()
        enterpriseList.value = response
    } catch (error) {
        console.error('获取企业列表数据失败:', error)
    }
}

async function getListTechnologyAll() {
    try {
        const response = await listTechnologyAll()
        technologyList.value = response.map(item => {
            return {
                ...item,
                labelName: dictList.value[0].data.find(label => label.value === item.label)?.label,
                deadlineName: dictList.value[1].data.find(deadline => deadline.value === item.deadline)?.label,
                enterpriseName: enterpriseList.value.find(enterprise => enterprise.id === item.enterpriseId)?.name,
            }
        })
        emit('update:technologyData', response.length)
    } catch (error) {
        console.error('获取技术数据失败:', error)
    }
}

// 控制弹窗显示的状态
const showDialog = ref(false)
const selectedTechnology = ref(null)

// 处理点击事件，显示弹窗
const handleItemClick = (item) => {
    selectedTechnology.value = item
    showDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
    showDialog.value = false
    selectedTechnology.value = null
}

// 获取状态样式
const getStatusStyle = (deadline) => {
    if (!deadline) return 'status-unknown'
    if (deadline.includes('长期')) return 'status-long-term'
    if (deadline.includes('短期')) return 'status-short-term'
    return 'status-medium-term'
}

// 获取状态文本
const getStatusText = (deadline) => {
    if (!deadline) return '未知'
    if (deadline.includes('长期')) return '长期'
    if (deadline.includes('短期')) return '短期'
    return '中期'
}
</script>

<template>
    <div class="left-card">
        <m-card title="技术合作">
            <div class="technology-cooperation-container">
                <!-- 技术列表 -->
                <div class="technology-grid" v-auto-scroll>
                    <div 
                        v-for="(item, index) in technologyList" 
                        :key="`${item.id}-${index}`"
                        class="technology-card"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                        @click="handleItemClick(item)"
                    >
                        
                        <div class="card-header">
                            <div class="card-icon">
                                <div class="icon-circle">
                                    <span class="icon-text">🔬</span>
                                </div>
                                <div class="card-title">{{ item.title }}</div>
                            </div>
                            <div :class="['card-status', getStatusStyle(item.deadlineName)]">
                                {{ getStatusText(item.deadlineName) }}
                            </div>
                        </div>
                        
                        <div class="card-content">
                            
                            <div class="card-meta">
                                <div class="meta-item" v-if="item.enterpriseName">
                                    <span class="meta-icon">🏢</span>
                                    <span class="meta-text">{{ item.enterpriseName }}</span>
                                </div>
                                <div class="meta-item" v-if="item.labelName">
                                    <span class="meta-icon">🏷️</span>
                                    <span class="meta-text">{{ item.labelName }}</span>
                                </div>
                            </div>
                            
                            <div class="card-description" v-if="item.description">
                                {{ item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description }}
                            </div>
                        </div>
                        
                        <div class="card-footer">
                            <div class="card-time" v-if="item.deadlineName">
                                {{ item.deadlineName }}
                            </div>
                            <div class="card-action">
                                <span class="action-text">查看详情</span>
                                <span class="action-arrow">→</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>

    <!-- 详情弹窗 -->
    <Teleport to="body">
        <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog-content" @click.stop>
                <m-card :title="selectedTechnology?.title" width="800" height="650">
                    <div class="technology-detail">
                        <div class="detail-section">
                            <h4>基本信息</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>技术名称：</label>
                                    <span>{{ selectedTechnology?.title }}</span>
                                </div>
                                <div class="detail-item">
                                    <label>技术标签：</label>
                                    <span>{{ selectedTechnology?.labelName || '-' }}</span>
                                </div>
                                <div class="detail-item">
                                    <label>发布单位：</label>
                                    <span>{{ selectedTechnology?.enterpriseName || '-' }}</span>
                                </div>
                                <div class="detail-item">
                                    <label>有效期限：</label>
                                    <span>{{ selectedTechnology?.deadlineName || '-' }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section" v-if="selectedTechnology?.description">
                            <h4>技术描述</h4>
                            <div class="detail-description">
                                {{ selectedTechnology?.description }}
                            </div>
                        </div>
                        
                        <div class="detail-section" v-if="selectedTechnology?.customLabel">
                            <h4>自定义标签</h4>
                            <div class="detail-tags">
                                {{ selectedTechnology?.customLabel }}
                            </div>
                        </div>
                    </div>
                </m-card>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.technology-cooperation-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(48, 220, 255, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.03) 0%, transparent 50%);
        box-sizing: border-box;
}

.technology-grid {
    height: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    padding: 5px;
}

.technology-card {
    position: relative;
    background: linear-gradient(135deg, 
        rgba(48, 220, 255, 0.08) 0%, 
        rgba(0, 255, 136, 0.06) 50%, 
        rgba(139, 92, 246, 0.04) 100%);
    border: 1px solid rgba(48, 220, 255, 0.2);
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    opacity: 0;
    transform: translateY(20px);
    animation: cardSlideIn 0.6s ease-out forwards;
    // overflow: hidden;
}

.technology-card:hover {
    transform: translateY(-4px);
    border-color: #30DCFF;
    box-shadow: 0 8px 25px rgba(48, 220, 255, 0.3);
    background: linear-gradient(135deg, 
        rgba(48, 220, 255, 0.12) 0%, 
        rgba(0, 255, 136, 0.08) 50%, 
        rgba(139, 92, 246, 0.06) 100%);
}

.technology-card:hover .action-arrow {
    transform: translateX(4px);
}

@keyframes cardSlideIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes borderRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.card-icon {
    display: flex;
    align-items: center;
}

.icon-circle {
    width: 32px;
    height: 32px;
    background: radial-gradient(circle, rgba(48, 220, 255, 0.2), rgba(48, 220, 255, 0.05));
    border: 2px solid rgba(48, 220, 255, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: iconPulse 3s ease-in-out infinite;
}

.icon-text {
    font-size: 16px;
    filter: brightness(1.2);
}

@keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.card-status {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
}

.status-long-term {
    background: rgba(0, 255, 136, 0.2);
    color: #00FF88;
    border: 1px solid rgba(0, 255, 136, 0.4);
}

.status-short-term {
    background: rgba(255, 193, 7, 0.2);
    color: #FFD700;
    border: 1px solid rgba(255, 193, 7, 0.4);
}

.status-medium-term {
    background: rgba(139, 92, 246, 0.2);
    color: #8B5CF6;
    border: 1px solid rgba(139, 92, 246, 0.4);
}

.status-unknown {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-content {
    margin-bottom: 12px;
}

.card-title {
    font-size: 16px;
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 8px rgba(48, 220, 255, 0.4);
    margin-left: 8px;
    line-height: 1.3;
}

.card-meta {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
}

.meta-icon {
    font-size: 10px;
}

.meta-text {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-description {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.4;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid rgba(48, 220, 255, 0.1);
}

.card-time {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
}

.card-action {
    display: flex;
    align-items: center;
    gap: 4px;
}

.action-text {
    font-size: 11px;
    color: #00FF88;
    font-weight: bold;
}

.action-arrow {
    color: #00FF88;
    font-size: 12px;
    transition: transform 0.3s ease;
}

/* 弹窗样式 */
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.dialog-content {
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
}

.technology-detail {
    padding: 20px;
    color: #ffffff;
}

.detail-section {
    margin-bottom: 20px;

    h4 {
        color: #30DCFF;
        margin-bottom: 10px;
        font-size: 16px;
        text-shadow: 0 0 8px rgba(48, 220, 255, 0.4);
    }
}

.detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
}

.detail-item {
    display: flex;
    
    label {
        min-width: 80px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
    }

    span {
        color: #ffffff;
        font-size: 14px;
    }
}

.detail-description {
    background: rgba(48, 220, 255, 0.1);
    padding: 15px;
    border-radius: 6px;
    line-height: 1.6;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
}

.detail-tags {
    background: rgba(0, 255, 136, 0.1);
    padding: 10px;
    border-radius: 6px;
    font-size: 14px;
    color: #00FF88;
}
</style>