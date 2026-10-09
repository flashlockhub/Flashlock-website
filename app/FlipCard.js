"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { sitePath } from '../lib/site';
import styles from './flip-card.module.css';

// Zoo-generated geometry, served locally. No account or remote API at runtime.
export default function FlipCard({ revealed, onRevealChange, front, back, ...props }) {
  const stage = useRef(null);
  const canvas = useRef(null);
  const angle = useRef(0);
  const draw = useRef(null);
  const frame = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const targetAngle = useRef(0);
  const paint = useCallback(value => {
    angle.current = value;
    if (!stage.current) return;
    stage.current.style.setProperty('--turn', `${value}deg`);
    stage.current.dataset.angle = value.toFixed(1);
    draw.current?.();
  }, []);
  const settle = useCallback((to, duration = 360) => {
    cancelAnimationFrame(frame.current);
    targetAngle.current = to;
    const root = stage.current;
    const from = angle.current;
    const finish = () => { paint(to); root.dataset.flipping = 'false'; };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(from - to) < .1) { finish(); return; }
    const start = performance.now(); root.dataset.flipping = 'true';
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      paint(from + (to - from) * (t * t * (3 - 2 * t)));
      if (t < 1) frame.current = requestAnimationFrame(tick); else finish();
    };
    frame.current = requestAnimationFrame(tick);
  }, [paint]);
  function nearestSide(backSide, at = angle.current) {
    const base = backSide ? 180 : 0;
    const a = base + Math.floor((at - base) / 360) * 360, b = a + 360;
    const da = Math.abs(at - a), db = Math.abs(at - b);
    if (Math.abs(da - db) < .001) return Math.abs(a) < Math.abs(b) ? a : b;
    return da < db ? a : b;
  }
  function startDrag(event) {
    suppressClick.current = false;
    if (!event.isPrimary || event.button !== 0 || event.target.closest('[data-card-tool]')) return;
    cancelAnimationFrame(frame.current);
    setAnswerFace(back);
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, angle: angle.current, width: stage.current.clientWidth, dragging: false, side: revealed };
    stage.current.setPointerCapture(event.pointerId);
  }
  function moveDrag(event) {
    const g = gesture.current;
    if (!g || event.pointerId !== g.id) return;
    const dx = event.clientX - g.x, dy = event.clientY - g.y;
    if (!g.dragging) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { cancelDrag(event); return; }
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      g.dragging = true; stage.current.dataset.dragging = 'true'; stage.current.dataset.flipping = 'true';
    }
    event.preventDefault();
    // Absolute distance from pointer-down: reversing direction immediately reverses the card.
    paint(g.angle + dx * 180 / (g.width * .7));
  }
  function endDrag(event) {
    const g = gesture.current;
    if (!g || event.pointerId !== g.id) return;
    gesture.current = null; suppressClick.current = true;
    stage.current.dataset.dragging = 'false';
    if (stage.current.hasPointerCapture(g.id)) stage.current.releasePointerCapture(g.id);
    const to = g.dragging ? Math.round(angle.current / 180) * 180 : nearestSide(!revealed);
    const next = Math.abs(Math.round(to / 180) % 2) === 1;
    settle(to, g.dragging ? 300 : 720);
    if (next !== revealed) onRevealChange(next);
  }
  function cancelDrag(event) {
    const g = gesture.current;
    if (!g || (event && event.pointerId !== g.id)) return;
    gesture.current = null; suppressClick.current = g.dragging;
    stage.current.dataset.dragging = 'false';
    if (stage.current.hasPointerCapture(g.id)) stage.current.releasePointerCapture(g.id);
    settle(nearestSide(g.side), 240);
  }
  const [ready, setReady] = useState(false);
  // Keep the previous answer on the departing face when rating advances the deck.
  const [answerFace, setAnswerFace] = useState(back);
  useEffect(() => { if (revealed) setAnswerFace(back); }, [revealed, back]);
  useEffect(() => {
    const root = stage.current;
    let disposed = false, renderer, scene, camera, model, observer;
    let materials = [];
    let geometries = [];
    const loseContext = event => { event.preventDefault(); setReady(false); };
    canvas.current.addEventListener('webglcontextlost', loseContext);
    const element = canvas.current;
    async function load() {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        if (disposed) return;
        const context = element.getContext('webgl2', { antialias: true, alpha: true, powerPreference: 'low-power' });
        if (!context) return;
        renderer = new THREE.WebGLRenderer({ canvas: element, context, antialias: true, alpha: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(30, 1, .1, 2000);
        camera.position.z = 800;
        scene.add(new THREE.HemisphereLight(0xffffff, 0x7a73be, 2.2));
        const light = new THREE.DirectionalLight(0xffffff, 2.1);
        light.position.set(-150, 250, 600); scene.add(light);
        const gltf = await new GLTFLoader().loadAsync(sitePath('/models/flashcard.glb'));
        if (disposed) { gltf.scene.traverse(obj => { obj.geometry?.dispose(); if (obj.material) [obj.material].flat().forEach(m => m.dispose()); }); return; }
        const asset = gltf.scene;
        asset.rotation.x = Math.PI / 2; // Zoo glTF exports the CAD XY face in XZ.
        asset.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(asset);
        const size = box.getSize(new THREE.Vector3());
        const centre = box.getCenter(new THREE.Vector3());
        asset.position.sub(centre);
        asset.traverse(obj => {
          if (!obj.isMesh) return;
          geometries.push(obj.geometry);
          [obj.material].flat().forEach(m => m.dispose());
          obj.material = new THREE.MeshStandardMaterial({ color: 0xfafaff, roughness: .42, metalness: .12 });
          materials.push(obj.material);
        });
        const fit = new THREE.Group(); fit.add(asset);
        model = new THREE.Group(); model.add(fit); scene.add(model);
        const render = () => {
          if (disposed || renderer.getContext().isContextLost()) return;
          model.rotation.y = angle.current * Math.PI / 180;
          model.rotation.z = -Math.sin(angle.current * Math.PI / 180) * .025;
          renderer.render(scene, camera);
        };
        draw.current = render;
        const resize = () => {
          const { width, height } = root.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.fov = 2 * Math.atan(height / 1600) * 180 / Math.PI;
          camera.updateProjectionMatrix();
          fit.scale.set((width - 14) / size.x, (height - 14) / size.y, 3.8 / size.z);
          render();
        };
        observer = new ResizeObserver(resize); observer.observe(root);
        resize(); setReady(true);
      } catch {
        // The readable CSS front/back remains usable without WebGL or model loading.
        if (!disposed) setReady(false);
      }
    }
    load();
    return () => {
      disposed = true; draw.current = null; observer?.disconnect();
      element.removeEventListener('webglcontextlost', loseContext);
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
      renderer?.dispose();
    };
  }, []);
  useEffect(() => {
    if (!gesture.current) settle(nearestSide(revealed), 720);
  }, [revealed, settle]);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      if (reduced.matches && !gesture.current) {
        cancelAnimationFrame(frame.current); paint(targetAngle.current);
        stage.current.dataset.flipping = 'false';
      }
    };
    reduced.addEventListener('change', onMotion);
    return () => { cancelAnimationFrame(frame.current); reduced.removeEventListener('change', onMotion); };
  }, [paint]);
  return <div {...props} ref={stage} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag}
    onClickCapture={event => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
    data-renderer={ready ? 'zoo-webgl' : 'css-fallback'} className={`${props.className || ''} ${styles.stage}`}>
    <canvas ref={canvas} className={styles.canvas} aria-hidden="true"/>
    <div className={`${styles.face} ${styles.front}`} aria-hidden={revealed} inert={revealed}>{front}</div>
    <div className={`${styles.face} ${styles.back}`} aria-hidden={!revealed} inert={!revealed}>{answerFace}</div>
  </div>;
}
