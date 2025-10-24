<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from "vue";
import mCard from "@/components/mCard/index.vue"
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { listDictData } from "@/api/system";
import { listEnterpriseAll } from "@/api/brain";
import * as THREE from 'three';

// 注册DrawSVGPlugin插件
gsap.registerPlugin(DrawSVGPlugin);

const emit = defineEmits(['starClick', 'animationComplete'])

const enterpriseTypes = ref([])
const isAnimationPlayed = ref(false) // 添加动画执行状态标志
const flowerContainer = ref(null) // Three.js 容器引用

// Three.js 相关变量
let scene, camera, renderer, flowers = [];

// 控制弹窗显示的状态
const showEnterpriseDialog = ref(false)
// 当前选中的企业信息
const enterprise = ref(null)

// 定义每个类型的颜色配置 - 更丰富的色彩层次
const typeColors = [
  {
    primary: 'rgba(34, 197, 94, 0.9)',   // 绿色
    secondary: 'rgba(22, 163, 74, 0.7)',
    tertiary: 'rgba(21, 128, 61, 0.5)',
    light: '#D1FAE5',
    enterprise: 'rgba(74, 222, 128, 0.9)',
    gradient: ['#22c55e', '#16a34a', '#15803d'], // 渐变色组
    accent: '#84cc16', // 强调色
    glow: '#4ade80' // 发光色
  },
  {
    primary: 'rgba(59, 130, 246, 0.9)',   // 蓝色
    secondary: 'rgba(37, 99, 235, 0.7)',
    tertiary: 'rgba(29, 78, 216, 0.5)',
    light: '#DBEAFE',
    enterprise: 'rgba(96, 165, 250, 0.9)',
    gradient: ['#3b82f6', '#2563eb', '#1d4ed8'],
    accent: '#06b6d4',
    glow: '#60a5fa'
  },
  {
    primary: 'rgba(168, 85, 247, 0.9)',   // 紫色
    secondary: 'rgba(147, 51, 234, 0.7)',
    tertiary: 'rgba(126, 34, 206, 0.5)',
    light: '#EDE9FE',
    enterprise: 'rgba(196, 181, 253, 0.9)',
    gradient: ['#a855f7', '#9333ea', '#7e22ce'],
    accent: '#d946ef',
    glow: '#c084fc'
  },
  {
    primary: 'rgba(245, 158, 11, 0.9)',   // 橙色
    secondary: 'rgba(217, 119, 6, 0.7)',
    tertiary: 'rgba(180, 83, 9, 0.5)',
    light: '#FEF3C7',
    enterprise: 'rgba(251, 191, 36, 0.9)',
    gradient: ['#f59e0b', '#d97706', '#b45309'],
    accent: '#f97316',
    glow: '#fbbf24'
  },
  {
    primary: 'rgba(239, 68, 68, 0.9)',    // 红色
    secondary: 'rgba(220, 38, 38, 0.7)',
    tertiary: 'rgba(185, 28, 28, 0.5)',
    light: '#FEE2E2',
    enterprise: 'rgba(248, 113, 113, 0.9)',
    gradient: ['#ef4444', '#dc2626', '#b91c1c'],
    accent: '#f43f5e',
    glow: '#f87171'
  },
  {
    primary: 'rgba(16, 185, 129, 0.9)',   // 青色
    secondary: 'rgba(5, 150, 105, 0.7)',
    tertiary: 'rgba(4, 120, 87, 0.5)',
    light: '#D1FAE5',
    enterprise: 'rgba(52, 211, 153, 0.9)',
    gradient: ['#10b981', '#059669', '#047857'],
    accent: '#14b8a6',
    glow: '#34d399'
  },
  {
    primary: 'rgba(236, 72, 153, 0.9)',   // 粉色
    secondary: 'rgba(219, 39, 119, 0.7)',
    tertiary: 'rgba(190, 24, 93, 0.5)',
    light: '#FCE7F3',
    enterprise: 'rgba(244, 114, 182, 0.9)',
    gradient: ['#ec4899', '#db2777', '#be185d'],
    accent: '#f472b6',
    glow: '#f4b6cd'
  }
];

