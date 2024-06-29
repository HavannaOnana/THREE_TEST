import * as THREE from 'three';
import './style.css';  // Make sure style.css exists if you're importing it

// Creating a new scene
const scene = new THREE.Scene();

// Adding the material and scene
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: 'orangered' });

// Creating a mesh and adding it to the scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Creating a camera
const temp = {
  width: 1024,
  height: 720
};

// Setting the arguments for the perspective camera
const fov = 75;
const aspect = temp.width / temp.height;  // Use temp.width and temp.height for aspect ratio
const near = 0.1;
const far = 100;  // Adjust far plane to ensure the cube is within the frustum

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 50;  // Adjust the position so the cube is in view

// Making a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(temp.width, temp.height);

// Append renderer to the DOM
document.body.appendChild(renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
