import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';  // Make sure style.css exists if you're importing it

// We are making a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.outerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Making a camera
const fov = 66;
const aspect = window.innerWidth / window.outerHeight;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Making a new scene 
const scene = new THREE.Scene();

// Adding the geometry and material
const geometry = new THREE.IcosahedronGeometry(1, 20);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});

const loader = new THREE.TextureLoader();
const texture = loader.load('/textures/earthy.jpg', 
  function ( texture ) {
    // onLoad callback
    material.map = texture;
    material.needsUpdate = true;
  },
  undefined, // onProgress callback, currently not used
  function ( err ) {
    console.error('An error happened while loading the texture.');
  }
);


// Adding a mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Adding a light
const hemiLight = new THREE.HemisphereLight("black", "white");
scene.add(hemiLight);

// making something different in the controls
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableZoom = false;

// this event listner prevent us from zooming in
window.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();  // Prevent zooming via Ctrl + Mouse Wheel
  }
}, { passive: false });

//adding sunlight
const Sunlight = new THREE.DirectionalLight("white");
Sunlight.position.set(-12,-0.5,1.5);
scene.add(Sunlight);


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.0008;
  renderer.render(scene, camera);
}

animate();
