<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import {listDrugAll} from "@/api/brain.js";

const emit = defineEmits(['animationComplete'])

const drugList = ref([])
// 用于跟踪动画完成状态，避免重复发送事件
const animationCompleted = ref(false)

// 创新药时间轴数据
const drugTimelineData = ref([])

// 阶段映射配置
const phaseConfig = {
  1: { name: '临床一期', color: '#30DCFF', order: 1 },
  2: { name: '临床二期', color: '#00FF88', order: 2 },
  3: { name: '临床三期', color: '#8B5CF6', order: 3 },
  4: { name: '上市', color: '#FFD700', order: 4 }
}

// 处理创新药数据并按阶段分组
const processDrugData = () => {
  if (!drugList.value || drugList.value.length === 0) return
  
  // 按阶段分组
  const groupedData = {}
  drugList.value.forEach(drug => {
    const phase = drug.phase
    if (!groupedData[phase]) {
      groupedData[phase] = []
    }
    groupedData[phase].push(drug)
  })
  
  // 转换为时间轴数据格式
  const timelineData = []
  Object.keys(groupedData)
    .sort((a, b) => phaseConfig[a]?.order - phaseConfig[b]?.order) // 从小到大排序：1,2,3,4
    .forEach(phase => {
      const config = phaseConfig[phase]
      if (config) {
        timelineData.push({
          phase: parseInt(phase),
          phaseName: config.name,
          color: config.color,
          drugs: groupedData[phase],
          count: groupedData[phase].length
        })
      }
    })
  
  drugTimelineData.value = timelineData
}

// 计算每个阶段在时间轴上的位置（百分比）
const getPhasePosition = (index) => {
  if (!drugTimelineData.value.length) return 0
  
  // 计算每个阶段的权重
  const totalDrugs = drugTimelineData.value.reduce((sum, phase) => sum + phase.count, 0)
  const phaseWeights = drugTimelineData.value.map(phase => {
    const baseWeight = 1
    const extraWeight = (phase.count / totalDrugs) * 2
    return baseWeight + extraWeight
  })
  
  const totalWeight = phaseWeights.reduce((sum, weight) => sum + weight, 0)
  let cumulative = 0
  for (let i = 0; i < index; i++) {
    cumulative += phaseWeights[i]
  }
  
  return (cumulative / totalWeight) * 100
}

// 计算每个阶段在时间轴上占据的高度（百分比）
const getPhaseHeight = (index) => {
  if (!drugTimelineData.value.length) return 0
  
  const totalDrugs = drugTimelineData.value.reduce((sum, phase) => sum + phase.count, 0)
  const phaseWeights = drugTimelineData.value.map(phase => {
    const baseWeight = 1
    const extraWeight = (phase.count / totalDrugs) * 2
    return baseWeight + extraWeight
  })
  
  const totalWeight = phaseWeights.reduce((sum, weight) => sum + weight, 0)
  return (phaseWeights[index] / totalWeight) * 100
}

// 格式化文本函数（暂时保留，但不进行格式化处理）
const formatText = (text, maxLength) => {
  return text || ''
}

// 数据加载完成后发送动画完成事件
watch(drugTimelineData, () => {
  if (drugTimelineData.value.length > 0 && !animationCompleted.value) {
    // 使用nextTick确保DOM更新完成
    nextTick(() => {
      // 延迟发送事件，确保动画完成
      setTimeout(() => {
        console.log('创新药时间轴动画完成，向父组件发送完成事件')
        emit('animationComplete')
        animationCompleted.value = true // 标记为已完成，避免重复发送
      }, 800) // 缩短等待时间，因为不需要等待ECharts动画
    })
  }
}, { immediate: true })

// 监听drugList变化，自动更新时间轴数据
watch(drugList, () => {
  processDrugData()
}, { deep: true })

async function init() {
    await getListDrugAll()
}

