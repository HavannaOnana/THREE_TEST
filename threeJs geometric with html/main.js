import * as THREE from 'three';
import './style.css';  // Make sure style.css exists if you're importing it

// We are making a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.outerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Making a camera
const fov = 80;
const aspect = window.innerWidth / window.outerHeight;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Making a new scene 
const scene = new THREE.Scene();

// Adding the geometry and material
const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,  // Fixed color value
  flatShading: true
});

// Adding a mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Adding a light
const hemiLight = new THREE.HemisphereLight("lightblue", "black");
scene.add(hemiLight);


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();