// 初始化企业类型和企业数据
const initEnterpriseData = async () => {
  try {
    const response = await listDictData('brain_enterprise_type')
    console.log(response)

    const typePositions = [
      { x: 20, y: 15 },
      { x: 80, y: 15 },
      { x: 50, y: 40 },
      { x: 10, y: 55 },
      { x: 90, y: 55 },
      { x: 30, y: 80 },
      { x: 70, y: 80 }
    ];

    const types = [];

    // 循环调用listEnterpriseAll获取所有企业数据
    for (let i = 0; i < response.data.length; i++) {
      const item = response.data[i];
      try {
        const enterpriseResponse = await listEnterpriseAll({ type: item.dictValue })
        enterpriseGroupByType.value[item.dictValue] = enterpriseResponse

        // 计算企业围绕类型圆的位置
        const enterprises = enterpriseResponse.map((enterprise, index) => {
          const angle = (index / enterpriseResponse.length) * 2 * Math.PI;
          // 根据企业数量动态调整围绕半径
          const baseRadius = 100; // 基础半径
          const maxRadius = 120; // 最大半径
          const minRadius = 90; // 最小半径
          const enterpriseCount = enterpriseResponse.length;

          let radius;
          if (enterpriseCount <= 3) {
            radius = minRadius; // 企业数量少时距离近
          } else if (enterpriseCount <= 6) {
            radius = baseRadius + (enterpriseCount - 3) * 10; // 渐进增加
          } else {
            radius = maxRadius; // 企业数量多时距离远
          }

          const centerX = 0; // 相对于类型圆中心的偏移
          const centerY = 0;
          return {
            ...enterprise,
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            delay: index * 0.1
          };
        });

        types.push({
          id: item.id,
          type: item.dictValue,
          name: item.dictLabel,
          x: typePositions[i]?.x || 50,
          y: typePositions[i]?.y || 50,
          enterprises: enterprises,
          delay: i * 0.2
        });

        console.log(`获取${item.dictLabel}企业数据:`, enterpriseResponse)
      } catch (enterpriseError) {
        console.error(`获取${item.dictLabel}企业数据失败:`, enterpriseError)
        enterpriseGroupByType.value[item.dictValue] = []

        types.push({
          id: item.id,
          type: item.dictValue,
          name: item.dictLabel,
          x: typePositions[i]?.x || 50,
          y: typePositions[i]?.y || 50,
          enterprises: [],
          delay: i * 0.2
        });
      }
    }

    enterpriseTypes.value = types;
    console.log('所有企业数据按类型分组:', enterpriseGroupByType.value)
    console.log('企业类型布局数据:', enterpriseTypes.value)
  } catch (error) {
    console.error('获取企业类别数据失败:', error)
    // 可以根据需要添加更多错误处理逻辑，比如显示错误提示或使用默认值
  }
};

onMounted(async () => {
  await initEnterpriseData();
  await nextTick();
  // 确保DOM已更新后再初始化Three.js
  // 使用更可靠的检查确保容器元素存在
  const checkAndInit = () => {
    if (flowerContainer.value) {
      // 使用 nextTick 确保 DOM 完全更新
      nextTick(() => {
        initThreeJS();
      });
    } else {
      // 如果容器还未准备好，稍后重试
      setTimeout(checkAndInit, 100);
    }
  };
  checkAndInit();
});

let animationTimeline = null;

// 初始化 Three.js
function initThreeJS() {
  // 确保容器元素存在
  if (!flowerContainer.value) {
    console.error('flowerContainer is not available');
    // 延迟重试
    setTimeout(() => {
      if (flowerContainer.value) {
        initThreeJS();
      }
    }, 100);
    return;
  }

  // 创建场景
  scene = new THREE.Scene();

  // 创建相机 - 调整视野角度和位置以容纳所有节点
  camera = new THREE.PerspectiveCamera(55, flowerContainer.value.offsetWidth / flowerContainer.value.offsetHeight, 0.1, 1000);
  camera.position.set(0, 0, 16); // 减小距离以获得更紧凑的视角
  camera.lookAt(0, 0, 0); // 确保相机看向场景中心

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(flowerContainer.value.offsetWidth, flowerContainer.value.offsetHeight);
  renderer.setClearColor(0x000000, 0); // 透明背景

  // 确保容器元素存在后再添加渲染器
  if (flowerContainer.value) {
    flowerContainer.value.appendChild(renderer.domElement);

    // 重要：确保渲染器的DOM元素可交互
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.position = 'relative';
    renderer.domElement.style.zIndex = '10';

    // 确保容器有正确的样式
    flowerContainer.value.style.pointerEvents = 'auto';
    flowerContainer.value.style.position = 'relative';
    flowerContainer.value.style.zIndex = '10';
    
    // 初始时隐藏渲染器
    renderer.domElement.style.visibility = 'hidden';
  } else {
    console.error('flowerContainer is not available when appending renderer');
    return;
  }

  // 添加光照
  addLights();

  // 创建花朵
  createFlowers();

  // 添加鼠标交互
  // 延迟一帧确保渲染器DOM元素已正确添加
  requestAnimationFrame(() => {
    addMouseInteraction();
  });

  // 渲染循环
  animate();
}

// 创建花朵
function createFlowers() {
  flowers = [];

  // 确保enterpriseTypes.value存在且有数据
  if (!enterpriseTypes.value || !Array.isArray(enterpriseTypes.value)) {
    console.warn('enterpriseTypes is not available or not an array');
    return;
  }

  console.log('Creating flowers for enterprise types:', enterpriseTypes.value);

  enterpriseTypes.value.forEach((type, typeIndex) => {
    // 确保type对象存在
    if (!type) {
      console.warn('Skipping null type at index:', typeIndex);
      return;
    }

    console.log('Creating flower for type:', type);
    const flower = createFlower(type, typeIndex);
    console.log('Created flower:', flower);
    flowers.push(flower);

    // 确保scene和flower.group都存在
    if (scene && flower.group) {
      scene.add(flower.group);
    } else {
      console.warn('scene or flower.group is not available when adding to scene');
    }
  });

  console.log('All flowers created:', flowers);
}