async function getListDrugAll() {
    try {
        const response = await listDrugAll()
        drugList.value = response
        // 获取数据后处理时间轴数据
        processDrugData()
    } catch (error) {
        console.error('获取创新药数据失败:', error)
        // 如果获取数据失败，使用模拟数据进行演示
        drugList.value = [
            { id: 1, name: '阿尔茨海默病新药A', phase: 1, progress: 35, indication: '阿尔茨海默病' },
            { id: 2, name: '糖尿病治疗药物B', phase: 1, progress: 42, indication: '2型糖尿病' },
            { id: 3, name: '抗癌药物C', phase: 2, progress: 68, indication: '非小细胞肺癌' },
            { id: 4, name: '心血管疾病药物D', phase: 2, progress: 73, indication: '高血压' },
            { id: 5, name: '免疫治疗药物E', phase: 2, progress: 55, indication: '类风湿关节炎' },
            { id: 6, name: '抗病毒药物F', phase: 2, progress: 61, indication: '慢性乙肝' },
            { id: 7, name: '神经系统药物G', phase: 2, progress: 77, indication: '帕金森病' },
            { id: 8, name: '消化系统药物H', phase: 2, progress: 49, indication: '炎症性肠病' },
            { id: 9, name: '呼吸系统药物I', phase: 2, progress: 64, indication: '慢性阻塞性肺病' },
            { id: 10, name: '神经退行性疾病药物J', phase: 3, progress: 82, indication: '多发性硬化' },
            { id: 11, name: '罕见病治疗药物K', phase: 3, progress: 91, indication: '肌萎缩侧索硬化' },
            { id: 12, name: '抗病毒药物L', phase: 4, progress: 100, indication: '新冠肺炎' },
            { id: 13, name: '骨科疾病药物M', phase: 4, progress: 100, indication: '骨质疏松症' }
        ]
        processDrugData()
    }
}

// -------------------- 生命周期 --------------------

onMounted(() => {
    init()
})
</script>

<template>
  <!-- 创新药时间轴展示 -->
  <div class="drug-timeline-container" v-if="drugTimelineData.length > 0">
    <!-- 纯代码实现的时间轴 -->
    <div class="custom-timeline-content">
      <!-- 垂直时间轴线 -->
      <div class="timeline-line"></div>
      
      <!-- 各个阶段 -->
      <div 
        v-for="(phaseData, index) in drugTimelineData" 
        :key="phaseData.phase"
        class="timeline-phase"
        :style="{ 
          top: `${getPhasePosition(index)}%`,
          height: `${getPhaseHeight(index)}%`
        }"
      >
        <!-- 阶段节点 -->
        <div 
          class="phase-node"
          :style="{ 
            backgroundColor: phaseData.color,
            boxShadow: `0 0 15px ${phaseData.color}40`
          }"
        >
          <div class="node-inner" :style="{ borderColor: phaseData.color }"></div>
        </div>
        
        <!-- 阶段标签 -->
        <div class="phase-label">
          <h4 class="phase-name" :style="{ color: phaseData.color }">
            {{ phaseData.phaseName }}
          </h4>
          <p class="phase-count">{{ phaseData.count }}个创新药</p>
        </div>
        
        <!-- 创新药卡片区域 -->
        <div class="drugs-container">
          <div 
            v-for="(drug, drugIndex) in phaseData.drugs" 
            :key="drug.id"
            class="drug-card"
            :style="{ 
              borderColor: phaseData.color,
              animationDelay: `${drugIndex * 0.1}s`
            }"
          >
            <!-- 药物名称 -->
            <div class="drug-name">
              {{ drug.name || `创新药${drugIndex + 1}` }}
            </div>
            
            <!-- 适应症 -->
            <div class="drug-indication">
              <span class="indication-label">适应症:</span>
              <span class="indication-text">
                {{ drug.indication || '未知' }}
              </span>
            </div>
            
            <!-- 悬停效果遮罩 -->
            <div class="card-hover-overlay" :style="{ backgroundColor: `${phaseData.color}20` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 创新药时间轴容器 */
