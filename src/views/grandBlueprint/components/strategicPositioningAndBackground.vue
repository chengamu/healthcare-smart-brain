<script setup>
import { ref, onMounted } from "vue"
import mCard from "@/components/mCard/index.vue"

const showBackgroundText = ref(false)
const showCoreText = ref(false)

onMounted(() => {
  // 延迟显示背景文字
  setTimeout(() => {
    showBackgroundText.value = true
  }, 500)
  
  // 延迟显示核心定位文字
  setTimeout(() => {
    showCoreText.value = true
  }, 1500)
})
</script>

<template>
    <div class="left-card">
        <m-card title="战略定位与背景">
            <div class="content-wrapper">
                <div class="content-left" :class="{ show: showBackgroundText }">
                    <div class="section-title">背景</div>
                    <div class="background-text">
                        学习贯彻习近平总书记关于科技创新、产业创新的重要论述精神，全面落实浙江省<span class="highlight">加快建设创新浙江、因地制宜发展新质生产力</span>的决策部署，大力推进<span class="highlight">产城人文深度融合发展</span>。
                    </div>
                </div>
                <div class="divider"></div>
                <div class="content-right" :class="{ show: showCoreText }">
<!--                    <div class="section-title">核心定位</div>-->
                    <div class="core-text">
                        <div class="core-text-row">
                            <div class="core-text-left">创绍兴产城人文献示范窗口</div>
                            <div class="core-text-right">建杭州湾生命健康产业新高地</div>
                        </div>
                    </div>
                </div>
            </div>
        </m-card>
    </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  padding: 0 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
    box-sizing: border-box;
}

.content-left, .content-right {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition: all 1.5s ease-in-out;
  
  &.show {
    opacity: 1;
  }
}

.content-left {
    width: 55%;
  &.show {
    transform: translateX(0);
  }
}

.content-right {
    width: 35%;
  &.show {
    transform: translateX(0);
  }
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #30DCFF;
  margin-bottom: 15px;
  text-align: center;
  position: relative;
  padding-bottom: 8px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #30DCFF, transparent);
  }
}

.background-text {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-align: justify;
  text-indent: 2em;
  transition: all 1.5s ease-in-out;
  text-shadow: 0 0 8px rgba(48, 220, 255, 0.5);
}

.divider {
  width: 1px;
  height: 80%;
  background: linear-gradient(to bottom, transparent, #30DCFF, transparent);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #30DCFF;
    box-shadow: 0 0 10px #30DCFF, 0 0 20px #30DCFF;
  }
}
.highlight {
    font-weight: bold;
    color: #30DCFF;
    text-shadow: 0 0 10px rgba(48, 220, 255, 0.8);
}
.core-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.core-text-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.core-text-left, .core-text-right {
  font-size: 14px;
  font-weight: bold;
  color: #30DCFF;
  text-align: center;
  transition: all 1.5s ease-in-out;
  text-shadow: 0 0 10px rgba(48, 220, 255, 0.8),
               0 0 20px rgba(48, 220, 255, 0.6),
               0 0 30px rgba(48, 220, 255, 0.4);
  padding: 16px;
  border-radius: 8px;
  //background: radial-gradient(circle, rgba(48, 220, 255, 0.15) 0%, transparent 70%);
  //border: 1px solid rgba(48, 220, 255, 0.3);
  //backdrop-filter: blur(5px);
  flex: 1;
  margin: 0 10px;
}

    .core-text-left {
      transform: translateY(20px);
    }

    .core-text-right {
      transform: translateY(-10px);

    }

</style>