import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef } from 'react'
import './CircularGallery.css'

function debounce(func, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

const lerp = (a, b, t) => a + (b - a) * t
const SCROLL_LERP = 0.02
const SPEED_FACTOR = 0.2

function createTextTexture(gl, text, color = '#ffffff') {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = '700 30px League Spartan'
  const textWidth = Math.ceil(context.measureText(text).width)
  canvas.width = textWidth + 20
  canvas.height = 64
  context.font = '700 30px League Spartan'
  context.fillStyle = color
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class GalleryItem {
  constructor({ geometry, gl, image, index, length, scene, viewport, screen, text, bend, textColor, borderRadius }) {
    this.gl = gl
    this.geometry = geometry
    this.image = image
    this.smoothedSpeed = 0
    this.index = index
    this.length = length
    this.scene = scene
    this.viewport = viewport
    this.screen = screen
    this.text = text
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.extra = 0
    this.init()
  }

  init() {
    const texture = new Texture(this.gl, { generateMipmaps: true })
    const img = new Image()
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }

    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) + cos(p.y * 2.0 + uTime)) * (0.08 + uSpeed * 0.35);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: Math.random() * 100 },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true,
      depthTest: false,
      depthWrite: false
    })

    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
    this.plane.setParent(this.scene)
    this.createTitle()
    this.onResize()
  }

  createTitle() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.textColor)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tMap;
        void main() {
          vec4 c = texture2D(tMap, vUv);
          if (c.a < 0.1) discard;
          gl_FragColor = c;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.title = new Mesh(this.gl, { geometry: new Plane(this.gl), program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.12
    this.title.scale.set(textHeight * aspect, textHeight, 1)
    this.title.position.y = -this.plane.scale.y * 0.62
    this.title.setParent(this.plane)
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) this.viewport = viewport

    const isMobile = this.screen.width < 768
    let cardW, cardH

    if (isMobile) {
      // Reduced card width further for clarity on mobile screens
      cardW = this.screen.width * 0.65 
      cardH = this.screen.height * 0.40
    } else {
      const scale = this.screen.height / 1500
      cardW = 700 * scale
      cardH = 900 * scale
    }

    this.plane.scale.y = (this.viewport.height * cardH) / this.screen.height
    this.plane.scale.x = (this.viewport.width * cardW) / this.screen.width
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    
    // HEAVY PADDING: 2.5 on mobile creates a very clear gap between cards
    this.width = this.plane.scale.x + (isMobile ? 2.5 : 3.5)
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x
    const halfW = this.viewport.width / 2
    const bend = this.bend

    if (bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const absB = Math.abs(bend)
      const r = (halfW * halfW + absB * absB) / (2 * absB)
      const effectiveX = Math.min(Math.abs(x), halfW)
      const arc = r - Math.sqrt(r * r - effectiveX * effectiveX)
      this.plane.position.y = bend > 0 ? -arc : arc
      this.plane.rotation.z = (bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / r)
    }

    const rawSpeed = scroll.current - scroll.last
    this.smoothedSpeed = lerp(this.smoothedSpeed, rawSpeed, SCROLL_LERP)
    this.program.uniforms.uSpeed.value = this.smoothedSpeed * SPEED_FACTOR
    this.program.uniforms.uTime.value += 0.04

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    const isBefore = this.plane.position.x + planeOffset < -viewportOffset
    const isAfter = this.plane.position.x - planeOffset > viewportOffset

    if (direction === 'right' && isBefore) this.extra -= this.widthTotal
    if (direction === 'left' && isAfter) this.extra += this.widthTotal
  }
}

class OglGallery {
  constructor(container, { items, bend, textColor, borderRadius, scrollSpeed, scrollEase, touchScrollEase, mass, onItemOpen }) {
    this.container = container
    this.items = items
    this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 }
    this.defaultEase = scrollEase
    this.touchEase = touchScrollEase
    this.mass = mass
    this.isTouch = 'ontouchstart' in window
    this.onItemOpen = onItemOpen
    this.createRenderer()
    this.createCamera()
    this.scene = new Transform()
    this.geometry = new Plane(this.gl, { widthSegments: 100, heightSegments: 50 })
    this.onResize()

