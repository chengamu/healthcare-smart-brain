<script setup>
import mCard from "@/components/mCard/index.vue"

const coreData = {
  center: { name: "医疗健康产业" },
  threeRings: [
    { name: "党建联建" },
    { name: "产业联盟" },
    { name: "人才联通" }
  ],
  fiveEcosystems: [
    { name: "产业" },
    { name: "创新" },
    { name: "人才" },
    { name: "生活" },
    { name: "服务" }
  ]
}
</script>

<template>
  <div class="right-card">
    <m-card title="“135”建设体系">
      <div class="relationship-graph">
        <div class="graph-container">
          <!-- 核心光球 -->
          <div class="core-sphere">
            <div class="sphere-content">
              <div class="sphere-name">{{ coreData.center.name }}</div>
            </div>
          </div>

          <!-- 3联共促子光环 -->
          <div 
            v-for="(ring, index) in coreData.threeRings" 
            :key="'ring-' + index"
            class="sub-ring"
            :class="`ring-${index}`"
          >
            <div class="ring-content">
              <div class="ring-name">{{ ring.name }}</div>
            </div>
          </div>

          <!-- 5大生态卫星节点 -->
          <div 
            v-for="(eco, index) in coreData.fiveEcosystems" 
            :key="'eco-' + index"
            class="satellite-node"
            :class="`node-${index}`"
          >
            <div class="node-content">
              <div class="node-name">{{ eco.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style scoped lang="scss">
.relationship-graph {
  width: 100%;
  height: 100%;
  position: relative;
}

.graph-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.core-sphere {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #30DCFF, #0077be);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 30px rgba(48, 220, 255, 0.7),
              inset 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 10;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  // 居中显示
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sphere-content {
  text-align: center;
  color: white;
  padding: 5px;
}

.sphere-name {
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
}

.sub-ring {
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transform: scale(1);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 5;
  
  &.ring-0 {
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at 30% 30%, rgba(48, 220, 255, 0.3), rgba(0, 119, 190, 0.1));
    box-shadow: 0 0 20px rgba(48, 220, 255, 0.5);
    // 顶部节点（120度位置）
    top: 30%;
    left: 50%;
    margin-top: -35px;
    margin-left: -35px;
  }
  
  &.ring-1 {
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at 30% 30%, rgba(48, 220, 255, 0.3), rgba(0, 119, 190, 0.1));
    box-shadow: 0 0 20px rgba(48, 220, 255, 0.5);
    // 左下节点（240度位置）
    top: 65%;
    left: 40%;
    margin-top: -35px;
    margin-left: -35px;
  }
  
  &.ring-2 {
    width: 70px;
    height: 70px;
    background: radial-gradient(circle at 30% 30%, rgba(48, 220, 255, 0.3), rgba(0, 119, 190, 0.1));
    box-shadow: 0 0 20px rgba(48, 220, 255, 0.5);
    // 右下节点（0度位置）
    top: 65%;
    left: 60%;
    margin-top: -35px;
    margin-left: -35px;
  }
}

.ring-content {
  text-align: center;
  color: #30DCFF;
  width: 80%;
}

.ring-name {
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(48, 220, 255, 0.8);
}

.satellite-node {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transform: scale(1);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 8;
  
  &.node-0 {
    background: radial-gradient(circle at 30% 30%, #00FFC8, #007a65);
    box-shadow: 0 0 20px rgba(0, 255, 200, 0.7);
    // 第一个节点（顶部）
    bottom: 0;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;
  }
  
  &.node-1 {
    background: radial-gradient(circle at 30% 30%, #FF00AA, #7a0052);
    box-shadow: 0 0 20px rgba(255, 0, 170, 0.7);
    // 第二个节点（左上）
    top: 20%;
    left: 35%;
    margin-top: -30px;
    margin-left: -30px;
  }
  
  &.node-2 {
    background: radial-gradient(circle at 30% 30%, #FFD700, #aa8f00);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
    // 第三个节点（左下）
    top: 60%;
    left: 25%;
    margin-top: -30px;
    margin-left: -30px;
  }
  
  &.node-3 {
    background: radial-gradient(circle at 30% 30%, #9D4EDD, #5d2e8c);
    box-shadow: 0 0 20px rgba(157, 78, 221, 0.7);
    // 第四个节点（右下）
    top: 60%;
    left: 75%;
    margin-top: -30px;
    margin-left: -30px;
  }
  
  &.node-4 {
    background: radial-gradient(circle at 30% 30%, #00B4D8, #006e90);
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.7);
    // 第五个节点（右上）
    top: 20%;
    left: 65%;
    margin-top: -30px;
    margin-left: -30px;
  }
}

.node-content {
  text-align: center;
  color: white;
  padding: 2px;
}

.node-name {
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
}
</style>