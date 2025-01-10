import Scroll from '@ts/components/Scroll';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', async () => {
  const scroll = new Scroll();
  await webgl();
});

const webgl = async () => {
  /**
   * Base
   */
  // Debug
  // const gui = new GUI();

  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new THREE.Scene();

  /**
   * Textures
   */
  // const textureLoader = new THREE.TextureLoader();
  // const particleTexture = textureLoader.load('/textures/particles/2.png');

  /**
   * Particles
   */

  //canvasにテクスチャを作成
  function generate() {
    //canvasで小さい丸の作成
    const canvas = document.createElement('canvas');
    canvas.width = 5;
    canvas.height = 5;

    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.1, 'rgba(170,248,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,37,97,1)');
    gradient.addColorStop(1, 'rgba(0.5,0.5,0.2,1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Geometry
  // const particlesGeomery = new THREE.SphereBufferGeometry(1, 32, 32);
  const particlesGeomery = new THREE.BufferGeometry();
  const count = 15000;

  const position = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    position[i] = (Math.random() - 0.5) * 1000 - 100;
    colors[i] = Math.random();
  }

  particlesGeomery.setAttribute(
    'position',
    new THREE.BufferAttribute(position, 3),
  );
  particlesGeomery.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Material
  const particlesMaterial = new THREE.PointsMaterial();
  particlesMaterial.size = 20;
  particlesMaterial.sizeAttenuation = true;
  particlesMaterial.color = new THREE.Color('#ffffff');
  particlesMaterial.map = generate();
  particlesMaterial.transparent = true;
  // particlesMaterial.alphaMap = particleTexture;
  // particlesMaterial.alphaTest = 0.001;
  // particlesMaterial.depthTest = false;
  particlesMaterial.depthWrite = false;
  particlesMaterial.blending = THREE.AdditiveBlending;
  particlesMaterial.vertexColors = true;

  // Points
  const particles = new THREE.Points(particlesGeomery, particlesMaterial);
  scene.add(particles);

  // Cube
  // const cube = new THREE.Mesh(
  //   new THREE.BoxGeometry(),
  //   new THREE.MeshBasicMaterial({
  //     side: THREE.DoubleSide,
  //     color: new THREE.Color('#ccbbff')
  //   })
  // );
  // scene.add(cube);

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    10000,
  );
  // camera.position.x = 750;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update particles
    // particles.rotation.y = elapsedTime * 0.2;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      if (particlesGeomery.attributes.position.array[i3 + 1] > 500) {
        particlesGeomery.attributes.position.array[i3 + 1] =
          (Math.random() - 0.5) * 1000 - 100;
      }

      // colors[i] = 0xffff;

      const y = particlesGeomery.attributes.position.array[i3 + 1];
      particlesGeomery.attributes.position.array[i3 + 1] +=
        Math.random() - 0.5 * 0.01;
    }

    const radian = (elapsedTime * Math.PI) / 180;

    camera.position.set(
      Math.sin(-Math.PI * elapsedTime * 0.1) * 100 - 10,
      0,
      Math.cos(-Math.PI * elapsedTime * 0.1) * 100 - 10,
    );

    particlesGeomery.attributes.position.needsUpdate = true;

    // Update controls
    controls.update();

    // Render
    render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
  // render();

  function render() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
};
