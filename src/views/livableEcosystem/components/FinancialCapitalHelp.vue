<template>
  <div class="left-card">
    <m-card title="金融资本助力">
      <div class="capital-container">
        <div class="institution-grid">
          <div v-for="institution in institutions" :key="institution.name" 
               class="institution-card">
            <div class="institution-name">{{ institution.name }}</div>
            <div class="institution-amount">{{ institution.amount }}</div>
            <div class="institution-projects">{{ institution.projects }}个项目</div>
          </div>
        </div>
        
        <!-- <div class="total-stats">
          <div class="stat-item">
            <span class="stat-label">累计投资:</span>
            <span class="stat-value">5.2亿元</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">投资机构:</span>
            <span class="stat-value">4家</span>
          </div>
        </div> -->
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
    configValue: jrzbzl,
    getConfigKeyFunc: fetchJrzbzl
} = useGetConfigKey('brain.livableEcosystem.jrzbzl') // 智慧大脑-产城生态-金融资本助力

const institutions = ref([
  // { name: '龙盘基金', amount: '1.8亿', projects: 3 },
  // { name: '415X', amount: '1.2亿', projects: 2 },
  // { name: '辰德资本', amount: '0.9亿', projects: 2 },
  // { name: '国科资本', amount: '1.3亿', projects: 3 }
])

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

.institution-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  // margin-bottom: 20px;
}

.institution-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(48, 220, 255, 0.3);
  border-radius: 8px;
  padding: 10px 15px;
  text-align: center;
  
  .institution-name {
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .institution-amount {
    font-size: 20px;
    color: #30DCFF;
    font-weight: bold;
    margin-bottom: 6px;
  }
  
  .institution-projects {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.total-stats {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(48, 220, 255, 0.3);
  
  .stat-item {
    text-align: center;
    
    .stat-label {
      display: block;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 4px;
    }
    
    .stat-value {
      font-size: 16px;
      color: #30DCFF;
      font-weight: bold;
    }
  }
}
</style>