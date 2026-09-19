import { useReducedMotion } from 'motion/react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import type { PrismProps } from '@/types/v-prism-background';

const DEFAULT_OFFSET = { x: 0, y: 0 };

export const VPrismBackground = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  glow = 1,
  offset = DEFAULT_OFFSET,
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = false,
  timeScale = 0.5,
}: PrismProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const offsetX = offset.x ?? 0;
  const offsetY = offset.y ?? 0;

  useEffect(() => {
    const container = containerRef.current;
    if (
      !container ||
      reduceMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const prismHeight = Math.max(0.001, height);
    const prismBaseWidth = Math.max(0.001, baseWidth);
    const baseHalf = prismBaseWidth * 0.5;
    const normalizedGlow = Math.max(0, glow);
    const normalizedNoise = Math.max(0, noise);
    const saturation = transparent ? 1.5 : 1;
    const normalizedScale = Math.max(0.001, scale);
    const normalizedHue = hueShift || 0;
    const normalizedColorFrequency = Math.max(0, colorFrequency || 1);
    const normalizedBloom = Math.max(0, bloom || 1);
    const normalizedTimeScale = Math.max(0, timeScale || 1);
    const normalizedHoverStrength = Math.max(0, hoverStrength || 1);
    const normalizedInertia = Math.max(0, Math.min(1, inertia || 0.12));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const renderer = new Renderer({ dpr, alpha: transparent, antialias: false });
    const { gl } = renderer;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    } as Partial<CSSStyleDeclaration>);
    container.appendChild(gl.canvas);

    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    const fragment = `
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;

      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p){
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

        float z = 5.0;
        float d = 0.0;

        vec3 p;
        vec4 o = vec4(0.0);

        float centerShift = uCenterShift;
        float cf = uColorFreq;

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += centerShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

        if(abs(uHueShift) > 0.0001){
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;
    const geometry = new Triangle(gl);
    const resolutionBuffer = new Float32Array(2);
    const offsetBuffer = new Float32Array(2);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: resolutionBuffer },
        iTime: { value: 0 },
        uHeight: { value: prismHeight },
        uBaseHalf: { value: baseHalf },
        uUseBaseWobble: { value: 1 },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uGlow: { value: normalizedGlow },
        uOffsetPx: { value: offsetBuffer },
        uNoise: { value: normalizedNoise },
        uSaturation: { value: saturation },
        uScale: { value: normalizedScale },
        uHueShift: { value: normalizedHue },
        uColorFreq: { value: normalizedColorFrequency },
        uBloom: { value: normalizedBloom },
        uCenterShift: { value: prismHeight * 0.25 },
        uInvBaseHalf: { value: 1 / baseHalf },
        uInvHeight: { value: 1 / prismHeight },
        uMinAxis: { value: Math.min(baseHalf, prismHeight) },
        uPxScale: {
          value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * normalizedScale),
        },
        uTimeScale: { value: normalizedTimeScale },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const resize = (): void => {
      const width = container.clientWidth || 1;
      const containerHeight = container.clientHeight || 1;
      renderer.setSize(width, containerHeight);
      resolutionBuffer[0] = gl.drawingBufferWidth;
      resolutionBuffer[1] = gl.drawingBufferHeight;
      offsetBuffer[0] = offsetX * dpr;
      offsetBuffer[1] = offsetY * dpr;
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * normalizedScale);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const rotationBuffer = new Float32Array(9);
    const setRotationFromEuler = ({
      yawY,
      pitchX,
      rollZ,
      output,
    }: {
      yawY: number;
      pitchX: number;
      rollZ: number;
      output: Float32Array;
    }): Float32Array => {
      const cosineY = Math.cos(yawY);
      const sineY = Math.sin(yawY);
      const cosineX = Math.cos(pitchX);
      const sineX = Math.sin(pitchX);
      const cosineZ = Math.cos(rollZ);
      const sineZ = Math.sin(rollZ);
      const rotation00 = cosineY * cosineZ + sineY * sineX * sineZ;
      const rotation01 = -cosineY * sineZ + sineY * sineX * cosineZ;
      const rotation02 = sineY * cosineX;
      const rotation10 = cosineX * sineZ;
      const rotation11 = cosineX * cosineZ;
      const rotation12 = -sineX;
      const rotation20 = -sineY * cosineZ + cosineY * sineX * sineZ;
      const rotation21 = sineY * sineZ + cosineY * sineX * cosineZ;
      const rotation22 = cosineY * cosineX;

      output[0] = rotation00;
      output[1] = rotation10;
      output[2] = rotation20;
      output[3] = rotation01;
      output[4] = rotation11;
      output[5] = rotation21;
      output[6] = rotation02;
      output[7] = rotation12;
      output[8] = rotation22;
      return output;
    };
    const lerp = ({ from, to, amount }: { from: number; to: number; amount: number }): number =>
      from + (to - from) * amount;
    const random = (): number => Math.random();
    const rotationSpeedX = 0.3 + random() * 0.6;
    const rotationSpeedY = 0.2 + random() * 0.7;
    const rotationSpeedZ = 0.1 + random() * 0.5;
    const phaseX = random() * Math.PI * 2;
    const phaseZ = random() * Math.PI * 2;
    const pointer = { x: 0, y: 0, inside: true };
    const noiseIsZero = normalizedNoise < 1e-6;
    const startedAt = performance.now();
    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    let animationFrame = 0;

    const render: FrameRequestCallback = (timestamp: number): void => {
      const elapsedTime = (timestamp - startedAt) * 0.001;
      program.uniforms.iTime.value = elapsedTime;
      let continueAnimation = true;

      if (animationType === 'hover') {
        const maxPitch = 0.6 * normalizedHoverStrength;
        const maxYaw = 0.6 * normalizedHoverStrength;
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;
        yaw = lerp({ from: yaw, to: targetYaw, amount: normalizedInertia });
        pitch = lerp({ from: pitch, to: targetPitch, amount: normalizedInertia });
        roll = lerp({ from: roll, to: 0, amount: 0.1 });
        program.uniforms.uRot.value = setRotationFromEuler({
          yawY: yaw,
          pitchX: pitch,
          rollZ: roll,
          output: rotationBuffer,
        });

        if (
          noiseIsZero &&
          Math.abs(yaw - targetYaw) < 1e-4 &&
          Math.abs(pitch - targetPitch) < 1e-4 &&
          Math.abs(roll) < 1e-4
        ) {
          continueAnimation = false;
        }
      } else if (animationType === '3drotate') {
        const scaledTime = elapsedTime * normalizedTimeScale;
        yaw = scaledTime * rotationSpeedY;
        pitch = Math.sin(scaledTime * rotationSpeedX + phaseX) * 0.6;
        roll = Math.sin(scaledTime * rotationSpeedZ + phaseZ) * 0.5;
        program.uniforms.uRot.value = setRotationFromEuler({
          yawY: yaw,
          pitchX: pitch,
          rollZ: roll,
          output: rotationBuffer,
        });
        if (normalizedTimeScale < 1e-6) {
          continueAnimation = false;
        }
      } else {
        rotationBuffer.set([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        program.uniforms.uRot.value = rotationBuffer;
        if (normalizedTimeScale < 1e-6) {
          continueAnimation = false;
        }
      }

      renderer.render({ scene: mesh });
      if (continueAnimation) {
        animationFrame = requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };
    const startAnimation = (): void => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(render);
      }
    };
    const stopAnimation = (): void => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };
    const handlePointerMove = ({ clientX, clientY }: PointerEvent): void => {
      const viewportWidth = Math.max(1, window.innerWidth);
      const viewportHeight = Math.max(1, window.innerHeight);
      const normalizedX = (clientX - viewportWidth * 0.5) / (viewportWidth * 0.5);
      const normalizedY = (clientY - viewportHeight * 0.5) / (viewportHeight * 0.5);
      pointer.x = Math.max(-1, Math.min(1, normalizedX));
      pointer.y = Math.max(-1, Math.min(1, normalizedY));
      pointer.inside = true;
      startAnimation();
    };
    const handlePointerLeave = (): void => {
      pointer.inside = false;
    };
    const handleWindowBlur = (): void => {
      pointer.inside = false;
    };

    if (animationType === 'hover') {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('mouseleave', handlePointerLeave);
      window.addEventListener('blur', handleWindowBlur);
      program.uniforms.uUseBaseWobble.value = 0;
    } else if (animationType === '3drotate') {
      program.uniforms.uUseBaseWobble.value = 0;
    } else {
      program.uniforms.uUseBaseWobble.value = 1;
    }

    let intersectionObserver: IntersectionObserver | undefined;
    if (suspendWhenOffscreen) {
      intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
      intersectionObserver.observe(container);
    }
    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      if (animationType === 'hover') {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('mouseleave', handlePointerLeave);
        window.removeEventListener('blur', handleWindowBlur);
      }
      geometry.remove();
      program.remove();
      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    animationType,
    baseWidth,
    bloom,
    colorFrequency,
    glow,
    height,
    hoverStrength,
    hueShift,
    inertia,
    noise,
    offsetX,
    offsetY,
    reduceMotion,
    scale,
    suspendWhenOffscreen,
    timeScale,
    transparent,
  ]);

  return <div ref={containerRef} className="relative h-full w-full" />;
};

export default VPrismBackground;
