<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import {listDrugAll} from "@/api/brain.js";
import * as THREE from 'three'

const emit = defineEmits(['animationComplete'])

const drugList = ref([])
// 用于跟踪动画完成状态，避免重复发送事件
const animationCompleted = ref(false)

// 创新药时间轴数据
const drugTimelineData = ref([])

// 选中的药物信息
const selectedDrug = ref(null)

// 3D相关引用
const threeContainer = ref(null)
let scene, camera, renderer, dnaGroup
let animationId = null
let raycaster, mouse

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

// 格式化文本函数（暂时保留，但不进行格式化处理）
const formatText = (text, maxLength) => {
  return text || ''
}

// 初始化3D场景
const initThreeJS = () => {
  if (!threeContainer.value) return
  
  // 清除之前的渲染器
  if (renderer) {
    renderer.dispose()
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }
  
  // 创建场景
  scene = new THREE.Scene()
  // 设置透明背景
  scene.background = null
  
  // 创建相机
  const containerWidth = threeContainer.value.clientWidth
  const containerHeight = threeContainer.value.clientHeight
  // 调整视角参数，使用更小的fov值以显示更多内容
  camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000)
  // 调整相机位置，使其能够完整显示整个螺旋结构
  camera.position.set(0, 0, 50)
  
  // 创建渲染器，启用透明背景
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(containerWidth, containerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  // 设置渲染器背景透明
  renderer.setClearColor(0x000000, 0)
  
  // 清除容器内容并添加渲染器
  threeContainer.value.innerHTML = ''
  threeContainer.value.appendChild(renderer.domElement)
  
  // 创建DNA双螺旋结构
  createDNAStructure()
  
  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 5)
  scene.add(directionalLight)
  
  // 添加点击事件监听
  renderer.domElement.addEventListener('click', onMouseClick)
  renderer.domElement.style.cursor = 'pointer'
  
  // 开始渲染循环
  animate()
  
  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize)
}

// 鼠标点击事件处理
const onMouseClick = (event) => {
  console.log(1111)
  // 计算鼠标位置标准化设备坐标 (-1 到 +1)
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  
  // 通过鼠标点的位置和相机矩阵计算射线
  raycaster.setFromCamera(mouse, camera)
  
  // 获取与射线相交的物体
  const intersects = raycaster.intersectObjects(scene.children, true)
  
  if (intersects.length > 0) {
    // 查找被点击的药物节点
    let intersectedObject = intersects[0].object
    while (intersectedObject && !intersectedObject.userData.drug) {
      intersectedObject = intersectedObject.parent
    }
    
    if (intersectedObject && intersectedObject.userData.drug) {
      // 设置选中的药物信息
      selectedDrug.value = intersectedObject.userData.drug
      console.log('选中的药物:', selectedDrug.value)
    }
  }
}

// 创建DNA双螺旋结构
const createDNAStructure = () => {
  // 清除之前的DNA结构
  if (dnaGroup) {
    scene.remove(dnaGroup)
  }
  
  dnaGroup = new THREE.Group()
  scene.add(dnaGroup)
  
  // 创建双螺旋骨架
  createDNAHelix()
  
  // 添加药物节点
  createDrugNodes()
}

// 创建DNA双螺旋骨架
const createDNAHelix = () => {
  const helixGroup = new THREE.Group()
  
  // 创建两条螺旋线
  const points1 = []
  const points2 = []
  // 减少螺旋圈数
  const turns = Math.max(3, drugTimelineData.value.length || 3) // 最少3圈，根据阶段数量确定螺旋圈数
  const height = 25
  const radius = 10
  
  for (let i = 0; i <= 200; i++) {
    const t = i / 200
    const angle = t * Math.PI * 2 * turns
    const y = t * height - height / 2
    
    // 第一条螺旋线
    points1.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ))
    
    // 第二条螺旋线（相位差180度）
    points2.push(new THREE.Vector3(
      Math.cos(angle + Math.PI) * radius,
      y,
      Math.sin(angle + Math.PI) * radius
    ))
  }
  
  // 创建螺旋线几何体
  const curve1 = new THREE.CatmullRomCurve3(points1)
  const curve2 = new THREE.CatmullRomCurve3(points2)
  
  const tubeGeometry1 = new THREE.TubeGeometry(curve1, 200, 0.35, 8, false)
  const tubeGeometry2 = new THREE.TubeGeometry(curve2, 200, 0.35, 8, false)
  
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x30dcff,
    emissive: 0x0066ff,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.8
  })
  
  const helix1 = new THREE.Mesh(tubeGeometry1, material)
  const helix2 = new THREE.Mesh(tubeGeometry2, material)
  
  helixGroup.add(helix1)
  helixGroup.add(helix2)
  
  // 创建连接线（碱基对），适当减少连接线密度
  for (let i = 0; i < points1.length; i += 15) {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      points1[i],
      points2[i]
    ])
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ff88,
      transparent: true,
      opacity: 0.4
    })
    
    const line = new THREE.Line(lineGeometry, lineMaterial)
    helixGroup.add(line)
  }
  
  dnaGroup.add(helixGroup)
}

