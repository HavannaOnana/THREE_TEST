import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';  // Make sure style.css exists if you're importing it
import { getFresnelMat } from '../getFresnelMat';
import getStarfield from '../getStarfield';
import gsap from 'gsap';


// We are making a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.outerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Making a camera
const fov = 30;
const aspect = window.innerWidth / window.outerHeight;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = -1;

// Making a new scene 
const scene = new THREE.Scene();

//adding a loader
const loader = new THREE.TextureLoader();

// Adding the geometry and material
const geometry = new THREE.IcosahedronGeometry(1, 20);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map : loader.load('/textures/earthy.jpg')
});

//making the earthgroup
const earthGroup = new THREE.Group();
earthGroup.position.y = -2;
earthGroup.position.x = -2;
earthGroup.position.z = 2;
scene.add(earthGroup);



// Adding a mesh
const EarthMesh = new THREE.Mesh(geometry, material);
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.add(EarthMesh);

// Adding a light
const hemiLight = new THREE.HemisphereLight("black", "lightblue");
scene.add(hemiLight);

// making something different in the controls
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false;

// this event listner prevent us from zooming in
window.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();  // Prevent zooming via Ctrl + Mouse Wheel
  }
}, { passive: false });

//adding sunlight
const Sunlight = new THREE.DirectionalLight("white");
Sunlight.position.set(-2,0.5,1.5);
scene.add(Sunlight);

// code for making the light on earth
const lightsMat = new THREE.MeshBasicMaterial({
  map : loader.load('/textures/earthdark.png'),
  blending : THREE.AdditiveBlending,
  transparent: true,
})

const lightsMesh = new THREE.Mesh(geometry,lightsMat);
earthGroup.add(lightsMesh);

//adding clouds too
const cloudMat = new THREE.MeshBasicMaterial({
  map : loader.load('/textures/clouds.jpg'),
  blending : THREE.AdditiveBlending
})

const cloudMesh = new THREE.Mesh(geometry,cloudMat);
cloudMesh.scale.setScalar(1.005);
earthGroup.add(cloudMesh);

//making a new mesh for the glow
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry,fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// going to add stars
const stars = getStarfield({numStars : 20000});
scene.add(stars);


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  EarthMesh.rotation.y += 0.0008;
  lightsMesh.rotation.y += 0.0008;
  cloudMesh.rotation.y += 0.001;
  glowMesh.rotation.y += 0.0008;
  renderer.render(scene, camera);
}

animate();

function zoomToPoint(targetPosition) {
  gsap.to(camera.position, {
    duration: 40,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    onUpdate: () => {
      camera.lookAt(earthGroup.position);
    }
  });
}

// Call the zoom function with the desired target position
const targetPosition = new THREE.Vector3(-1, 0, 10); // Change this to your desired zoom target position
zoomToPoint(targetPosition)