// 创建单个企业集群（改为现代化的分子结构设计）
function createFlower(type, typeIndex) {
  const group = new THREE.Group();
  const color = typeColors[typeIndex % typeColors.length];

  // 确保type存在
  if (!type) {
    console.error('type is not available in createFlower');
    return { group, center: null, petals: [], type: null, typeIndex };
  }

  // 计算位置（基于原有布局转换为3D坐标）
  const x = (type.x - 50) * 0.15;
  const y = -(type.y - 50) * 0.15;
  const z = 0;

  group.position.set(x, y, z);

  // 创建中心核心球体（企业类型）- 更丰富的色彩效果
  // 保持大圆半径为0.85
  const centerGeometry = new THREE.SphereGeometry(0.85, 64, 64);

  // 主体材质 - 金属质感增强
  const centerMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color.primary.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',').replace(/\s/g, '')),
    emissive: new THREE.Color(color.glow),
    emissiveIntensity: 0.4,
    roughness: 0.05,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.92,
    envMapIntensity: 1.5
  });

  const center = new THREE.Mesh(centerGeometry, centerMaterial);
  // 更明确地设置userData
  center.userData = {
    type: 'center',
    data: type,
    typeIndex: typeIndex
  };

  console.log('Setting center userData:', center.userData);

  // 添加多层发光环 - 内层
  // 按新半径调整发光环尺寸
  const innerGlowGeometry = new THREE.SphereGeometry(0.92, 32, 32);
  const innerGlowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color.accent),
    transparent: true,
    opacity: 0.25,
    side: THREE.BackSide
  });
  const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
  center.add(innerGlow);

  // 添加多层发光环 - 中层
  const midGlowGeometry = new THREE.SphereGeometry(1.05, 32, 32);
  const midGlowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color.secondary.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',').replace(/\s/g, '')),
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
  });
  const midGlow = new THREE.Mesh(midGlowGeometry, midGlowMaterial);
  center.add(midGlow);

  // 添加多层发光环 - 外层
  const outerGlowGeometry = new THREE.SphereGeometry(1.2, 24, 24);
  const outerGlowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color.primary.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',').replace(/\s/g, '')),
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide
  });
  const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
  center.add(outerGlow);

  // 添加粒子效果球
  const particleSphereGeometry = new THREE.SphereGeometry(1.3, 8, 8);
  const particleSphereMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color.glow),
    transparent: true,
    opacity: 0.05,
    wireframe: true
  });
  const particleSphere = new THREE.Mesh(particleSphereGeometry, particleSphereMaterial);
  center.add(particleSphere);

  // 创建文字标签（企业类型名字）
  createTextLabel(type.name, center, color);

  group.add(center);

  // 创建企业节点（现代化的连接球体设计）
  const satellites = [];
  const enterpriseCount = type.enterprises ? type.enterprises.length : 0;

  // 确保type.enterprises存在
  if (type.enterprises && Array.isArray(type.enterprises)) {
    type.enterprises.forEach((enterprise, enterpriseIndex) => {
      // 确保enterprise对象存在
      if (!enterprise) return;

      const satellite = createModernSatellite(enterprise, enterpriseIndex, typeIndex, color, enterpriseCount);
      satellites.push(satellite);

      // 确保group和satellite.group都存在
      if (group && satellite.group) {
        group.add(satellite.group);
      } else {
        console.warn('group or satellite.group is not available when adding to group');
      }
    });
  }

  return { group, center, petals: satellites, type, typeIndex };
}

// 创建文字标签（企业类型名字）
function createTextLabel(text, parentObject, color) {
  // 创建Canvas纹理来绘制文字
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 1024;
  canvas.height = 512;

  // 清空画布
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 设置文字样式为纯白色
  context.fillStyle = '#ffffff'; // 纯白色文字
  context.font = 'bold 90px Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // 添加发光效果
  context.shadowColor = '#ffffff'; // 白色发光
  context.shadowBlur = 30;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  // 绘制文字
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // 添加边框发光
  // context.strokeStyle = '#ffffff'; // 白色描边
  // context.lineWidth = 6;
  // context.strokeText(text, canvas.width / 2, canvas.height / 2);

  // 创建纹理
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  // 创建文字精灵 - 始终面向相机
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.1,
    depthTest: false, // 始终显示在最前面
    opacity: 1.0
  }));

  // 调整文字标签尺寸
  sprite.scale.set(3.5, 1.8, 1);
  sprite.position.set(0, 0, 0); // 位于球体中心

  // 添加到父对象
  parentObject.add(sprite);

  return sprite;
}

