<template>
  <div class="talent-3d-container" ref="containerRef">
    <div class="talent-card-list" ref="cardListRef">
      <div 
        v-for="(talent, index) in talentData" 
        :key="`talent-${index}`"
        class="talent-card"
      >
        <div class="card-content">
          <div class="talent-info">
              <img
                  :src="talent.avatar || avatar"
                  alt="头像"
                  class="avatar"
              />
            <h3 class="talent-name">{{ talent.name }}</h3>
            <p class="position">{{ formatText(talent.position, 15) }}</p>
            <p class="field">{{ formatText(talent.development, 15) }}</p>
          </div>
        </div>
      </div>
    </div>

 <!-- 弹出详细信息浮层 -->
<div v-if="selectedTalent" class="popup-overlay" @click="selectedTalent = null">
  <div class="talent-popup" @click.stop>
    <div class="popup-content">
      <button class="close-btn" @click="selectedTalent = null">×</button>

      <!-- 头像 + 姓名 -->
      <div class="header">
        <img 
          :src="selectedTalent.avatar || avatar" 
          alt="头像" 
          class="avatar"
        />
        <div class="basic-info">
          <h2 class="name">{{ selectedTalent.name }}</h2>
          <p class="position">{{ selectedTalent.position }}</p>
          <p class="field">{{ selectedTalent.development }}</p>
        </div>
      </div>

      <!-- 荣誉 -->
      <div class="section" v-if="selectedTalent.honor">
        <h3>🏅 个人荣誉</h3>
        <p>{{ selectedTalent.honor }}</p>
      </div>

      <!-- 经历 / 成果 -->
      <div class="section" v-if="selectedTalent.experience">
        <h3>📖 经历 / 成果</h3>
        <p>{{ selectedTalent.experience }}</p>
      </div>

      <!-- 备注 -->
      <div class="section remark" v-if="selectedTalent.remark">
        <h3>📌 备注</h3>
        <p>{{ selectedTalent.remark }}</p>
      </div>
    </div>
  </div>
</div>


  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import TWEEN from '@tweenjs/tween.js'
import gsap from 'gsap'
import avatar from "@/assets/images/talentEngine/avatar.png"

const emit = defineEmits(['animationComplete'])

const props = defineProps({
  talentData: { type: Array, default: () => [] }
})

const containerRef = ref(null)
const cardListRef = ref(null)
const selectedTalent = ref(null)

let scene, camera, renderer, controls
let objects = []       // CSS3DObject
let clickables = []    // { mesh: THREE.Mesh, index: number }
let isAnimationStarted = false

const formatText = (text, maxLength) => text && text.length > maxLength ? text.slice(0, maxLength) + '...' : text

// 页面加载完成后启动动画
function handlePageLoadComplete() {
  // 页面加载完成后启动动画
  nextTick(() => {
    if (!isAnimationStarted) {
      init3DScene()
      isAnimationStarted = true
    }
  })
}

// 初始化 3D 场景
const init3DScene = () => {
  if (!containerRef.value) return
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000) // 增加视角范围
  camera.position.set(0, 0, 1200) // 拉近相机距离

  renderer = new CSS3DRenderer()
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 0.5
  controls.zoomSpeed = 1.2
  controls.panSpeed = 0.8
  controls.minDistance = 600  // 减小最小距离
  controls.maxDistance = 2500 // 减小最大距离
  controls.staticMoving = true
  controls.addEventListener('change', render)

  initTalentObjects()
  render()
  animate()

  window.addEventListener('click', onMouseClick)
}

// 初始化卡片对象 + 点击 Mesh
const initTalentObjects = () => {
  if (!cardListRef.value) return
  objects.forEach(obj => scene.remove(obj))
  clickables.forEach(c => scene.remove(c.mesh))
  objects = []
  clickables = []

  const cards = cardListRef.value.querySelectorAll('.talent-card')
  const numObjects = cards.length
  const sphereRadius = 420 // 减小球体半径
  const origin = new THREE.Vector3(0, 0, 0)

  // 先隐藏所有卡片
  cards.forEach((card) => {
    card.style.opacity = 0
  })

  cards.forEach((card, i) => {
    card.style.transform = 'rotateY(180deg)'
    const object3D = new CSS3DObject(card)

    // 初始位置设为场景中心
    object3D.position.set(0, 0, 0)
    object3D.lookAt(origin)

    scene.add(object3D)
    objects.push(object3D)

    const geometry = new THREE.BoxGeometry(160, 180, 10)
    const material = new THREE.MeshBasicMaterial({ visible: false })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)
    clickables.push({ mesh, index: i })
  })
  
  // 添加延迟，确保DOM已经渲染，然后开始动画
  setTimeout(() => {
    animateToSphere()
  }, 100)
}

// 布局球状 + 缓动
const arrangeSphere = () => {
  const origin = new THREE.Vector3(0, 0, 0)
  const sphereRadius = 420 // 保持与初始化一致的球体半径
  const numObjects = objects.length

  objects.forEach((obj, i) => {
    // 使用斐波那契螺旋算法实现球面均匀分布
    const phi = Math.acos(1 - 2 * (i + 0.5) / numObjects)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    
    const x = sphereRadius * Math.sin(phi) * Math.cos(theta)
    const y = sphereRadius * Math.cos(phi)
    const z = sphereRadius * Math.sin(phi) * Math.sin(theta)

    new TWEEN.Tween(obj.position)
      .to({ x, y, z }, 1500)
      .easing(TWEEN.Easing.Cubic.Out)
      .start()

    obj.lookAt(origin)
    clickables[i].mesh.position.set(x, y, z)
  })
}

