<template>
  <div class="left-card">
    <m-card title="基金支持">
      <div class="capital-container">
        <div class="total-sum">
          
          <!-- 主要内容 -->
          <div class="total-content">
            <div class="total-label">累计投资</div>
            <div class="total-amount">{{ formattedTotalAmount }}</div>
            <div class="total-unit">亿元</div>
          </div>
          
          <!-- 底部装饰 -->
          <div class="decoration-bottom">
            <div class="line"></div>
            <div class="line line2"></div>
          </div>
        </div>
        
        <div class="institution-grid" :class="`institution-grid-${institutions.length}`">
          <div v-for="institution in institutions" :key="institution.name" 
               class="institution-card">
            <div class="institution-header">
              <div class="institution-name">{{ institution.name }}</div>
            </div>
            <div class="institution-body">
              <div class="institution-amount">{{ institution.amount }}</div>
              <div class="institution-projects">{{ institution.projects }}个项目</div>
            </div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"
import {
    useGetConfigKey
} from '@/hooks/useGetConfigKey'

/**
 * 参数获取
 */
const {
    configValue: jrzbzl,
    getConfigKeyFunc: fetchJrzbzl
} = useGetConfigKey('brain.livableEcosystem.jrzbzl') // 智慧大脑-产城生态-金融资本助力

const institutions = ref([])

// 修改总金额计算逻辑，移除单位并优化格式
const totalAmount = computed(() => {
  let hasPlus = false
  let total = 0
  
  for (const institution of institutions.value) {
    let amountStr = institution.amount
    // 检查是否有 +
    if (amountStr.includes('+')) {
      hasPlus = true
      amountStr = amountStr.replace('+', '')
    }
    // 去掉亿字
    const numericPart = parseFloat(amountStr.replace('亿', ''))
    if (!isNaN(numericPart)) {
      total += numericPart
    }
  }
  
  // 返回数值部分，不带单位
  return {
    value: total,
    hasPlus: hasPlus
  }
})

// 格式化显示总金额
const formattedTotalAmount = computed(() => {
  const amount = totalAmount.value.value
  const hasPlus = totalAmount.value.hasPlus
  
  // 处理大数字显示
  if (amount >= 10000) {
    return hasPlus ? `${(amount / 10000).toFixed(2)}+万亿` : `${(amount / 10000).toFixed(2)}万亿`
  } else if (amount >= 1000) {
    return hasPlus ? `${(amount / 1000).toFixed(2)}+千亿` : `${(amount / 1000).toFixed(2)}千亿`
  } else {
    return hasPlus ? `${amount.toFixed(2)}+` : amount.toFixed(2)
  }
})

onMounted(() => {
    init()
});

async function init(str) {
    // 获取需要的参数
    await Promise.all([
        fetchJrzbzl(),
    ])
    institutions.value = JSON.parse(jrzbzl.value)
}
</script>

<style scoped lang="scss">
.capital-container {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.total-sum {
  text-align: center;
  padding: 10px;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  
  // 科技感装饰元素
  .decoration-top {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    
    .dot {
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #30DCFF, #00a8ff);
      border-radius: 50%;
      margin: 0 auto;
      box-shadow: 0 0 10px #30DCFF, 0 0 20px #30DCFF;
      animation: dot-pulse 2s infinite;
    }
    
    .pulse-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(48, 220, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ring-pulse 3s infinite;
    }
  }
  
  .total-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    .total-label {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    
    .total-amount {
      font-size: 36px;
      font-weight: bold;
      background: linear-gradient(to right, #30DCFF, #00a8ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 15px rgba(48, 220, 255, 0.5);
    }
    
    .total-unit {
      font-size: 16px;
      color: rgba(48, 220, 255, 0.8);
      font-weight: 500;
    }
  }
  
  .decoration-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    
    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #30DCFF, transparent);
      
      &.line2 {
        bottom: 1px;
        opacity: 0.5;
        animation: line-move 3s infinite linear;
      }
    }
  }
  
  // 背景渐变和科技感效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(48, 220, 255, 0.05), 
      rgba(0, 168, 255, 0.02),
      transparent 70%);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(48, 220, 255, 0.1), 
      transparent);
    animation: shine 4s infinite;
    z-index: 1;
  }
}

// 动画效果
@keyframes dot-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes ring-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
}

@keyframes line-move {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.institution-grid {
  display: grid;
  gap: 16px;
}

.institution-grid-3 {
    grid-template-columns: repeat(3, 1fr);
}

.institution-grid-2, .institution-grid-4 {
    grid-template-columns: repeat(2, 1fr);
}

.institution-card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
  border: 1px solid rgba(48, 220, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(48, 220, 255, 0.2);
    border-color: rgba(48, 220, 255, 0.6);
  }
  
  .institution-header {
    padding: 12px 15px 8px;
    background: rgba(48, 220, 255, 0.05);
    border-bottom: 1px solid rgba(48, 220, 255, 0.2);
    
    .institution-name {
      font-size: 15px;
      color: #ffffff;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .institution-body {
    padding: 12px 15px;
    
    .institution-amount {
      font-size: 22px;
      color: #30DCFF;
      font-weight: bold;
      margin-bottom: 6px;
      text-shadow: 0 0 8px rgba(48, 220, 255, 0.3);
    }
    
    .institution-projects {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>