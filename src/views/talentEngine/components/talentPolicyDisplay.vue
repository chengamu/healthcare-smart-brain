<template>
    <div class="right-card">
        <m-card title="人才落地政策">
            <div class="policy-container">
                <!-- 政策列表 -->
                <div class="policy-list" v-auto-scroll>
                    <div 
                        v-for="(policy, index) in policyList" 
                        :key="index"
                        class="policy-card"
                        :style="{ 
                            animationDelay: `${index * 0.15}s`
                        }"
                    >
                        <!-- 政策标题栏 -->
                        <div class="policy-header">
                            <div class="policy-icon">
                                <i class="policy-icon-inner"></i>
                            </div>
                            <div class="policy-title">
                                <div class="policy-name">{{ policy.name }}</div>
                            </div>
                        </div>
                        
                        <!-- 政策内容 -->
                        <div class="policy-content" v-if="policy.content">
                            <div class="policy-description">
                                {{ policy.content }}
                            </div>
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
import { listPolicyAll } from "@/api/brain"

const policyList = ref([])

onMounted(() => {
    init()
})

async function init() {
    await getListPolicyAll()
}

async function getListPolicyAll() {
    try {
        const response = await listPolicyAll({ type: 'rcld' })
        policyList.value = response
    } catch (error) {
        console.error('获取人才政策数据失败:', error)
    }
}
</script>

<style scoped lang="scss">
.right-card {
    height: 100%;
}

.policy-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
}

.policy-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.policy-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px;
    position: relative;
    animation: slideInRight 0.6s ease-out both;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--card-color);
        transform: translateX(3px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
}

.policy-header {
    display: flex;
    align-items: center;
}

.policy-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--card-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    box-shadow: 0 0 10px var(--card-color);
    
    .policy-icon-inner {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #30DCFF;
        display: block;
    }
}

.policy-title {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.policy-name {
    font-size: 12px;
    font-weight: 600;
    color: #30DCFF;
    line-height: 1.2;
}

.policy-category {
    font-size: 10px;
    color: var(--card-color);
    opacity: 0.8;
}

.policy-status {
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
    
    &.active {
        background: rgba(0, 255, 136, 0.2);
        color: #00FF88;
        border: 1px solid rgba(0, 255, 136, 0.3);
    }
    
    &.completed {
        background: rgba(48, 220, 255, 0.2);
        color: #30DCFF;
        border: 1px solid rgba(48, 220, 255, 0.3);
    }
    
    &.planned {
        background: rgba(139, 92, 246, 0.2);
        color: #8B5CF6;
        border: 1px solid rgba(139, 92, 246, 0.3);
    }
}

.policy-content {
    font-size: 12px;
    line-height: 1.4;
    margin-left: 8px;
}

.policy-description {
    color: #00FF88;
    margin-bottom: 6px;
    line-height: 1.3;
}

.policy-points {
    margin-bottom: 6px;
}

.policy-point {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 3px;
    
    .point-bullet {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--card-color);
        margin-top: 4px;
        flex-shrink: 0;
    }
    
    .point-text {
        color: #d1d5db;
        font-size: 9px;
        line-height: 1.3;
    }
}

.policy-benefits {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 4px;
    
    .benefits-title {
        font-size: 9px;
        color: var(--card-color);
        font-weight: 600;
        margin-bottom: 2px;
    }
    
    .benefits-content {
        color: #a0a0a0;
        font-size: 8px;
        line-height: 1.2;
    }
}

.scroll-indicator {
    display: flex;
    justify-content: center;
    gap: 4px;
    padding-top: 8px;
    
    .scroll-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        
        &.active {
            background: #30DCFF;
        }
    }
}

/* 滚动条样式 */
.policy-list::-webkit-scrollbar {
    width: 4px;
}

.policy-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.policy-list::-webkit-scrollbar-thumb {
    background: rgba(48, 220, 255, 0.5);
    border-radius: 2px;
}

.policy-list::-webkit-scrollbar-thumb:hover {
    background: rgba(48, 220, 255, 0.8);
}

/* 动画定义 */
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.7;
        transform: scale(1.2);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .policy-card {
        padding: 8px;
    }
    
    .policy-icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        
        .policy-icon-inner {
            width: 6px;
            height: 6px;
        }
    }
    
    .policy-name {
        font-size: 11px;
    }
    
    .policy-category {
        font-size: 9px;
    }
    
    .policy-status {
        font-size: 8px;
        padding: 1px 4px;
    }
    
    .policy-description {
        font-size: 9px;
    }
    
    .point-text {
        font-size: 8px;
    }
    
    .benefits-content {
        font-size: 7px;
    }
}
</style>