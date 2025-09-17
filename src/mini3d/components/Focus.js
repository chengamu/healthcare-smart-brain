import { Object3D, MeshBasicMaterial, DoubleSide, AdditiveBlending, PlaneGeometry, Mesh, Color } from "three"
import gsap from "gsap"
import { emptyObject } from "@/mini3d"
export class Focus extends Object3D {
  constructor(self, config) {
    super()
    this.config = Object.assign(
      {
        color1: 0xfcc957,
        color2: 0xffffff,
      },
      config
    )
    this.assets = { instance: null }
    this.assets.instance = self.assets.instance
    this.sceneGroup = self.sceneGroup
    this.gsapObjects = [] // gsap对象
    this.animateElements = {} // gsap动画对象
    this.init()
  }
  init() {
    let color = this.config.color1
    // 几何体
    let geometry = new PlaneGeometry(1.5, 1.5, 1)
    let barGeometry = new PlaneGeometry(1, 3, 1)
    barGeometry.translate(0, 1, 0)
    // 材质
    let material = new MeshBasicMaterial({
      color,
      transparent: true,
      fog: false,
      side: DoubleSide,
      depthWrite: false,
    })
    let focusArrowsMaterial = material.clone()

    focusArrowsMaterial.map = this.assets.instance.getResource("focusArrows")
    let focusBarMaterial = material.clone()
    focusBarMaterial.map = this.assets.instance.getResource("focusBar")
    let focusBgMaterial = material.clone()
    focusBgMaterial.map = this.assets.instance.getResource("focusBg")
    let focusMidQuanMaterial = material.clone()
    focusMidQuanMaterial.color = new Color(this.config.color2)
    focusMidQuanMaterial.map = this.assets.instance.getResource("focusMidQuan")
    let focusMoveBgMaterial = material.clone()
    focusMoveBgMaterial.map = this.assets.instance.getResource("focusMoveBg")
    focusMoveBgMaterial.blending = AdditiveBlending
    let focusArrows = new Mesh(geometry, focusArrowsMaterial)
    let focusBar1 = new Mesh(barGeometry, focusBarMaterial)
    focusBar1.rotation.x = Math.PI / 2
    let focusBar2 = focusBar1.clone()
    focusBar2.rotation.y = Math.PI / 2
    let focusBg = new Mesh(geometry, focusBgMaterial)
    let focusMidQuan = new Mesh(geometry, focusMidQuanMaterial)
    let focusMoveBg = new Mesh(geometry, focusMoveBgMaterial)

    let groupElement = [focusMidQuan, focusBg, focusArrows, focusMoveBg, focusBar1, focusBar2]
    groupElement.map((element) => {
      element.renderOrder = 99
    })
    this.add(...groupElement)
    let moveBgScale = 0
    focusMoveBg.scale.setScalar(moveBgScale)
    this.animateElements = { focusMidQuan, focusArrows, focusMoveBg }
    this.startAnimate()
  }
  //   开始动画
  startAnimate() {
    // 中心圆环旋转 - 慢速平滑旋转
    let quanTween = gsap.to(this.animateElements.focusMidQuan.rotation, {
      z: 2 * Math.PI,
      duration: 12,
      repeat: -1,
      ease: "none",
    })

    // 箭头旋转 - 中等速度
    let focusArrowsTween = gsap.to(this.animateElements.focusArrows.rotation, {
      z: 2 * Math.PI,
      duration: 8,
      repeat: -1,
      ease: "none",
    })
    
    // 扩散效果 - 大幅增大扩散范围，覆盖全图
    let focusMoveBgTween = gsap.to(this.animateElements.focusMoveBg.scale, {
      x: 8.0,
      y: 8.0,
      z: 8.0,
      duration: 4.0,
      repeat: -1,
      ease: "power2.out",
      repeatDelay: 2.0,
    })
    
    let focusMoveBgMaterialTween = gsap.to(this.animateElements.focusMoveBg.material, {
      opacity: 0,
      duration: 4.0,
      repeat: -1,
      ease: "power2.out",
      repeatDelay: 2.0,
    })
    
    this.gsapObjects = [quanTween, focusArrowsTween, focusMoveBgTween, focusMoveBgMaterialTween]
  }
  //   暂停动画
  pausedAnimate() {
    this.gsapObjects.map((element) => {
      element.paused = true
    })
  }
  destroy() {
    // 结束动画
    this.gsapObjects.map((element) => {
      element.kill()
    })
    // 销毁
    emptyObject(this)
  }
}
