<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const emit = defineEmits(['animationComplete'])

const containerRef = ref(null)
const canvasRef = ref(null)

let scene, camera, renderer, labelRenderer, animationId
let moleculeGroup, atomsGroup, bondsGroup
let atoms = [], bonds = []

// -------------------- 分子数据 --------------------
const moleculeData = ref({
  atoms: [
    { id: 'rd_core', position: [0, 0, 0], element: 'R&D', symbol: 'C', radius: 1.0, color: '#30DCFF' },          // 核心
    { id: 'platform_lab', position: [-2, 1, 0], element: 'LAB', symbol: 'N', radius: 0.5, color: '#00FF88' },   // 平台
    { id: 'platform_inst', position: [2, -1, 0], element: 'INST', symbol: 'N', radius: 0.5, color: '#00FF88' }, // 平台
    { id: 'platform_base', position: [0, 2, 0], element: 'BASE', symbol: 'N', radius: 0.45, color: '#00FF88' }, // 平台
    { id: 'tech_bio', position: [3, 2, 0], element: 'BIO', symbol: 'S', radius: 0.4, color: '#8B5CF6' },       // 技术
    { id: 'tech_device', position: [-3, -2, 0], element: 'DEV', symbol: 'S', radius: 0.4, color: '#8B5CF6' },  // 技术
    { id: 'tech_digital', position: [0, -3, 0], element: 'DIG', symbol: 'S', radius: 0.4, color: '#8B5CF6' },  // 技术
    { id: 'drug_new', position: [-4, 2.5, 0], element: 'DRUG', symbol: 'Au', radius: 0.55, color: '#FFD700' },  // 新药
    { id: 'drug_trial', position: [4, -2.5, 0], element: 'TRIAL', symbol: 'Au', radius: 0.5, color: '#FFD700' },// 新药
    { id: 'device_class2', position: [4.5, 0.5, 0], element: 'MED2', symbol: 'Fe', radius: 0.5, color: '#FF6B6B' }, // 医疗器械
    { id: 'device_class3', position: [-4.5, -0.5, 0], element: 'MED3', symbol: 'Fe', radius: 0.5, color: '#FF6B6B' },// 医疗器械
    { id: 'shared_equip', position: [-5, 0, 0], element: 'SHARE', symbol: 'K', radius: 0.35, color: '#4ECDC4' },  // 支撑设施
    { id: 'funding', position: [5, 0, 0], element: 'FUND', symbol: 'F', radius: 0.35, color: '#FF9500' },        // 资金
    { id: 'electron1', position: [-6, 1.5, -2], element: 'e⁻', symbol: 'e', radius: 0.2, color: '#30DCFF' },
    { id: 'electron2', position: [6, -1.5, 2], element: 'e⁻', symbol: 'e', radius: 0.2, color: '#00FF88' },
    { id: 'electron3', position: [-1.5, 6, -2.5], element: 'e⁻', symbol: 'e', radius: 0.2, color: '#8B5CF6' },
    { id: 'electron4', position: [1.5, 1.5, 5], element: 'e⁻', symbol: 'e', radius: 0.2, color: '#FFD700' }
  ],
  bonds: [
    { from: 'rd_core', to: 'platform_lab', strength: 1.5, type: 'single' },
    { from: 'rd_core', to: 'platform_inst', strength: 1.4, type: 'single' },
    { from: 'rd_core', to: 'platform_base', strength: 1.3, type: 'single' },
    { from: 'platform_lab', to: 'tech_bio', strength: 1.2, type: 'double' },
    { from: 'platform_inst', to: 'tech_device', strength: 1.3, type: 'double' },
    { from: 'platform_inst', to: 'tech_digital', strength: 1.1, type: 'single' },
    { from: 'platform_base', to: 'shared_equip', strength: 0.9, type: 'single' },
    { from: 'tech_bio', to: 'drug_new', strength: 1.4, type: 'triple' },
    { from: 'tech_bio', to: 'drug_trial', strength: 1.2, type: 'double' },
    { from: 'tech_device', to: 'device_class2', strength: 1.3, type: 'double' },
    { from: 'tech_device', to: 'device_class3', strength: 1.5, type: 'triple' },
    { from: 'tech_digital', to: 'device_class2', strength: 1.0, type: 'single' },
    { from: 'funding', to: 'drug_new', strength: 1.0, type: 'single' },
    { from: 'funding', to: 'device_class3', strength: 1.0, type: 'single' },
    { from: 'shared_equip', to: 'device_class2', strength: 0.7, type: 'single' }
  ]
})