// 创建药物节点
const createDrugNodes = () => {
  if (!drugTimelineData.value.length) return
  
  const drugsGroup = new THREE.Group()
  // 减少螺旋圈数
  const turns = Math.max(3, drugTimelineData.value.length || 3)
  const height = 25
  const radius = 10
  
  // 为每个阶段创建药物节点
  drugTimelineData.value.forEach((phaseData, phaseIndex) => {
    const phaseGroup = new THREE.Group()
    
    // 计算该阶段在螺旋上的位置
    const phaseY = (phaseIndex / (turns - 1)) * height - height / 2
    const phaseAngle = (phaseIndex / (turns - 1)) * Math.PI * 2 * turns
    
    // 为每个药物创建节点
    phaseData.drugs.forEach((drug, drugIndex) => {
      // 计算药物在螺旋上的位置（围绕螺旋线分布）
      const angleOffset = (drugIndex / phaseData.drugs.length) * Math.PI * 2
      const drugAngle = phaseAngle + angleOffset
      
      // 药物位置在螺旋线外侧
      const drugRadius = radius + 2.5
      const x = Math.cos(drugAngle) * drugRadius
      const z = Math.sin(drugAngle) * drugRadius
      
      // 创建药物节点
      const drugGeometry = new THREE.SphereGeometry(0.6, 16, 16)
      const drugMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(phaseData.color),
        emissive: new THREE.Color(phaseData.color),
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9
      })
      
      const drugNode = new THREE.Mesh(drugGeometry, drugMaterial)
      drugNode.position.set(x, phaseY, z)
      drugNode.userData = { drug, phase: phaseData }
      
      // 添加发光光晕效果
      const glowGeometry = new THREE.SphereGeometry(0.85, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(phaseData.color),
        transparent: true,
        opacity: 0.3
      })
      
      const glowNode = new THREE.Mesh(glowGeometry, glowMaterial)
      glowNode.position.set(x, phaseY, z)
      
      // 创建药物名称标签（支持换行）
      const nameCanvas = document.createElement('canvas')
      const nameContext = nameCanvas.getContext('2d')
      nameCanvas.width = 300
      nameCanvas.height = 100
      
      // 设置透明背景
      nameContext.clearRect(0, 0, nameCanvas.width, nameCanvas.height)
      
      // 设置药物名称字体样式（更大字体）
      nameContext.fillStyle = 'rgba(255, 255, 255, 0.95)'
      nameContext.font = '32px Arial'
      nameContext.textAlign = 'center'
      nameContext.textBaseline = 'middle'
      nameContext.shadowColor = 'rgba(0, 0, 0, 0.8)'
      nameContext.shadowBlur = 3
      nameContext.shadowOffsetX = 2
      nameContext.shadowOffsetY = 2;
      
      // 绘制药物名称（支持换行）
      const drugName = drug.name;
      const maxWidth = 12;
      const lineHeight = 35;
      
      if (drugName.length <= maxWidth) {
        // 单行显示
        nameContext.fillText(drugName, nameCanvas.width / 2, nameCanvas.height / 2);
      } else {
        // 分两行显示
        const firstLine = drugName.substring(0, maxWidth);
        const secondLine = drugName.substring(maxWidth, Math.min(maxWidth * 2, drugName.length)) + (drugName.length > maxWidth * 2 ? '...' : '');
        nameContext.fillText(firstLine, nameCanvas.width / 2, nameCanvas.height / 2 - lineHeight / 2);
        nameContext.fillText(secondLine, nameCanvas.width / 2, nameCanvas.height / 2 + lineHeight / 2);
      }
      
      // 创建药物名称纹理
      const nameTexture = new THREE.CanvasTexture(nameCanvas)
      
      // 创建药物名称标签材质
      const nameLabelMaterial = new THREE.SpriteMaterial({
        map: nameTexture,
        transparent: true,
        depthTest: false,
        opacity: 0.95
      })
      
      // 创建药物名称标签精灵
      const nameLabel = new THREE.Sprite(nameLabelMaterial)
      nameLabel.position.set(x, phaseY + 2.0, z)
      nameLabel.scale.set(4, 1.2, 1)
      
      // 创建适应症标签（支持换行）
      const indicationCanvas = document.createElement('canvas')
      const indicationContext = indicationCanvas.getContext('2d')
      indicationCanvas.width = 300
      indicationCanvas.height = 100
      
      // 设置透明背景
      indicationContext.clearRect(0, 0, indicationCanvas.width, indicationCanvas.height)
      
      // 设置适应症字体样式（更大字体）
      indicationContext.fillStyle = 'rgba(200, 200, 200, 0.9)'
      indicationContext.font = '26px Arial'
      indicationContext.textAlign = 'center'
      indicationContext.textBaseline = 'middle'
      indicationContext.shadowColor = 'rgba(0, 0, 0, 0.8)'
      indicationContext.shadowBlur = 3
      indicationContext.shadowOffsetX = 2
      indicationContext.shadowOffsetY = 2;
      
      // 绘制适应症（支持换行）
      const indication = drug.indication;
      if (indication.length <= maxWidth) {
        // 单行显示
        indicationContext.fillText(indication, indicationCanvas.width / 2, indicationCanvas.height / 2);
      } else {
        // 分两行显示
        const firstLine = indication.substring(0, maxWidth);
        const secondLine = indication.substring(maxWidth, Math.min(maxWidth * 2, indication.length)) + (indication.length > maxWidth * 2 ? '...' : '');
        indicationContext.fillText(firstLine, indicationCanvas.width / 2, indicationCanvas.height / 2 - lineHeight / 2);
        indicationContext.fillText(secondLine, indicationCanvas.width / 2, indicationCanvas.height / 2 + lineHeight / 2);
      }
      
      // 创建适应症纹理
      const indicationTexture = new THREE.CanvasTexture(indicationCanvas)
      
      // 创建适应症标签材质
      const indicationLabelMaterial = new THREE.SpriteMaterial({
        map: indicationTexture,
        transparent: true,
        depthTest: false,
        opacity: 0.9
      })
      
      // 创建适应症标签精灵
      const indicationLabel = new THREE.Sprite(indicationLabelMaterial)
      indicationLabel.position.set(x, phaseY - 2.0, z)
      indicationLabel.scale.set(4, 1.2, 1)
      
      // 添加动画效果
      animateDrugNode(drugNode, glowNode)
      
      phaseGroup.add(drugNode)
      phaseGroup.add(glowNode)
      phaseGroup.add(nameLabel)
      phaseGroup.add(indicationLabel)
    })
    
    drugsGroup.add(phaseGroup)
  })
  
  dnaGroup.add(drugsGroup)
}