// 创建现代化的企业卫星节点
function createModernSatellite(enterprise, enterpriseIndex, typeIndex, color, totalEnterprises) {
  const satelliteGroup = new THREE.Group();

  // 确保enterprise存在
  if (!enterprise) {
    console.error('enterprise is not available in createModernSatellite');
    return { group: satelliteGroup, node: null };
  }

  // 动态计算位置 - 3D球面分布（控制在合理范围内）
  const phi = Math.acos(-1 + (2 * enterpriseIndex) / (totalEnterprises > 0 ? totalEnterprises : 1));
  const theta = Math.sqrt((totalEnterprises > 0 ? totalEnterprises : 1) * Math.PI) * phi;
  // 保持分布半径为2.0
  const radius = 2.0 + Math.sin(enterpriseIndex) * 0.2;

  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);

  satelliteGroup.position.set(x, y, z);

  // 创建企业节点 - 简化为纯球状，移除发光环
  // 保持小圆半径为0.4
  const nodeGeometry = new THREE.SphereGeometry(0.4, 32, 32);

  // 简化材质 - 只保留基本效果，移除发光环
  const nodeMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color.enterprise.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',').replace(/\s/g, '')),
    roughness: 0.2,
    metalness: 0.6,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.9,
    emissive: new THREE.Color(color.accent),
    emissiveIntensity: 0.2
  });

  const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
  node.userData = { type: 'petal', data: enterprise, typeIndex, enterpriseIndex };

  satelliteGroup.add(node);

  // 添加企业Logo（如果有）- 居中显示并增加圆角
  if (enterprise.logo) {
    const loader = new THREE.TextureLoader();
    loader.load(enterprise.logo, (texture) => {
      // 创建Canvas来处理Logo的圆角效果
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const size = 256; // Canvas尺寸
      canvas.width = size;
      canvas.height = size;

      // 创建临时图片对象
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() {
        // 清空画布
        context.clearRect(0, 0, size, size);

        // 先绘制白色背景
        context.fillStyle = '#ffffff'; // 白色背景
        context.beginPath();
        context.arc(size/2, size/2, size/2, 0, Math.PI * 2); // 绘制圆形背景
        context.fill();

        // 设置圆角路径（50%圆角 = 圆形）
        const radius = size * 0.5; // 50%圆角
        context.beginPath();
        context.roundRect(0, 0, size, size, radius);
        context.clip();

        // 绘制居中的Logo
        const aspectRatio = img.width / img.height;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        // 保持比例居中裁剪
        if (aspectRatio > 1) {
          drawHeight = size / aspectRatio;
          offsetY = (size - drawHeight) / 2;
        } else {
          drawWidth = size * aspectRatio;
          offsetX = (size - drawWidth) / 2;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // 创建新的纹理
        const roundedTexture = new THREE.CanvasTexture(canvas);
        roundedTexture.needsUpdate = true;

        // 调整Logo尺寸以适应新的小圆尺寸
        const logoGeometry = new THREE.PlaneGeometry(0.6, 0.6); // 增大Logo尺寸从0.5到0.6
        const logoMaterial = new THREE.MeshBasicMaterial({
          map: roundedTexture,
          transparent: true,
          alphaTest: 0.1
        });
        const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
        // Logo初始位置设置为Z轴正方向，稍向外一点以确保可见
        logoMesh.position.set(0, 0, 0.45); // 调整Z轴位置以适应更大的Logo
        logoMesh.userData = { type: 'logo', data: enterprise, typeIndex, enterpriseIndex }; // 添加用户数据用于点击识别

        // 设置Logo始终面向相机方向
        // 延迟一帧确保camera已初始化后再设置朝向
        setTimeout(() => {
          // 确保camera和scene已初始化
          if (camera && scene) {
            logoMesh.lookAt(camera.position);
          }
        }, 0);

        // 确保node存在后再添加logoMesh
        if (node) {
          node.add(logoMesh); // 直接添加到节点而非组
        } else {
          console.warn('node is not available when adding logoMesh');
        }
      };

      img.src = enterprise.logo;
    }, undefined, (error) => {
      console.log('Logo加载失败:', enterprise.name);
    });
  }

  return { group: satelliteGroup, node };
}


// 添加光照系统 - 优化为现代化的光照方案
function addLights() {
  // 确保scene已初始化
  if (!scene) {
    console.warn('scene is not available when adding lights');
    return;
  }

  // 环境光 - 较亮一些
  const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
  scene.add(ambientLight);

  // 主光源 - 模拟太阳光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // 补充光 - 温暖色调
  const fillLight = new THREE.DirectionalLight(0xffaa88, 0.5);
  fillLight.position.set(-10, -10, 5);
  scene.add(fillLight);

  // 点光源 - 增加层次感
  const pointLight = new THREE.PointLight(0x4dccff, 0.8, 50);
  pointLight.position.set(0, 0, 10);
  scene.add(pointLight);

  // 动态光效 - 在动画中移动
  scene.userData = scene.userData || {};
  scene.userData.pointLight = pointLight;
}

