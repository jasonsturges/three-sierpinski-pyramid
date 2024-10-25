import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SierpinskiPyramidGeometry } from "./geometry/SierpinskiPyramidGeometry.js";
import { GUI } from "dat.gui";

// Create a new scene
const scene = new THREE.Scene();

// Set up a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

// Add controls to orbit around the scene
const controls = new OrbitControls(camera, renderer.domElement);

// Create initial material and mesh
const geometry = new SierpinskiPyramidGeometry(8, 10);
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);

// Render loop
renderer.setAnimationLoop((timestamp) => {
  // Rotate the pyramid
  pyramid.rotation.y += 0.001;

  controls.update();
  renderer.render(scene, camera);
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const gui = new GUI();
gui
  .add({ level: 8 }, "level", 0, 8, 1)
  .name("Level")
  .onChange((value) => {
    scene.remove(pyramid);
    pyramid.geometry = new SierpinskiPyramidGeometry(value, 10);
    scene.add(pyramid);
  });

gui.add(camera, "fov", 1, 120).name("FOV").onChange(() => {
  camera.updateProjectionMatrix();
});

gui.add({ wireframe: true }, "wireframe").name("Wireframe").onChange((value) => {
  pyramid.material.wireframe = value;
});