// -------------------- 入场动画参数 --------------------
let animationPhase = 'intro'
let introStart = Date.now()
const camTarget = new THREE.Vector3(0, 0, 0)
const camRadiusStart = 25
const camRadiusEnd = 12
const camHeightStart = 12
const camHeightEnd = 5

// 缓动函数
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// -------------------- 初始化 --------------------
const initThreeJS = () => {
  if (!containerRef.value) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, camHeightStart, camRadiusStart)
  camera.lookAt(camTarget)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.value })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(width, height)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  labelRenderer.domElement.style.pointerEvents = 'none'
  containerRef.value.appendChild(labelRenderer.domElement)

  moleculeGroup = new THREE.Group()
  atomsGroup = new THREE.Group()
  bondsGroup = new THREE.Group()
  moleculeGroup.add(atomsGroup)
  moleculeGroup.add(bondsGroup)
  scene.add(moleculeGroup)

  setupLights()
  createMolecule()
  animate()
}

// -------------------- 灯光 --------------------
const setupLights = () => {
  scene.add(new THREE.AmbientLight(0x404060, 0.6))
  const mainLight = new THREE.DirectionalLight(0x30DCFF, 3)
  mainLight.position.set(10, 15, 8)
  scene.add(mainLight)
  scene.add(new THREE.PointLight(0x30DCFF, 2, 25))
  scene.add(new THREE.PointLight(0x00FF88, 1.8, 20))
  scene.add(new THREE.PointLight(0xFFD700, 1.5, 18))
}

// -------------------- 创建分子 --------------------
const createMolecule = () => {
  createAtoms()
  createBonds()
  initElectrons()
}

const createAtoms = () => {
  moleculeData.value.atoms.forEach(atomData => {
    // 放大原子尺寸以增强视觉效果
    const scaledRadius = atomData.radius * 1.3
    const geometry = new THREE.SphereGeometry(scaledRadius, 64, 32)
    const material = new THREE.MeshPhysicalMaterial({
      color: atomData.color, emissive: atomData.color, emissiveIntensity: 0.4,
      roughness: 0.2, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1,
      transparent: true, opacity: 0.0 // 入场时透明
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...atomData.position)

    const innerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(scaledRadius * 1.2, 32, 16),
      new THREE.MeshBasicMaterial({ color: atomData.color, transparent: true, opacity: 0.0, side: THREE.BackSide })
    )
    const outerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(scaledRadius * 1.6, 16, 8),
      new THREE.MeshBasicMaterial({ color: atomData.color, transparent: true, opacity: 0.0, side: THREE.BackSide })
    )
    mesh.add(innerGlow)
    mesh.add(outerGlow)

    const labelDiv = document.createElement('div')
    labelDiv.className = 'atom-label'
    labelDiv.textContent = atomData.symbol
    labelDiv.style.cssText = `color:${atomData.color}; font-size:${Math.max(14, scaledRadius * 10)}px; font-weight:bold; text-align:center; text-shadow:0 0 10px ${atomData.color};`
    const label = new CSS2DObject(labelDiv)
    label.position.set(0, 0, 0)
    mesh.add(label)

    atoms.push({ mesh, data: atomData, userData: mesh.userData })
    atomsGroup.add(mesh)
  })
}

const createBonds = () => {
  moleculeData.value.bonds.forEach(bondData => {
    const fromAtom = atoms.find(a => a.data.id === bondData.from)
    const toAtom = atoms.find(a => a.data.id === bondData.to)
    if (!fromAtom || !toAtom) return
    const from = fromAtom.mesh.position
    const to = toAtom.mesh.position
    const dir = new THREE.Vector3().subVectors(to, from)
    const length = dir.length()
    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
    dir.normalize()
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    const count = bondData.type === 'double' ? 2 : bondData.type === 'triple' ? 3 : 1
    const baseRadius = 0.04 * bondData.strength
    const group = new THREE.Group()
    for (let i = 0; i < count; i++) {
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(baseRadius, baseRadius, length, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 })
      )
      cyl.position.copy(mid)
      cyl.quaternion.copy(quaternion)
      group.add(cyl)
    }
    bonds.push({ mesh: group, data: bondData })
    bondsGroup.add(group)
  })
}