// 鼠标交互 - 优化为更好的交互体验
function addMouseInteraction() {
  // 确保必要的对象已初始化
  if (!renderer || !camera || !renderer.domElement) {
    console.warn('Renderer, camera or domElement not ready for interaction');
    // 延迟重试
    setTimeout(() => {
      if (renderer && camera && renderer.domElement) {
        addMouseInteraction();
      }
    }, 100);
    return;
  }

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseClick(event) {
    // 确保renderer.domElement存在
    if (!renderer || !renderer.domElement) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // 获取所有可交互对象
    const intersectableObjects = [];
    flowers.forEach(flower => {
      // 确保对象存在
      if (!flower || !flower.center || !flower.petals) return;

      intersectableObjects.push(flower.center);
      flower.petals.forEach(petal => {
        // 确保对象存在
        if (!petal || !petal.node) return;

        intersectableObjects.push(petal.node);
        // 添加Logo到可交互对象列表
        petal.node.children.forEach(child => {
          if (child.userData && child.userData.type === 'logo') {
            intersectableObjects.push(child);
          }
        });
      });
    });

    const intersects = raycaster.intersectObjects(intersectableObjects);

    if (intersects.length > 0) {
      console.log('Intersects array:', intersects);

      // 查找第一个具有有效userData的对象
      let clickedObject = null;
      let userData = null;

      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        // 检查当前对象是否有userData且type属性存在
        if (object.userData && object.userData.type) {
          clickedObject = object;
          userData = object.userData;
          break;
        }
        // 如果当前对象没有有效的userData，检查其父对象
        else if (object.parent && object.parent.userData && object.parent.userData.type) {
          clickedObject = object.parent;
          userData = object.parent.userData;
          break;
        }
      }

      // 如果仍然没有找到有效的userData，使用第一个交集对象
      if (!clickedObject) {
        clickedObject = intersects[0].object;
        userData = clickedObject.userData || {};
      }

      console.log('Clicked object:', clickedObject);
      console.log('User data:', userData);

      // 添加更健壮的检查
      if (userData && userData.type) {
        if (userData.type === 'center') {
          // 确保数据存在
          if (userData.data) {
            handleTypeClick(userData.data);
          } else {
            console.error('Center object data is missing');
          }
        } else if (userData.type === 'petal') {
          if (userData.data) {
            handleEnterpriseClick(userData.data);
          } else {
            console.error('Petal object data is missing');
          }
        } else if (userData.type === 'logo') {
          // 点击Logo显示企业弹窗
          if (userData.data) {
            handleEnterpriseClick(userData.data);
          } else {
            console.error('Logo object data is missing');
          }
        }
      } else {
        console.error('User data is invalid or missing type property');
      }
    }
  }

  function onMouseMove(event) {
    // 确保renderer.domElement存在
    if (!renderer || !renderer.domElement) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // 获取所有可交互对象
    const intersectableObjects = [];
    flowers.forEach(flower => {
      // 确保对象存在
      if (!flower || !flower.center || !flower.petals) return;

      intersectableObjects.push(flower.center);
      flower.petals.forEach(petal => {
        // 确保对象存在
        if (!petal || !petal.node) return;

        intersectableObjects.push(petal.node);
        // 添加Logo到可交互对象列表
        petal.node.children.forEach(child => {
          if (child.userData && child.userData.type === 'logo') {
            intersectableObjects.push(child);
          }
        });
      });
    });

    const intersects = raycaster.intersectObjects(intersectableObjects);

    // 重置所有对象状态
    flowers.forEach(flower => {
      // 确保对象存在
      if (!flower || !flower.center || !flower.petals) return;

      flower.center.scale.set(1, 1, 1);
      flower.petals.forEach(petal => {
        // 确保对象存在
        if (!petal || !petal.group) return;
        petal.group.scale.set(1, 1, 1);
      });
    });

    // 高亮悬停对象
    if (intersects.length > 0) {
      // 查找第一个具有有效userData的对象
      let hoveredObject = null;
      let userData = null;

      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        // 检查当前对象是否有userData且type属性存在
        if (object.userData && object.userData.type) {
          hoveredObject = object;
          userData = object.userData;
          break;
        }
        // 如果当前对象没有有效的userData，检查其父对象
        else if (object.parent && object.parent.userData && object.parent.userData.type) {
          hoveredObject = object.parent;
          userData = object.parent.userData;
          break;
        }
      }

      // 如果仍然没有找到有效的userData，使用第一个交集对象
      if (!hoveredObject) {
        hoveredObject = intersects[0].object;
        userData = hoveredObject.userData || {};
      }

      if (userData && userData.type) {
        if (userData.type === 'center') {
          hoveredObject.scale.set(1.3, 1.3, 1.3);
        } else if (userData.type === 'petal') {
          // 找到对应的satellite group
          flowers.forEach(flower => {
            flower.petals.forEach(petal => {
              if (petal.node === hoveredObject) {
                petal.group.scale.set(1.5, 1.5, 1.5);
              }
            });
          });
        } else if (userData.type === 'logo') {
          // Logo悬停效果，放大整个企业组
          flowers.forEach(flower => {
            flower.petals.forEach(petal => {
              petal.node.children.forEach(child => {
                if (child === hoveredObject) {
                  petal.group.scale.set(1.5, 1.5, 1.5);
                }
              });
            });
          });
        }
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'default';
      }
    } else {
      renderer.domElement.style.cursor = 'default';
    }
  }

  // 确保renderer.domElement存在
  if (renderer.domElement) {
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // 添加CSS样式确保容器可交互
    renderer.domElement.style.pointerEvents = 'auto';
  }
}

