import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import GUI from 'lil-gui';
import { distance } from 'three/examples/jsm/nodes/Nodes.js';

const canvas = document.querySelector('canvas.webgl'); // Canvas
const scene = new THREE.Scene(); // Scene
const gui = new GUI(); // Debug

//======================= Lights ========================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3()); // look at the "Center"
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

const ambientLights = gui.addFolder('AmbientLight').close();
const directionalLights = gui.addFolder('DirectionalLight').close();
const hemisphereLights = gui.addFolder('HemisphereLight').close();
const pointLights = gui.addFolder('PointLight').close();
const rectAreaLights = gui.addFolder('RectAreaLight').close();
const spotLights = gui.addFolder('SpotLight').close();

ambientLights
  .add(ambientLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.001)
  .name('intensity');
  
directionalLights
  .add(directionalLight, 'intensity')
  .min(0)
  .max(2)
  .step(0.001)
  .name('intensity');

hemisphereLights
  .add(hemisphereLight, 'intensity')
  .min(0)
  .max(2)
  .step(0.001)
  .name('intensity');

pointLights
  .add(pointLight, 'intensity')
  .min(0)
  .max(2)
  .step(0.001)
  .name('intensity');
pointLights
  .add(pointLight, 'distance')
  .min(0)
  .max(20)
  .step(0.01)
  .name('distance');
pointLights
  .add(pointLight, 'decay')
  .min(0)
  .max(5)
  .step(0.01)
  .name('decay');

rectAreaLights
  .add(rectAreaLight, 'intensity')
  .min(0)
  .max(10)
  .step(0.01)
  .name('intensity');
rectAreaLights
  .add(rectAreaLight, 'width')
  .min(0)
  .max(10)
  .step(0.001)
  .name('width');
rectAreaLights
  .add(rectAreaLight, 'height')
  .min(0)
  .max(10)
  .step(0.001)
  .name('height');

spotLights
  .add(spotLight, 'intensity')
  .min(0)
  .max(10)
  .step(0.001)
  .name('intensity');
spotLights
  .add(spotLight, 'distance')
  .min(0)
  .max(15)
  .step(0.001)
  .name('distance');
spotLights
  .add(spotLight, 'angle')
  .min(0)
  .max(1)
  .step(0.0001)
  .name('angle');
spotLights
  .add(spotLight, 'penumbra')
  .min(0)
  .max(2)
  .step(0.0001)
  .name('penumbra');
spotLights
  .add(spotLight, 'decay')
  .min(0)
  .max(2)
  .step(0.0001)
  .name('decay');

//======================= Objects ========================
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

//====================== Camera ==========================
let width = window.innerWidth;
let height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

//=================== Orbit Controls =====================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//===================== Renderer =========================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//==================== Resize Listener ===================
window.addEventListener('resize', () => {
  // Update sizes
  width = window.innerWidth;
  height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//==================== Animate ==========================
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