const initElectrons = () => {
  atoms.forEach(atom => {
    if (atom.data.element === 'e⁻') {
      atom.userData.orbitRadius = 2 + Math.random() * 1.5
      atom.userData.speedOffset = 0.2 + Math.random() * 0.2
      atom.userData.verticalOffset = Math.random() * 0.3 - 0.15
      atom.userData.angle = Math.random() * Math.PI * 2
    }
  })
}

// -------------------- 动画 --------------------
const animate = () => {
  animationId = requestAnimationFrame(animate)
  const elapsed = (Date.now() - introStart) / 1000

  // 入场阶段
  if (animationPhase === 'intro') {
    const tRaw = Math.min(elapsed / 4, 1)  // 从7秒优化到4秒
    const t = easeInOutCubic(tRaw)

    // 相机轨迹
    const radius = camRadiusStart + (camRadiusEnd - camRadiusStart) * t
    const height = camHeightStart + (camHeightEnd - camHeightStart) * t
    let angle = Math.PI * 0.5 * t
    if (elapsed > 2.5) {  // 从5.5调整到2.5
      const adjustT = (elapsed - 2.5) / 1.5
      const targetAngle = Math.PI / 4
      angle = angle + (targetAngle - angle) * easeInOutCubic(adjustT)
    }
    camera.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
    camera.lookAt(camTarget)

    // 元素淡入
    atoms.forEach(atom => {
      atom.mesh.material.opacity = t
      atom.mesh.children[0].material.opacity = 0.3 * t
      atom.mesh.children[1].material.opacity = 0.2 * t
    })
    bonds.forEach(bond => {
      bond.mesh.children.forEach(c => c.material.opacity = 0.6 * t)
    })

    // 电子轨道展开
    atoms.forEach(atom => {
      if (atom.data.element === 'e⁻') {
        const tt = t
        const r = atom.userData.orbitRadius * tt
        const vOffset = atom.userData.verticalOffset * tt
        atom.userData.angle += atom.userData.speedOffset * 0.01
        const base = new THREE.Vector3(...atom.data.position)
        atom.mesh.position.set(
          base.x + Math.cos(atom.userData.angle) * r,
          base.y + Math.sin(atom.userData.angle * 0.5) * vOffset,
          base.z + Math.sin(atom.userData.angle) * r
        )
      }
    })

    if (elapsed >= 4) {
      animationPhase = 'normal'  // 从7秒优化到4秒
      // 向父组件发送动画完成事件
      console.log('3D分子结构动画完成，向父组件发送完成事件')
      emit('animationComplete')
    }
  }
  // 常规阶段
  else {
    moleculeGroup.rotation.y += 0.001
    atoms.forEach((atom, i) => {
      const mesh = atom.mesh
      mesh.rotation.y += 0.005 + i * 0.0005
      mesh.rotation.x += 0.002
      const time = Date.now() * 0.001
      const breathe = 1 + Math.sin(time * 1.5 + i * 0.3) * 0.1
      if (mesh.children[0]) mesh.children[0].scale.setScalar(breathe)
      if (mesh.children[1]) mesh.children[1].scale.setScalar(breathe * 1.2)
      if (atom.data.element === 'e⁻') {
        atom.userData.angle += atom.userData.speedOffset * 0.01
        const base = new THREE.Vector3(...atom.data.position)
        atom.mesh.position.set(
          base.x + Math.cos(atom.userData.angle) * atom.userData.orbitRadius,
          base.y + Math.sin(atom.userData.angle * 0.5) * atom.userData.verticalOffset,
          base.z + Math.sin(atom.userData.angle) * atom.userData.orbitRadius
        )
      }
    })
  }

  renderer.render(scene, camera)
  labelRenderer.render(scene, camera)
}

// -------------------- 生命周期 --------------------
onMounted(() => { window.addEventListener('resize', onResize) })
onBeforeUnmount(() => { cancelAnimationFrame(animationId); window.removeEventListener('resize', onResize) })

const onResize = () => {
  if (!containerRef.value) return
  const w = containerRef.value.clientWidth, h = containerRef.value.clientHeight
  camera.aspect = w / h; camera.updateProjectionMatrix()
  renderer.setSize(w, h); labelRenderer.setSize(w, h)
}

function handlePageLoadComplete() {
  nextTick(() => initThreeJS())
}

defineExpose({
    handlePageLoadComplete
})
</script>

<template>
  <div ref="containerRef" style="width:100%;height:100%;position:relative">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.atom-label {
  pointer-events: none;
  user-select: none;
}
</style>
