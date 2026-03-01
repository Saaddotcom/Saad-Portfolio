import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ColorBends.css';

const MAX_COLORS = 8;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  }
  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }
  gl_FragColor = vec4(col * (uTransparent > 0 ? a : 1.0), a);
}
`;

const vert = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;

export default function ColorBends({
  className, style, rotation = 45, speed = 0.2, colors = [], transparent = true, autoRotate = 0, scale = 1, frequency = 1, warpStrength = 1, mouseInfluence = 1, parallax = 0.5, noise = 0.1
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uSpeed: { value: speed }, uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 }, uColors: { value: Array.from({ length: MAX_COLORS }, () => new THREE.Vector3()) },
        uTransparent: { value: transparent ? 1 : 0 }, uScale: { value: scale }, uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength }, uPointer: { value: new THREE.Vector2(0, 0) }, uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax }, uNoise: { value: noise }
      },
      transparent: true
    });
    materialRef.current = material;
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const handleResize = () => {
      const w = container.clientWidth || 1; const h = container.clientHeight || 1;
      renderer.setSize(w, h, false); material.uniforms.uCanvas.value.set(w, h);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let raf;
    const loop = () => {
      const dt = clock.getDelta();
      material.uniforms.uTime.value = clock.elapsedTime;
      const rad = ((rotation + autoRotate * clock.elapsedTime) * Math.PI) / 180;
      material.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad));
      pointerCurrentRef.current.lerp(pointerTargetRef.current, Math.min(1, dt * 8));
      material.uniforms.uPointer.value.copy(pointerCurrentRef.current);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize);
      renderer.dispose(); container.removeChild(renderer.domElement);
    };
  }, [speed, transparent, scale, frequency, warpStrength, mouseInfluence, parallax, noise]);

  useEffect(() => {
    if (!materialRef.current) return;
    const toVec3 = hex => {
      const h = hex.replace('#', '');
      const v = h.length === 3 ? [h[0]+h[0], h[1]+h[1], h[2]+h[2]] : [h.slice(0,2), h.slice(2,4), h.slice(4,6)];
      return new THREE.Vector3(...v.map(x => parseInt(x, 16) / 255));
    };
    const arr = (colors || []).slice(0, MAX_COLORS).map(toVec3);
    arr.forEach((vec, i) => materialRef.current.uniforms.uColors.value[i].copy(vec));
    materialRef.current.uniforms.uColorCount.value = arr.length;
  }, [colors]);

  return <div ref={containerRef} className={`color-bends-container ${className || ''}`} style={style} onPointerMove={e => {
    const rect = containerRef.current.getBoundingClientRect();
    pointerTargetRef.current.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -(((e.clientY - rect.top) / rect.height) * 2 - 1));
  }} />;
}
