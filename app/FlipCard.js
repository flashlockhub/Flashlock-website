"use client";

import { useEffect, useRef, useState } from 'react';
import { sitePath } from '../lib/site';
import styles from './flip-card.module.css';

// Zoo-generated geometry, served locally. No account or remote API at runtime.
export default function FlipCard({ revealed, front, back, ...props }) {
  const stage = useRef(null);
  const canvas = useRef(null);
  const angle = useRef(0);
  const draw = useRef(null);
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
    const root = stage.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const from = angle.current, to = revealed ? 180 : 0;
    const paint = value => {
      angle.current = value;
      root.style.setProperty('--turn', `${value}deg`);
      root.dataset.angle = value.toFixed(1);
      draw.current?.();
    };
    const finish = () => { cancelAnimationFrame(frame); paint(to); root.dataset.flipping = 'false'; };
    if (reduced.matches || from === to) finish();
    else {
      const start = performance.now(); root.dataset.flipping = 'true';
      const tick = now => {
        const t = Math.min((now - start) / 720, 1);
        const eased = t * t * (3 - 2 * t);
        paint(from + (to - from) * eased);
        if (t < 1) frame = requestAnimationFrame(tick); else finish();
      };
      frame = requestAnimationFrame(tick);
    }
    const onMotion = () => { if (reduced.matches) finish(); };
    reduced.addEventListener('change', onMotion);
    return () => { cancelAnimationFrame(frame); reduced.removeEventListener('change', onMotion); };
  }, [revealed]);
  return <div {...props} ref={stage} data-renderer={ready ? 'zoo-webgl' : 'css-fallback'} className={`${props.className || ''} ${styles.stage}`}>
    <canvas ref={canvas} className={styles.canvas} aria-hidden="true"/>
    <div className={`${styles.face} ${styles.front}`} aria-hidden={revealed} inert={revealed}>{front}</div>
    <div className={`${styles.face} ${styles.back}`} aria-hidden={!revealed} inert={!revealed}>{answerFace}</div>
  </div>;
}