// 动画药物节点
const animateDrugNode = (node, glow) => {
  const originalY = node.position.y
  
  const animate = () => {
    const time = Date.now() * 0.001
    node.position.y = originalY + Math.sin(time * 2) * 0.2
    glow.position.y = originalY + Math.sin(time * 2) * 0.2
    glow.scale.x = 1 + Math.sin(time * 3) * 0.1
    glow.scale.y = 1 + Math.sin(time * 3) * 0.1
    glow.scale.z = 1 + Math.sin(time * 3) * 0.1
    node.rotation.y += 0.01
    requestAnimationFrame(animate)
  }
  
  animate()
}

// 渲染循环
const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  // 旋转DNA结构（减慢旋转速度）
  if (dnaGroup) {
    dnaGroup.rotation.y += 0.002 // 从0.005减慢到0.002
  }
  
  renderer.render(scene, camera)
}

// 窗口大小调整
const onWindowResize = () => {
  if (!camera || !renderer || !threeContainer.value) return
  
  const containerWidth = threeContainer.value.clientWidth
  const containerHeight = threeContainer.value.clientHeight
  
  camera.aspect = containerWidth / containerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(containerWidth, containerHeight)
}

// 数据加载完成后发送动画完成事件
watch(drugTimelineData, () => {
  if (drugTimelineData.value.length > 0 && !animationCompleted.value) {
    // 使用nextTick确保DOM更新完成
    nextTick(() => {
      // 初始化3D场景
      initThreeJS()
      
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
  <!-- 创新药DNA双螺旋展示 -->
  <div class="drug-dna-container" v-if="drugTimelineData.length > 0">
    <!-- 3D容器 -->
    <div ref="threeContainer" class="three-container"></div>
    
    <!-- 药物信息面板 -->
    <div v-if="selectedDrug" class="drug-info-panel">
      <div class="drug-info-header">
        <h3>药物详情</h3>
        <button class="close-btn" @click="selectedDrug = null">×</button>
      </div>
      <div class="drug-info-content">
        <p><strong>药物名称:</strong> {{ selectedDrug.name }}</p>
        <p><strong>适应症:</strong> {{ selectedDrug.indication }}</p>
        <p><strong>研发阶段:</strong> {{ phaseConfig[selectedDrug.phase]?.name }}</p>
        <p><strong>研发进度:</strong> {{ selectedDrug.progress }}%</p>
      </div>
    </div>
    
    <!-- 阶段信息面板 -->
    <!-- <div class="phase-info-panel">
      <div 
        v-for="(phaseData, index) in drugTimelineData" 
        :key="phaseData.phase"
        class="phase-info-item"
        :style="{ borderLeftColor: phaseData.color }"
      >
        <div class="phase-header">
          <div 
            class="phase-dot"
            :style="{ backgroundColor: phaseData.color }"
          ></div>
          <h4 class="phase-name">{{ phaseData.phaseName }}</h4>
        </div>
        <p class="phase-count">{{ phaseData.count }}个创新药</p>
        <div class="phase-drugs">
          <div 
            v-for="drug in phaseData.drugs" 
            :key="drug.id"
            class="drug-item"
          >
            <div class="drug-name">{{ drug.name }}</div>
            <div class="drug-indication">适应症: {{ drug.indication }}</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
/* 创新药DNA容器 */
.drug-dna-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

/* 3D容器 */
.three-container {
  flex: 1;
  height: 100%;
  min-height: 400px;
}

/* 药物信息面板 */
.drug-info-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 300px;
  background: rgba(10, 15, 30, 0.9);
  border: 1px solid rgba(72, 209, 204, 0.5);
  border-radius: 8px;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.drug-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(72, 209, 204, 0.3);
  padding-bottom: 10px;
}

.drug-info-header h3 {
  color: #00ff88;
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #ff4d4d;
}

.drug-info-content p {
  margin: 10px 0;
  color: #ffffff;
  font-size: 14px;
}

.drug-info-content strong {
  color: #00ff88;
}

/* 阶段信息面板 */
.phase-info-panel {
  width: 300px;
  height: 100%;
  background: rgba(10, 15, 30, 0.8);
  border-left: 1px solid rgba(72, 209, 204, 0.3);
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
}

.phase-info-item {
  margin-bottom: 20px;
  padding: 10px;
  border-left: 3px solid;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 0 8px 8px 0;
}

.phase-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.phase-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
}

.phase-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.phase-count {
  font-size: 12px;
  color: #a0a0a0;
  margin: 0 0 10px 0;
}

.phase-drugs {
  max-height: 150px;
  overflow-y: auto;
}

.drug-item {
  padding: 8px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.drug-item:hover {
  background: rgba(72, 209, 204, 0.2);
  transform: translateX(3px);
}

.drug-name {
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 3px;
}

.drug-indication {
  font-size: 10px;
  color: #a0a0a0;
}

/* 滚动条样式 */
.phase-info-panel::-webkit-scrollbar,
.phase-drugs::-webkit-scrollbar {
  width: 4px;
}

.phase-info-panel::-webkit-scrollbar-track,
.phase-drugs::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.phase-info-panel::-webkit-scrollbar-thumb,
.phase-drugs::-webkit-scrollbar-thumb {
  background: rgba(72, 209, 204, 0.5);
  border-radius: 2px;
}

.phase-info-panel::-webkit-scrollbar-thumb:hover,
.phase-drugs::-webkit-scrollbar-thumb:hover {
  background: rgba(72, 209, 204, 0.8);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .drug-dna-container {
    flex-direction: column;
  }
  
  .three-container {
    height: 70%;
    min-height: 300px;
  }
  
  .phase-info-panel {
    width: 100%;
    height: 30%;
  }
}

@media (max-width: 768px) {
  .phase-info-panel {
    width: 100%;
  }
  
  .phase-info-item {
    padding: 8px;
  }
  
  .phase-name {
    font-size: 14px;
  }
  
  .drug-name {
    font-size: 11px;
  }
  
  .drug-indication {
    font-size: 9px;
  }
  
  .drug-info-panel {
    width: calc(100% - 40px);
  }
}
</style>