.drug-timeline-container {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

/* 纯代码时间轴内容区域 */
.custom-timeline-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 0;
}

/* 垂直时间轴线 */
.timeline-line {
  position: absolute;
  left: 60px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    rgba(72, 209, 204, 0.8) 0%,
    rgba(0, 255, 136, 0.8) 25%,
    rgba(139, 92, 246, 0.8) 75%,
    rgba(255, 215, 0, 0.8) 100%);
  box-shadow: 0 0 10px rgba(72, 209, 204, 0.5);
}

/* 时间轴阶段容器 */
.timeline-phase {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  min-height: 80px;
}

/* 阶段节点 */
.phase-node {
  position: absolute;
  left: 48px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
  cursor: pointer;
}

.phase-node:hover {
  transform: scale(1.2);
  box-shadow: 0 0 25px currentColor !important;
}

.node-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid;
  background: rgba(255, 255, 255, 0.9);
}

/* 阶段标签 */
.phase-label {
  position: absolute;
  left: 85px;
  top: -5px;
  min-width: 120px;
}

.phase-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 2px 0;
  text-shadow: 0 0 8px currentColor;
}

.phase-count {
  font-size: 11px;
  color: #a0a0a0;
  margin: 0;
  opacity: 0.8;
}

/* 创新药卡片容器 */
.drugs-container {
  position: absolute;
  left: 220px;
  top: -10px;
  right: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
  max-height: calc(100% - 10px);
  overflow-y: auto;
  padding-bottom: 10px;
}

/* 创新药卡片 */
.drug-card {
  position: relative;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid;
  border-radius: 6px;
  padding: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  animation: slideInRight 0.6s ease-out both;
  overflow: hidden;
  min-height: 60px;
  max-height: 80px;
}

.drug-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  border-color: currentColor;
}

.drug-card:hover .card-hover-overlay {
  opacity: 1;
}

/* 药物名称 */
.drug-name {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
  line-height: 1.3;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 适应症区域 */
.drug-indication {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: auto;
}

.indication-label {
  font-size: 9px;
  color: #a0a0a0;
  opacity: 0.8;
}

.indication-text {
  font-size: 10px;
  color: #e2e8f0;
  line-height: 1.2;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 悬停遮罩 */
.card-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 8px;
}

/* 滚动条样式 */
.drugs-container::-webkit-scrollbar {
  width: 4px;
}

.drugs-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.drugs-container::-webkit-scrollbar-thumb {
  background: rgba(72, 209, 204, 0.5);
  border-radius: 2px;
}

.drugs-container::-webkit-scrollbar-thumb:hover {
  background: rgba(72, 209, 204, 0.8);
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 容器整体动画 */
.drug-timeline-container {
  animation: fadeInUp 1s ease-out;
}

/* 容器悬停效果 */
.drug-timeline-container:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .drug-timeline-container {
    padding: 12px;
  }
  
  .drugs-container {
    left: 200px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 6px;
  }
  
  .drug-card {
    padding: 6px;
    min-height: 55px;
    max-height: 70px;
  }
}

@media (max-width: 768px) {
  .drug-timeline-container {
    padding: 10px;
  }
  
  .custom-timeline-content {
    padding: 15px 0;
  }
  
  .timeline-line {
    left: 40px;
  }
  
  .phase-node {
    left: 28px;
    width: 24px;
    height: 24px;
  }
  
  .phase-label {
    left: 65px;
    min-width: 100px;
  }
  
  .phase-name {
    font-size: 12px;
  }
  
  .phase-count {
    font-size: 10px;
  }
  
  .drugs-container {
    left: 170px;
    grid-template-columns: 1fr;
    gap: 5px;
  }
  
  .drug-card {
    padding: 6px;
    min-height: 50px;
    max-height: 65px;
  }
  
  .drug-name {
    font-size: 11px;
  }
  
  .indication-text {
    font-size: 9px;
  }
}
</style>