    const mediaItems = [...items, ...items]
    this.medias = mediaItems.map((item, index) => new GalleryItem({
      geometry: this.geometry,
      gl: this.gl,
      image: item.image,
      index,
      length: mediaItems.length,
      scene: this.scene,
      viewport: this.viewport,
      screen: this.screen,
      text: item.text,
      bend,
      textColor,
      borderRadius
    }))

    this.onCheckDebounce = debounce(this.onCheck.bind(this), 140)
    this.update = this.update.bind(this)
    this.bind()
    this.update()
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(2, window.devicePixelRatio || 1) })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 17
  }

  bind() {
    this.onResizeBound = this.onResize.bind(this)
    this.onWheelBound = this.onWheel.bind(this)
    this.onDownBound = this.onDown.bind(this)
    this.onMoveBound = this.onMove.bind(this)
    this.onUpBound = this.onUp.bind(this)
    this.onClickBound = this.onCanvasClick.bind(this)
    window.addEventListener('resize', this.onResizeBound)
    window.addEventListener('wheel', this.onWheelBound, { passive: true })
    window.addEventListener('mousedown', this.onDownBound)
    window.addEventListener('mousemove', this.onMoveBound)
    window.addEventListener('mouseup', this.onUpBound)
    window.addEventListener('touchstart', this.onDownBound, { passive: true })
    window.addEventListener('touchmove', this.onMoveBound, { passive: true })
    window.addEventListener('touchend', this.onUpBound, { passive: true })
    this.gl.canvas.addEventListener('click', this.onClickBound)
  }

  onDown(e) {
    this.isDown = true
    this.start = e.touches ? e.touches[0].clientX : e.clientX
    this.lastX = this.start
    if (e.touches) this.scroll.ease = this.touchEase
  }

  onMove(e) {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const deltaX = x - this.lastX
    this.scroll.target += -deltaX * this.mass * SPEED_FACTOR
    this.lastX = x
  }

  onUp() {
    this.isDown = false
    this.scroll.ease = this.defaultEase
    this.onCheck()
  }

  onWheel(e) {
    const mappedDelta = Math.abs(e.deltaX) > 0 ? -e.deltaX : e.deltaY
    this.scroll.target += mappedDelta * this.mass * SPEED_FACTOR
    this.onCheckDebounce()
  }

  onCanvasClick() {
    if (!this.onItemOpen || !this.medias?.length) return
    const width = this.medias[0].width
    if (!width) return
    const index = ((Math.round(this.scroll.current / width) % this.items.length) + this.items.length) % this.items.length
    const item = this.items[index]
    if (item?.id) {
      this.onItemOpen(item)
      return
    }
    if (item?.image) {
      window.open(item.image, '_blank', 'noopener,noreferrer')
    }
  }

  onCheck() {
    const width = this.medias[0]?.width
    if (!width) return
    const i = Math.round(Math.abs(this.scroll.target) / width)
    const snap = width * i
    this.scroll.target = this.scroll.target < 0 ? -snap : snap
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    this.medias?.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }))
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, SCROLL_LERP)
    const dir = this.scroll.current > this.scroll.last ? 'right' : 'left'
    this.medias.forEach((m) => m.update(this.scroll, dir))
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = requestAnimationFrame(this.update)
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.onResizeBound)
    window.removeEventListener('wheel', this.onWheelBound)
    window.removeEventListener('mousedown', this.onDownBound)
    window.removeEventListener('mousemove', this.onMoveBound)
    window.removeEventListener('mouseup', this.onUpBound)
    window.removeEventListener('touchstart', this.onDownBound)
    window.removeEventListener('touchmove', this.onMoveBound)
    window.removeEventListener('touchend', this.onUpBound)
    this.gl.canvas.removeEventListener('click', this.onClickBound)
    this.renderer.gl.canvas.remove()
    this.gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = SCROLL_LERP,
  touchScrollEase = SCROLL_LERP,
  mass = 0.5,
  onItemOpen
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined
    const gallery = new OglGallery(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      scrollSpeed,
      scrollEase,
      touchScrollEase,
      mass,
      onItemOpen
    })
    return () => gallery.destroy()
  }, [items, bend, textColor, borderRadius, scrollSpeed, scrollEase, touchScrollEase, mass, onItemOpen])

  return <div className="circular-gallery" ref={containerRef} />
}
