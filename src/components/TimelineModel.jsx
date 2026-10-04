import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * 3D video-editing timeline: layered clips on tracks, a ruler, an audio waveform
 * and a red playhead that sweeps across and lifts each clip as it passes.
 * Needs:  npm i three   (r155 or newer)
 */

const C = {
  red: '#D42C2C',
  yellow: '#FFC822',
  cream: '#FFFCFB',
  clay: '#8a7f72',
  dark: '#14120e',
  lane: '#272219',
};

const X_MIN = -4.4;
const X_MAX = 4.4;
const LOOP_SECONDS = 10;

// [startX, length, color] per track
const TRACKS = [
  { z: -1.3, clips: [[-4.2, 2.2, 'red'], [-1.8, 1.4, 'yellow'], [-0.2, 2.6, 'cream'], [2.6, 1.6, 'red']] },
  { z: -0.3, clips: [[-4.2, 1.2, 'cream'], [-2.8, 2.4, 'red'], [-0.2, 1.6, 'clay'], [1.6, 2.6, 'yellow']] },
  { z: 0.7, clips: [[-4.2, 3.2, 'yellow'], [-0.8, 1.2, 'red'], [0.6, 2.4, 'cream'], [3.2, 1.0, 'clay']] },
];
const AUDIO_Z = 1.9;

