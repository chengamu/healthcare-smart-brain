import { Group, Vector3, QuadraticBezierCurve3, MeshBasicMaterial, AdditiveBlending, Mesh, TubeGeometry } from "three"
export class FlyLine {
  constructor({ time, geoProjection }, options) {
    this.time = time
    this.geoProjection = geoProjection
    this.instance = new Group()
    let defaultOptions = {
      centerPoint: [0, 0],
      middleHeight: 15,
      speed: 0.001, // 降低飞线速度，提升视觉体验
      texture: null,
      radius: 0.1,
      segments: 32,
      radialSegments: 8,
      data: [],
      material: new MeshBasicMaterial({
        color: 0xfbdf88,
        transparent: true,
        fog: false,
        opacity: 0.8, // 降低透明度，减少过于刺眼
        depthTest: false,
        blending: AdditiveBlending,
      }),
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.init()
  }
  init() {
    const { centerPoint, material, texture, segments, radius, radialSegments, data, speed, middleHeight } = this.options
    let [centerX, centerY] = this.geoProjection(centerPoint)
    let centerPointVec = new Vector3(centerX, -centerY, 0)
    data.map((city) => {
      let [x, y] = this.geoProjection(city.centroid)
      let point = new Vector3(x, -y, 0)
      const center = new Vector3()
      center.addVectors(centerPointVec, point).multiplyScalar(0.5)
      center.setZ(middleHeight)
      const curve = new QuadraticBezierCurve3(centerPointVec, center, point)
      const tubeGeometry = new TubeGeometry(curve, segments, radius, radialSegments, false)
      const mesh = new Mesh(tubeGeometry, material)
      mesh.position.set(0, 0, 0)
      mesh.renderOrder = 21
      this.instance.add(mesh)
    })
    // 优化动画执行，减少频繁更新
    let lastTime = 0
    this.time.on("tick", () => {
      if (this.run) {
        const currentTime = performance.now()
        // 每50ms才更新一次，提升性能
        if (currentTime - lastTime > 50) {
          texture.offset.x -= speed
          lastTime = currentTime
        }
      }
    })
  }
  getInstance() {
    return this.instance
  }
  setParent(parent) {
    parent.add(this.instance)
  }
  set visible(bool) {
    this.instance.visible = bool
    this.run = bool
  }
}
