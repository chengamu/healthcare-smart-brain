<template>
    <div class="right-card">
        <m-card title="强化理论学习">
            <div class="learning-container">
                <div class="learning-grid">
                    <div v-for="(topic, index) in learningTopics" :key="index"
                         class="topic-card"
                         :style="{ '--topic-color': topic.color }">
                        <div class="card-header">
                            <div class="topic-icon" :style="{ backgroundColor: topic.color }">{{ topic.icon }}</div>
                            <div class="topic-name">{{ topic.name }}</div>
                        </div>
                        <div class="card-content">
                            <div class="progress-info">
                                <div class="progress-bar">
                                    <div class="progress-fill" 
                                         :style="{ 
                                           width: topic.progress + '%',
                                           backgroundColor: topic.color
                                         }"></div>
                                </div>
                                <div class="progress-bottom">
                                    <div class="study-hours">
                                        <span class="hours-value">{{ topic.completed }}</span>
                                        <span class="hours-unit">小时</span>
                                    </div>
                                    <div class="progress-text">{{ topic.progress }}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- <div class="total-summary">
                    <div class="summary-item">
                        <span class="summary-label">累计学习时长:</span>
                        <span class="summary-value">{{ totalLearningHours }}小时</span>
                    </div>
                </div> -->
            </div>
        </m-card>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import mCard from "@/components/mCard/index.vue"

const learningTopics = ref([
  {
    name: '不忘初心牢记使命',
    icon: '❤️',
    color: '#dc2626',
    progress: 95,
    completed: 38
  },
  {
    name: '习近平新时代中国特色社会主义思想',
    icon: '🇨🇳',
    color: '#ef4444',
    progress: 88,
    completed: 44
  },
  {
    name: '党章党规学习',
    icon: '📜',
    color: '#f97316',
    progress: 92,
    completed: 36
  },
  {
    name: '高质量发展理论',
    icon: '🚀',
    color: '#eab308',
    progress: 75,
    completed: 30
  }
])

const totalLearningHours = computed(() => {
  return learningTopics.value.reduce((sum, topic) => sum + topic.completed, 0)
})
</script>

<style scoped lang="scss">
.learning-container {
  padding: 20px;
  height: 100%;
  background: transparent;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  max-width: 100%;
}

.topic-card {
  background: transparent;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  // min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: slide 4s infinite;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    border-color: var(--topic-color);
    box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    position: relative;
    z-index: 2;
    
    .topic-icon {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      animation: pulse 2s infinite;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }
    
    .topic-name {
      font-size: 12px;
      color: #ffffff;
      font-weight: 600;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
      line-height: 1.2;
      flex: 1;
    }
  }
  
  .card-content {
    position: relative;
    z-index: 2;
    
    .progress-info {
      .progress-bar {
        height: 6px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
        
        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
            animation: slide-progress 2s infinite;
          }
        }
      }
      
      .progress-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .study-hours {
          .hours-value {
            font-size: 16px;
            font-weight: bold;
            color: #fbbf24;
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.8);
          }
          
          .hours-unit {
            font-size: 10px;
            color: rgba(255, 255, 255, 0.8);
            margin-left: 2px;
          }
        }
        
        .progress-text {
          font-size: 12px;
          color: #ffffff;
          font-weight: bold;
          text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}

.total-summary {
  background: transparent;
  border: 3px solid rgba(220, 38, 38, 0.8);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  
  .summary-item {
    .summary-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      margin-right: 8px;
    }
    
    .summary-value {
      font-size: 18px;
      font-weight: bold;
      color: #fbbf24;
      text-shadow: 0 0 8px rgba(251, 191, 36, 0.8);
    }
  }
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes slide {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes slide-progress {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
</style>