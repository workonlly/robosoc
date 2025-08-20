import * as THREE from 'three';

export function initThree(container) {
  // --- All your code below, but replace window.innerWidth/Height with container.clientWidth/Height ---
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#121212');

  const camera = new THREE.PerspectiveCamera(
    75, container.clientWidth / container.clientHeight, 0.1, 1000
  );
  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // (OrbitControls removed)

  // Lighting: cool, neutral, modern
  scene.add(new THREE.AmbientLight(0xbfc6d1, 0.45)); // soft blue-gray ambient
  const dirLight = new THREE.DirectionalLight(0xe0e6ee, 0.85); // cool white
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  // GEAR PARAMETERS
  const teeth = 12;
  const outerRadius = 5;
  const innerRadius = 3.5;
  const holeRadius = 2.3;
  const thickness = 1.3;

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
  gear.castShadow = true;
  gear.receiveShadow = true;
  gear.position.set(0, 0, -thickness / 2);
  gear.rotation.x = -Math.PI / 5; // Align flat to the ground
  gear.rotation.y = Math.PI / 9; // Rotate to face camera

  scene.add(gear);

  // Soft shadow plane (cool gray, not black)
  const shadowGeometry = new THREE.CircleGeometry(outerRadius * 1.2, 32);
  const shadowMaterial = new THREE.ShadowMaterial({ color: 0x22262a, opacity: 0.18 });
  const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -thickness / 2 - 0.05;
  shadowMesh.receiveShadow = true;
  scene.add(shadowMesh);

  // Animation loop

  let isHovering = false;
  let targetRotation = 0;
  let currentRotation = 0;
  const rotationSpeed = 0.08; // Increased for smoother, faster animation

  // Make sure the canvas has proper pointer events
  renderer.domElement.style.pointerEvents = 'all';
  renderer.domElement.style.cursor = 'pointer';

  // Add raycaster for more reliable hover detection
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(gear);

    if (intersects.length > 0) {
      if (!isHovering) {
        isHovering = true;
        targetRotation = currentRotation + Math.PI * 2; // 360 degrees from current position
        renderer.domElement.style.cursor = 'pointer';
      }
    } else {
      if (isHovering) {
        isHovering = false;
        targetRotation = Math.floor(currentRotation / (Math.PI * 2)) * Math.PI * 2; // Snap to nearest full rotation
        renderer.domElement.style.cursor = 'default';
      }
    }
  }

  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mouseenter', () => { 
    renderer.domElement.style.cursor = 'pointer';
  });
  renderer.domElement.addEventListener('mouseleave', () => { 
    isHovering = false; 
    targetRotation = Math.floor(currentRotation / (Math.PI * 2)) * Math.PI * 2;
    renderer.domElement.style.cursor = 'default';
  });

  function animate() {
    requestAnimationFrame(animate);
    
    // Smoother interpolation with easing
    const diff = targetRotation - currentRotation;
    if (Math.abs(diff) > 0.001) {
      currentRotation += diff * rotationSpeed;
      gear.rotation.z = currentRotation;
    }
    
    // Add a subtle continuous rotation when not hovering
    if (!isHovering) {
      gear.rotation.y += 0.002;
    }
    
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