// 动画循环 - 优化为更优雅的动画效果
function animate() {
  requestAnimationFrame(animate);

  // 确保必要的对象已初始化
  if (!scene || !camera || !renderer) return;

  const time = Date.now() * 0.001;

  // 企业集群整体缓慢旋转
  flowers.forEach((flower, index) => {
    // 确保对象存在
    if (!flower || !flower.center || !flower.petals) return;

    // 中心球体的自转
    flower.center.rotation.y = time * 0.5 + index * 0.2;
    flower.center.rotation.x = Math.sin(time + index) * 0.1;

    // 企业卫星节点的轨道运动（控制运动范围）
    flower.petals.forEach((satellite, satelliteIndex) => {
      // 确保对象存在
      if (!satellite || !satellite.group || !satellite.node) return;

      // 轨道旋转 - 加快旋转速度
      const orbitSpeed = 0.25 + satelliteIndex * 0.05; // 显著加快旋转速度
      const rotationY = orbitSpeed * 0.015; // 加快 Y轴旋转角度
      const rotationX = orbitSpeed * 0.008; // 加快 X轴旋转角度

      satellite.group.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);
      satellite.group.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationX);

      // 限制运动范围 - 确保不超出视野边界
      // 将最大距离从2.5调整为3.25
      const maxDistance = 3.25;
      const currentDistance = satellite.group.position.length();
      if (currentDistance > maxDistance) {
        satellite.group.position.normalize().multiplyScalar(maxDistance);
      }

      // 节点自转 - 移除自转以保持Logo可见
      // satellite.node.rotation.y = time * 1.5 + satelliteIndex;
      // satellite.node.rotation.z = Math.sin(time * 1.5 + satelliteIndex) * 0.2;

      // 确保Logo始终面向相机并在球体表面
      satellite.node.children.forEach(child => {
        // 确保所有必要的对象都已初始化
        if (child && child.type === 'Mesh' && child.material && child.material.map && child.userData && child.userData.type === 'logo') {
          // 确保camera已初始化
          if (camera) {
            // 这是Logo平面，让它面向相机
            child.lookAt(camera.position);
            // 确保Logo在球体表面，通过计算从球体中心到相机的方向向量
            const nodeWorldPosition = new THREE.Vector3();
            satellite.node.getWorldPosition(nodeWorldPosition);
            const cameraWorldPosition = new THREE.Vector3();
            camera.getWorldPosition(cameraWorldPosition);
            const direction = new THREE.Vector3().subVectors(cameraWorldPosition, nodeWorldPosition).normalize();
            // 将Logo位置设置为球体表面沿相机方向稍外一点
            child.position.copy(direction.multiplyScalar(0.45)); // 调整位置以适应更大的Logo从0.41到0.45
          }
        }
      });

      // 移除发光效果的动态变化（因为已经没有发光环了）
      // if (satellite.node.children[0]) { // 发光环
      //     satellite.node.children[0].material.opacity = 0.2 + Math.sin(time * 3 + satelliteIndex) * 0.1;
      // }

      // 轻微的上下浮动（减小幅度）
      satellite.group.position.y += Math.sin(time * 2 + satelliteIndex) * 0.001;
    });

    // 整个集群的微妙摆动
    flower.group.rotation.y = Math.sin(time * 0.15 + index) * 0.02;
    flower.group.position.y += Math.sin(time * 0.3 + index) * 0.001;

    // 中心球体的多层发光动画
    if (flower.center.children[0]) { // 内层发光
      flower.center.children[0].material.opacity = 0.2 + Math.sin(time * 2 + index) * 0.05;
    }
    if (flower.center.children[1]) { // 中层发光
      flower.center.children[1].material.opacity = 0.12 + Math.sin(time * 1.5 + index) * 0.03;
    }
    if (flower.center.children[2]) { // 外层发光
      flower.center.children[2].material.opacity = 0.06 + Math.sin(time + index) * 0.02;
    }
    if (flower.center.children[3]) { // 粒子效果球
      flower.center.children[3].rotation.x += 0.005;
      flower.center.children[3].rotation.y += 0.008;
      flower.center.children[3].material.opacity = 0.03 + Math.sin(time * 3 + index) * 0.02;
    }

    // 文字标签不需要lookAt，因为Sprite自动面向相机
  });

  // 动态光效
  if (scene.userData && scene.userData.pointLight) {
    scene.userData.pointLight.position.x = Math.cos(time * 0.3) * 6;
    scene.userData.pointLight.position.z = Math.sin(time * 0.3) * 6 + 10;
    scene.userData.pointLight.intensity = 0.7 + Math.sin(time * 1.5) * 0.2;
  }

  // 相机的轻微摆动（减小摆动幅度以保持稳定视角）
  camera.position.x = Math.sin(time * 0.05) * 0.5;
  camera.position.y = Math.cos(time * 0.05) * 0.3;
  camera.position.z = 16 + Math.sin(time * 0.03) * 1; // 保持更紧凑的基础距离并轻微变化
  camera.lookAt(0, 0, 0); // 始终看向场景中心

  renderer.render(scene, camera);
}

function handlePageLoadComplete() {
  // 检查动画是否已经执行过，避免重复执行
  if (isAnimationPlayed.value) {
    return
  }

  isAnimationPlayed.value = true

  // 显示渲染器
  if (renderer && renderer.domElement) {
    renderer.domElement.style.visibility = 'visible';
  }

  // 添加光照
  addLights();

  // 现代化的入场动画
  flowers.forEach((flower, index) => {
    // 确保flower和flower.center存在
    if (!flower || !flower.center) {
      console.warn('flower or flower.center is not available in handlePageLoadComplete');
      return;
    }

    // 中心球体入场动画
    flower.center.scale.set(0, 0, 0);
    if (flower.center.material) {
      flower.center.material.opacity = 0;
    }

    gsap.to(flower.center.scale, {
      x: 1, y: 1, z: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      delay: index * 0.4
    });

    if (flower.center.material) {
      gsap.to(flower.center.material, {
        opacity: 0.9,
        duration: 1.0,
        delay: index * 0.4 + 0.3
      });
    }

    // 文字标签入场动画
    if (flower.center.children.length > 4) { // 文字标签是最后添加的
      const textLabel = flower.center.children[flower.center.children.length - 1];
      if (textLabel && textLabel.material) {
        textLabel.material.opacity = 0;
        gsap.to(textLabel.material, {
          opacity: 1,
          duration: 1.0,
          delay: index * 0.4 + 1.0
        });
      }
    }

    // 企业卫星节点依次出现
    if (flower.petals && Array.isArray(flower.petals)) {
      flower.petals.forEach((satellite, satelliteIndex) => {
        // 确保satellite对象存在
        if (!satellite || !satellite.group || !satellite.node) {
          console.warn('satellite, satellite.group or satellite.node is not available in handlePageLoadComplete');
          return;
        }

        satellite.group.scale.set(0, 0, 0);
        if (satellite.node.material) {
          satellite.node.material.opacity = 0;
        }

        gsap.to(satellite.group.scale, {
          x: 1, y: 1, z: 1,
          duration: 1.0,
          ease: "back.out(1.7)",
          delay: index * 0.4 + 1.0 + satelliteIndex * 0.15
        });

        if (satellite.node.material) {
          gsap.to(satellite.node.material, {
            opacity: 0.95,
            duration: 0.8,
            delay: index * 0.4 + 1.2 + satelliteIndex * 0.15
          });
        }

        // 移除简化的装饰环入场动画（因为已经没有发光环了）
        // if (satellite.node.children[0]) { // 发光环
        //     satellite.node.children[0].material.opacity = 0;
        //     gsap.to(satellite.node.children[0].material, {
        //         opacity: 0.3,
        //         duration: 0.6,
        //         delay: index * 0.4 + 1.4 + satelliteIndex * 0.15
        //     });
        // }
      });
    }

    // 整个集群的最终效果
    gsap.to(flower.group.rotation, {
      y: Math.PI * 0.5,
      duration: 2,
      ease: "power2.out",
      delay: index * 0.4 + 2.0
    });
  });

  // 动画完成后向父组件发送事件
  setTimeout(() => {
    emit('animationComplete');
  }, 5000);
}

