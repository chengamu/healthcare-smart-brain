<template>
  <div class="left-card">
    <m-card title="共享设备使用率">
      <div class="devices-container">
        <div class="devices-wrapper">
          <div class="device-container" v-for="(device, index) in devices" :key="index">
            <div class="device-chart-container">
              <v-chart ref="vChart" :option="getDeviceOption(device.value)" :autoresize="true" />
            </div>
            <div class="device-name">{{ device.name }}</div>
          </div>
          
          <!-- 添加重复项以实现无缝滚动 -->
          <div class="device-container" v-for="(device, index) in devices" :key="`duplicate-${index}`">
            <div class="device-chart-container">
              <v-chart ref="vChart" :option="getDeviceOption(device.value)" :autoresize="true" />
            </div>
            <div class="device-name">{{ device.name }}</div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import * as echarts from "echarts"
import mCard from "@/components/mCard/index.vue"
import VChart from "vue-echarts"

// 引入水球圖擴充套件
import 'echarts-liquidfill';

const colorGold = '#d09c42', colorBlue = '#4292c8', colorGreen = '#35c084';

const devices = ref([
  { name: '单四极杆液质联用仪', value: 0.85 }, { name: '超速离心机', value: 0.72 },
  { name: '核磁共振仪', value: 0.55 }, { name: '共聚焦显微镜', value: 0.91 },
  { name: 'PCR仪', value: 0.68 }, { name: '流式细胞仪', value: 0.82 },
  { name: '质谱仪', value: 0.45 }, { name: '色谱仪', value: 0.77 }
]);

// --- **关键：函数现在返回一个包含填充色和边框色的对象** ---
function getColors(value) {
    let startColor, endColor;
    if (value >= 0.8) {
        startColor = echarts.color.lift(colorGold, 0.3); endColor = colorGold;
    } else if (value >= 0.6) {
        startColor = echarts.color.lift(colorBlue, 0.3); endColor = colorBlue;
    } else {
        startColor = echarts.color.lift(colorGreen, 0.3); endColor = colorGreen;
    }
    return {
        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: startColor }, { offset: 1, color: endColor }
        ]),
        // 为边框创建一个角度不同的渐变
        border: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: endColor }, { offset: 1, color: startColor }
        ])
    };
}

// 提取公共配置
const commonGaugeOption = {
    type: 'liquidFill',
    waveAnimation: true,
    shape: 'circle',
    backgroundStyle: {
        color: 'rgba(198, 198, 198, 0.1)'
    },
    label: {
        fontSize: 32, fontWeight: 'bold', fontFamily: 'Orbitron, sans-serif',
        color: '#fff'
    },
    radius: '60%',  // 增加水球图半径
    outline: {
        show: true,
        borderDistance: 2  // 减小边框距离
    }
}

// 为每个设备生成独立的配置项
const getDeviceOption = (value) => ({
  series: [
    {
      ...commonGaugeOption,
        outline: {
            show: true, borderDistance: 8,
            itemStyle: {
                // --- **关键：应用边框渐变** ---
                borderColor: getColors(value).border,
                borderWidth: 8, shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.25)'
            }
        },
        data: [value],
        color: [getColors(value).fill], // 应用填充渐变
    }
  ]
})
</script>

<style scoped lang="scss">
.devices-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background: linear-gradient(90deg, transparent 0%, transparent 5%, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.8) 90%, transparent 95%, transparent 100%);
    z-index: 2;
    pointer-events: none;
  }
}
.device-container {
  width: 50%;
  height: 100%;
  flex-shrink: 0;
  margin: 0 10px;  /* 增加左右间距 */
}
.device-chart-container {
  height: calc(100% - 32px);
  width: 100%;
}
.device-name {
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
}
</style>

<style scoped lang="scss">
.devices-wrapper {
  display: flex;
  height: 100%;
  animation: scroll 30s linear infinite;
}

.devices-wrapper:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>