export function createTimelineScene() {
  const disposables = [];
  const track = (o) => { disposables.push(o); return o; };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 2, 0.1, 100);

  // lights
  scene.add(new THREE.AmbientLight('#ffffff', 1.1));
  const key = new THREE.DirectionalLight('#fff3e0', 2.2);
  key.position.set(-5, 9, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight('#ffd6d0', 0.7);
  fill.position.set(6, 3, -4);
  scene.add(fill);

  // soft ground shadow
  const sc = document.createElement('canvas');
  sc.width = sc.height = 128;
  const sctx = sc.getContext('2d');
  const grad = sctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0,0,0,0.32)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 128, 128);
  const shadowTex = track(new THREE.CanvasTexture(sc));
  const shadowMat = track(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  const shadow = new THREE.Mesh(track(new THREE.PlaneGeometry(13, 8)), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.0;
  scene.add(shadow);

  const rig = new THREE.Group();   // rotates with pointer
  const model = new THREE.Group(); // floats up and down
  rig.add(model);
  scene.add(rig);

  const mat = (color, extra = {}) =>
    track(new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.0, ...extra }));

  // editor window panel
  const panel = new THREE.Mesh(track(new RoundedBoxGeometry(10.2, 0.3, 5.6, 4, 0.18)), mat(C.dark));
  model.add(panel);
  const TOP = 0.15;

  // window dots
  [C.red, C.yellow, C.clay].forEach((col, i) => {
    const dot = new THREE.Mesh(track(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20)), mat(col));
    dot.position.set(-4.7 + i * 0.26, TOP + 0.015, -2.55);
    model.add(dot);
  });

  // ruler ticks
  const tickCount = 41;
  const ticks = new THREE.InstancedMesh(track(new THREE.BoxGeometry(0.025, 0.03, 1)), mat(C.clay), tickCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < tickCount; i++) {
    const major = i % 5 === 0;
    dummy.position.set(-4.8 + i * 0.24, TOP + 0.02, -2.1);
    dummy.scale.set(1, 1, major ? 0.3 : 0.15);
    dummy.updateMatrix();
    ticks.setMatrixAt(i, dummy.matrix);
  }
  model.add(ticks);

  // lane strips
  const laneGeo = track(new THREE.BoxGeometry(9.6, 0.02, 0.94));
  const laneMat = mat(C.lane);
  [...TRACKS.map((t) => t.z), AUDIO_Z].forEach((z) => {
    const lane = new THREE.Mesh(laneGeo, laneMat);
    lane.position.set(0, TOP + 0.01, z);
    model.add(lane);
  });

  // clips
  const clips = [];
  TRACKS.forEach((t, ti) => {
    t.clips.forEach(([start, len, colorKey], ci) => {
      const w = len - 0.08;
      const m = mat(C[colorKey], { emissive: C[colorKey], emissiveIntensity: 0 });
      const mesh = new THREE.Mesh(track(new RoundedBoxGeometry(w, 0.34, 0.8, 3, 0.08)), m);
      const baseY = TOP + 0.17;
      mesh.position.set(start + len / 2, baseY, t.z);
      model.add(mesh);
      clips.push({ mesh, m, baseY, x0: start, x1: start + len, lift: 0, phase: ti * 1.3 + ci * 0.7 });
    });
  });

  // audio waveform bars
  const barXs = [];
  for (let x = -4.3; x <= 4.3; x += 0.1) barXs.push(x);
  const bars = new THREE.InstancedMesh(
    track(new THREE.BoxGeometry(0.06, 1, 0.12)),
    mat('#ffffff'),
    barXs.length
  );
  const amps = barXs.map((_, i) => 0.22 + 0.78 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11 + 1)));
  const cream = new THREE.Color(C.cream);
  const red = new THREE.Color(C.red);
  const barPlayed = new Array(barXs.length).fill(null);
  barXs.forEach((_, i) => bars.setColorAt(i, cream));
  model.add(bars);

  // playhead: thin red wall + a head marker
  const phMat = track(new THREE.MeshStandardMaterial({ color: C.red, emissive: C.red, emissiveIntensity: 0.7, roughness: 0.4 }));
  const playhead = new THREE.Group();
  const wall = new THREE.Mesh(track(new THREE.BoxGeometry(0.05, 0.9, 4.8)), phMat);
  wall.position.set(0, 0.55, 0.1);
  playhead.add(wall);
  const head = new THREE.Mesh(track(new THREE.ConeGeometry(0.24, 0.42, 5)), phMat);
  head.rotation.x = Math.PI; // tip pointing down
  head.position.set(0, 1.15, -2.3);
  playhead.add(head);
  model.add(playhead);

  const pointer = { x: 0, y: 0 };
  let aspect = 2;

  const setAspect = (a) => {
    aspect = a;
    camera.aspect = a;
    const k = Math.max(1, 2.0 / a); // pull back on narrow screens
    camera.position.set(0, 6.8 * k, 10.2 * k);
    camera.lookAt(0, -0.2, 0);
    camera.updateProjectionMatrix();
  };
  setAspect(aspect);

  const update = (t, ptr = pointer) => {
    const prog = (t % LOOP_SECONDS) / LOOP_SECONDS;
    const playX = X_MIN + prog * (X_MAX - X_MIN);
    playhead.position.x = playX;
    head.position.y = 1.15 + Math.sin(t * 4) * 0.03;

    clips.forEach((c) => {
      const active = playX > c.x0 && playX < c.x1;
      c.lift += ((active ? 0.26 : 0) - c.lift) * 0.12;
      c.mesh.position.y = c.baseY + c.lift + Math.sin(t * 1.1 + c.phase) * 0.015;
      c.m.emissiveIntensity = c.lift * 1.1;
    });

    let colorsChanged = false;
    barXs.forEach((x, i) => {
      const s = 1 + 0.9 * Math.exp(-((x - playX) ** 2) / 0.35);
      const h = (0.08 + amps[i] * 0.5) * s;
      dummy.position.set(x, TOP + 0.02 + h / 2 + 0.12, AUDIO_Z);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      bars.setMatrixAt(i, dummy.matrix);
      const played = x < playX;
      if (played !== barPlayed[i]) {
        barPlayed[i] = played;
        bars.setColorAt(i, played ? red : cream);
        colorsChanged = true;
      }
    });
    bars.instanceMatrix.needsUpdate = true;
    if (colorsChanged && bars.instanceColor) bars.instanceColor.needsUpdate = true;

    const ty = -0.5 + Math.sin(t * 0.35) * 0.18 + ptr.x * 0.35;
    const tx = ptr.y * 0.1;
    rig.rotation.y += (ty - rig.rotation.y) * 0.06;
    rig.rotation.x += (tx - rig.rotation.x) * 0.06;

    const float = Math.sin(t * 0.9) * 0.1;
    model.position.y = float;
    shadow.scale.setScalar(1 - float * 0.25);
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose && d.dispose());
    ticks.dispose();
    bars.dispose();
  };

  return { scene, camera, pointer, update, setAspect, dispose };
}

export default function TimelineModel({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return; // no WebGL: render nothing
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    mount.appendChild(renderer.domElement);

    const world = createTimelineScene();
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;

    const renderOnce = (t) => {
      world.update(t);
      renderer.render(world.scene, world.camera);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      renderOnce(clock.getElapsedTime());
    };
    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(tick); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      world.setAspect(w / h);
      if (reduce) renderOnce(4);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(mount);

    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      world.pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      world.pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const onLeave = () => { world.pointer.x = 0; world.pointer.y = 0; };
    if (!reduce) {
      mount.addEventListener('pointermove', onMove);
      mount.addEventListener('pointerleave', onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mount.removeEventListener('pointermove', onMove);
      mount.removeEventListener('pointerleave', onLeave);
      world.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" style={{ touchAction: 'pan-y' }} />;
}