// 控制企业列表弹窗显示的状态
const showEnterpriseListDialog = ref(false)
const enterpriseTypeName = ref('')
const enterpriseList = ref(null)
const enterpriseGroupByType = ref({})

async function handleTypeClick(type) {
  console.log('Handling type click:', type);

  // 检查类型数据是否完整
  if (!type) {
    console.error('企业类型数据为空');
    return;
  }

  if (!type.type || !type.name) {
    console.error('企业类型数据不完整:', type);
    return;
  }

  try {
    console.log('Fetching enterprise data for type:', type.type);
    const response = enterpriseGroupByType.value[type.type] || []
    console.log('Enterprise data response:', response);
    enterpriseList.value = response
    enterpriseTypeName.value = type.name
    showEnterpriseListDialog.value = true
    console.log('Successfully opened enterprise list dialog for:', type.name);
  } catch (error) {
    console.error('获取企业列表数据失败:', error)
  }
}

// 处理企业圆点击事件
function handleEnterpriseClick(enterprise) {
  console.log('点击企业:', enterprise)
  handleGroupClick(enterprise)
}

// 处理图片加载失败
function handleImageError(event) {
  // 图片加载失败时隐藏图片元素
  event.target.style.display = 'none'
  console.log('企业logo加载失败:', event.target.alt)
}

// 暂停轨道动画
function pauseOrbitAnimation(typeIndex) {
  // Three.js实现中不需要此函数，保留空函数以兼容现有代码
}

// 恢复轨道动画
function resumeOrbitAnimation(typeIndex) {
  // Three.js实现中不需要此函数，保留空函数以兼容现有代码
}

// 关闭弹窗
const closeEnterpriseListDialog = () => {
  showEnterpriseListDialog.value = false
  enterpriseTypeName.value = ''
  enterpriseList.value = null
}

// 处理点击事件，显示弹窗
const handleGroupClick = (group) => {
  enterprise.value = group
  showEnterpriseDialog.value = true
}

// 关闭弹窗
const closeEnterpriseDialog = () => {
  showEnterpriseDialog.value = false
  enterprise.value = null
}
// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
  if (animationTimeline) {
    animationTimeline.kill();
  }

  // 清理 Three.js 资源
  if (renderer) {
    renderer.dispose();
  }
  if (scene) {
    // 清理场景中的所有对象
    while(scene.children.length > 0){
      scene.remove(scene.children[0]);
    }
  }

  // 移除事件监听器
  // if (renderer && renderer.domElement) {
  //     renderer.domElement.removeEventListener('click', onMouseClick);
  //     renderer.domElement.removeEventListener('mousemove', onMouseMove);
  // }
})

defineExpose({
  handlePageLoadComplete
})
</script>

