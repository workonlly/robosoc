import * as THREE from 'three';

export function initThree(container) {
  // --- All your code below, but replace window.innerWidth/Height with container.clientWidth/Height ---
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#121212');

  const camera = new THREE.PerspectiveCamera(
    75, container.clientWidth / container.clientHeight, 0.1, 1000
  );
  camera.position.set(0, 0, 20);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // (OrbitControls removed)

  // Simple White Lighting Setup
  // 1. Ambient light - soft overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // White ambient
  scene.add(ambientLight);

  // 2. Main directional light
  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8); // White directional light
  mainLight.position.set(10, 10, 5);
  scene.add(mainLight);

  // 3. Fill light from opposite side
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3); // White fill light
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  // GEAR PARAMETERS
  const teeth = 12;
  const outerRadius = 8;     // Increased from 5 to 8
  const innerRadius = 5.6;   // Increased from 3.5 to 5.6 (maintaining proportion)
  const holeRadius = 3.7;    // Increased from 2.3 to 3.7 (maintaining proportion)
  const thickness = 2.1;     // Increased from 1.3 to 2.1 (maintaining proportion)

  // Equal tip and valley widths, flanks split the rest
  const tipFlatFrac = 0.3;      // flat part at the tip (tooth top)
  const valleyFlatFrac = 0.3;   // flat part at the valley (root)
  const edgeFrac = (1 - tipFlatFrac - valleyFlatFrac) / 2; // rising/falling edge

  // For rounder teeth
  const curveSegments = 16;

  const shape = new THREE.Shape();
  const anglePerTooth = (Math.PI * 2) / teeth;

  for (let t = 0; t < teeth; t++) {
    const angleStart = t * anglePerTooth;

    // ANGLES within one tooth
    const angleTipFlatStart = angleStart;
    const angleTipFlatEnd = angleStart + anglePerTooth * tipFlatFrac;
    const angleDrop = angleTipFlatEnd + anglePerTooth * edgeFrac;
    const angleValleyFlatEnd = angleDrop + anglePerTooth * valleyFlatFrac;
    const angleRise = angleValleyFlatEnd + anglePerTooth * edgeFrac;

    if (t === 0) {
      shape.moveTo(Math.cos(angleTipFlatStart) * outerRadius, Math.sin(angleTipFlatStart) * outerRadius);
    }

    // 1. Flat tip (outer)
    shape.lineTo(Math.cos(angleTipFlatEnd) * outerRadius, Math.sin(angleTipFlatEnd) * outerRadius);

    // 2. Drop down (edge)
    shape.lineTo(Math.cos(angleDrop) * innerRadius, Math.sin(angleDrop) * innerRadius);

    // 3. Flat valley (inner)
    shape.lineTo(Math.cos(angleValleyFlatEnd) * innerRadius, Math.sin(angleValleyFlatEnd) * innerRadius);

    // 4. Rise up (edge)
    shape.lineTo(Math.cos(angleRise) * outerRadius, Math.sin(angleRise) * outerRadius);
  }
  shape.closePath();

  // Central hole
  const hole = new THREE.Path();
  hole.absellipse(0, 0, holeRadius, holeRadius, 0, Math.PI * 2, false, 0);
  shape.holes.push(hole);

  // Extrude for 3D with bevel for elegance
  const extrudeSettings = {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.22,
    bevelSegments: 6,
    curveSegments: curveSegments
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  // Environment map for subtle reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTexture = pmremGenerator.fromScene(new THREE.Scene(), 0.04).texture;

  // Mesh and material
  const material = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0, // light silver
    metalness: 0.95,
    roughness: 0.18,
    envMap: envTexture,
    envMapIntensity: 0.7
  });
  const gear = new THREE.Mesh(geometry, material);
  gear.position.set(0, 0, -thickness / 2);
  gear.rotation.x = -Math.PI / 5; // Align flat to the ground
  gear.rotation.y = Math.PI / 9; // Rotate to face camera

  scene.add(gear);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Continuous rotation
    gear.rotation.z += 0.01;
    gear.rotation.y += 0.002;
    
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Optionally, return a cleanup function
  return () => {
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}