// 使用GSAP实现从中心到球形分布的动画
const animateToSphere = () => {
  const sphereRadius = 420
  const numObjects = objects.length
  
  objects.forEach((obj, i) => {
    // 使用斐波那契螺旋算法实现球面均匀分布
    const phi = Math.acos(1 - 2 * (i + 0.5) / numObjects)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    
    const x = sphereRadius * Math.sin(phi) * Math.cos(theta)
    const y = sphereRadius * Math.cos(phi)
    const z = sphereRadius * Math.sin(phi) * Math.sin(theta)
    
    // 在动画开始时显示卡片
    obj.element.style.opacity = 1
    
    // 使用GSAP创建动画
    gsap.to(obj.position, {
      x: x,
      y: y,
      z: z,
      duration: 1.5,
      ease: "back.out(1.5)",
      delay: i * 0.02, // 添加延迟，实现逐个出现的效果
      onComplete: () => {
        // 当最后一个元素动画完成时，发送animationComplete事件
        if (i === numObjects - 1) {
          emit('animationComplete')
        }
      }
    })
    
    // 更新点击区域的位置
    clickables[i].mesh.position.set(x, y, z)
  })
}

// 点击事件
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const onMouseClick = (event) => {
  if (!renderer) return
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(clickables.map(c => c.mesh))
  if (intersects.length > 0) {
    const clicked = clickables.find(c => c.mesh === intersects[0].object)
    selectedTalent.value = props.talentData[clicked.index]
  }
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)
  TWEEN.update()
  controls.update()
  if (scene) scene.rotation.y += 0.002 // 稍微加快旋转速度以展示球状效果
  objects.forEach(obj => obj.lookAt(camera.position))
  render()
}

const render = () => renderer.render(scene, camera)

const onWindowResize = () => {
  if (!containerRef.value) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  render()
}

onMounted(() => {
  // 根据3D组件动画控制规范，动画应通过handlePageLoadComplete方法触发
  // 不再在组件挂载时自动初始化场景
  window.addEventListener('resize', onWindowResize)
})

// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('click', onMouseClick)
  if (controls) controls.dispose()
  if (renderer) renderer.domElement.remove()
})

watch(() => props.talentData, (newData) => {
  if (newData && newData.length && scene && isAnimationStarted) {
    nextTick(() => {
      setTimeout(() => {
        initTalentObjects()
      }, 100)
    })
  }
}, { deep: true, immediate: true })

// 暴露方法给父组件调用
defineExpose({
  handlePageLoadComplete
})
</script>


<style scoped lang="scss">
/* 容器样式 */
.talent-3d-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(48, 220, 255, 0.15) 0%, rgba(48, 220, 255, 0.05) 40%, transparent 70%);
}

/* 卡片列表 */
.talent-card-list {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 禁止卡片 DOM 捕获鼠标事件 */
}

/* 单个卡片 */
.talent-card {
  width: 120px;
  height: 140px;
  padding: 5px;
  border-radius: 12px;
  border: 2px solid rgba(48, 220, 255, 0.6);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;

  .card-content {
    text-align: center;
  }

  .talent-info {
      .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(48,220,255,0.7);
          box-shadow: 0 0 10px rgba(48,220,255,0.6);
      }
    .talent-name {
      font-size: 18px;
      font-weight: bold;
      color: #30DCFF;
      text-shadow: 0 0 6px rgba(48,220,255,0.5);
    }
    .position,
    .field {
      font-size: 13px;
      color: rgba(255,255,255,0.8);
      margin: 10px 0 0;
    }
  }

  &:hover {
    transform: scale(1.1) rotateY(180deg);
    box-shadow: 0 0 20px rgba(48,220,255,0.8);
  }
}

/* 遮罩层 */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 19;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto; /* 避免点击穿透 */
}

/* 弹窗主体 */
.talent-popup {
  position: relative;  /* 相对 overlay 居中 */
  z-index: 20;
  pointer-events: auto;
  background: linear-gradient(145deg, rgba(20,20,30,0.95), rgba(40,40,60,0.95));
  padding: 25px 20px;
  border-radius: 16px;
  width: 420px;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(48,220,255,0.8);
  border: 1px solid rgba(48,220,255,0.4);
  animation: fadeInScale 0.3s ease forwards;

  .popup-content {
    position: relative;

    .close-btn {
      position: absolute;
      top: -18px;
      right: -18px;
      background: #30DCFF;
      border: none;
      border-radius: 50%;
      color: #000;
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
      width: 44px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      box-shadow: 0 0 15px rgba(48,220,255,0.8);
      transition: all 0.2s ease;

      &:hover {
        background: #1aaed9;
        transform: scale(1.1);
      }
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(48,220,255,0.7);
        box-shadow: 0 0 10px rgba(48,220,255,0.6);
      }

      .basic-info {
        margin-left: 15px;

        .name {
          font-size: 22px;
          font-weight: bold;
          color: #30DCFF;
          text-shadow: 0 0 6px rgba(48,220,255,0.6);
        }

        .position {
          font-size: 16px;
          color: #fff;
        }

        .field {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
        }
      }
    }

    .section {
      margin-bottom: 12px;

      h3 {
        font-size: 16px;
        color: #30DCFF;
        margin-bottom: 6px;
      }

      p {
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255,255,255,0.9);
      }
    }
  }
}

/* 弹出动画 */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .talent-card {
    width: 100px;
    height: 120px;
  }
  .talent-popup {
    width: 280px;
  }
}
</style>