<template>
  <div class="innovation-container">
    <!-- Three.js 花朵容器 -->
    <div ref="flowerContainer" class="flower-container"></div>
  </div>
  <!--企业列表弹窗-->
  <Teleport to="body">
    <div v-if="showEnterpriseListDialog" class="dialog-overlay" @click="closeEnterpriseListDialog">
      <div class="dialog-content" @click.stop>
        <m-card :title="enterpriseTypeName" :width="800" :height="650">
          <div class="key-enterprise-container" v-auto-scroll>
            <div class="image-group">
              <div class="image-list">
                <div
                    v-for="enterprise in enterpriseList"
                    :key="enterprise.name"
                    class="image-item"
                    @click="handleGroupClick(enterprise)"
                >
                  <img :src="enterprise.logo" :alt="enterprise.name" @error="handleImageError"/>
                  <div class="image-info">
                    <div class="image-name">{{ enterprise.name }}</div>
                    <div class="image-development">发展方向：{{ enterprise.developmentName || '-' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m-card>
      </div>
    </div>
  </Teleport>
  <!-- 弹窗 -->
  <Teleport to="body">
    <div v-if="showEnterpriseDialog" class="dialog-overlay" @click="closeEnterpriseDialog" style="z-index: 2000">
      <div class="dialog-content" @click.stop style="background: #000000">
        <m-card :title="enterprise?.name" width="800" height="650">
          <div class="enterprise-detail">
            <div class="enterprise-image">
              <img :src="enterprise?.logo" :alt="enterprise?.name" />
            </div>
            <div class="enterprise-info">
              <div class="info-item">
                <label>企业名称：</label>
                <span>{{ enterprise?.name }}</span>
              </div>
              <div class="info-item">
                <label>所属行业：</label>
                <span>{{ enterpriseTypeName }}</span>
              </div>
              <div class="info-item">
                <label>发展方向：</label>
                <span>{{ enterprise?.developmentName || '-' }}</span>
              </div>
              <div class="info-item">
                <label>企业地址：</label>
                <span>{{ enterprise?.address || '-' }}</span>
              </div>
            </div>
          </div>
          <div class="enterprise-detail">
            <div class="enterprise-info">
              <div class="info-item" v-if="enterprise?.mainBusiness">
                <label>主营业务：</label>
                <span class="intro-text">{{ enterprise?.mainBusiness || '-' }}</span>
              </div>
              <div class="info-item" v-if="enterprise?.description">
                <label>企业描述：</label>
                <span class="intro-text">{{ enterprise?.description || '-' }}</span>
              </div>
            </div>
          </div>
        </m-card>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.innovation-container {
  width: 100%;
  height: 100%;
  position: relative;
  background:
      radial-gradient(ellipse at 30% 30%, rgba(48, 220, 255, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(0, 255, 136, 0.02) 0%, transparent 50%),
      radial-gradient(ellipse at center, rgba(139, 92, 246, 0.01) 0%, transparent 70%);
  overflow: hidden;
}

.flower-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* 确保容器可以接收鼠标事件 */
  pointer-events: auto;
  z-index: 10;
}

.innovation-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="50" cy="50" r="0.5" fill="%2330DCFF" opacity="0.4"/><circle cx="150" cy="80" r="0.3" fill="%2300FF88" opacity="0.3"/><circle cx="80" cy="150" r="0.4" fill="%238B5CF6" opacity="0.2"/><circle cx="120" cy="20" r="0.2" fill="%2330DCFF" opacity="0.5"/><circle cx="180" cy="140" r="0.3" fill="%2300FF88" opacity="0.2"/></svg>') repeat;
  animation: starField 120s linear infinite;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

@keyframes starField {
  0% {
    transform: rotate(0deg) translate(0, 0);
  }
  100% {
    transform: rotate(360deg) translate(5px, 5px);
  }
}

.key-enterprise-container {
  height: 100%;
  padding: 8px 20px;
  color: white;
  box-sizing: border-box;
  overflow-y: auto;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
  }

  .image-group {
    .industry {
      margin: 4px 0 ;
      flex-shrink: 0;
      color: #fff;
      font-size: 20px;
      line-height: 32px;
      font-family: "PingFangSc";
      font-weight: 600;
      background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .image-list {
      display: grid;
      grid-template-columns: repeat(1, 1fr); // 改为单列布局
      gap: 16px;

      .image-item {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 8px;
        overflow: hidden;
        width: 100%; // 确保宽度为100%
        cursor: pointer;
        background: rgba(30, 30, 40, 0.7);
        border: 1px solid rgba(64, 158, 255, 0.3);
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        &:hover {
          background: rgba(40, 40, 60, 0.9);
          border-color: rgba(64, 158, 255, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        img {
          width: 60px; // 固定图片宽度
          height: 60px;
          object-fit: contain;
          border-radius: 16px;
          border: 1px solid #666;
          margin: 0 10px 0 0;
          background: #ffffff;
        }

        .image-info {
          flex: 1; // 占据剩余空间
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4px 0;
          min-width: 0; // 允许文本截断

          .image-name {
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 4px;
            background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .image-development {
            color: #D3F8F2;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.dialog-content {
  border-radius: 12px;
  width: 80%;
  max-width: 800px;
  max-height: 80%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(64, 158, 255, 0.4);
  animation: dialogAppear 0.3s ease-out;
}

@keyframes dialogAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.enterprise-detail {
  display: flex;
  padding: 20px 20px 0 20px;
  color: white;
  //background: rgba(20, 20, 30, 0.95);
  border-radius: 8px;

  .enterprise-info {
    flex: 1;
    padding-right: 20px;
    display: flex;
    flex-direction: column;

    .info-item {
      //margin: 12px 0;
      //padding: 12px;
      //border-radius: 6px;
      //background: rgba(30, 30, 40, 0.7);
      //border: 1px solid rgba(64, 158, 255, 0.3);

      label {
        flex-shrink: 0;
        color: #fff;
        font-size: 16px;
        line-height: 20px;
        font-family: "PingFangSc";
        font-weight: 600;
        background: -webkit-linear-gradient(rgba(219, 249, 255, 1), rgba(169, 240, 255, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      span {
        color: #ffffff;
        font-size: 15px;
        line-height: 1.6;
      }

      .intro-text {
        display: block;
        white-space: pre-wrap;
        line-height: 1.6;
        margin: 8px 0;
        color: #e0e0e0;
      }
    }
  }

  .enterprise-image {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

    img {
      max-width: 100%;
      max-height: 120px;
      border-radius: 8px;
      border: 2px solid rgba(64, 158, 255, 0.5);
      background: #ffffff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
}

@media (max-width: 768px) {
  .enterprise-detail {
    flex-direction: column;

    .enterprise-info {
      padding-right: 0;
      margin-bottom: 20px;
    }

    .enterprise-image {
      width: 100%;
    }
  }
}
</style>