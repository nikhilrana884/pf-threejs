import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const planetRadius = 20;
    const planetSegments = 64;
    const planetGeometry = new THREE.SphereGeometry(planetRadius, planetSegments, planetSegments);
    const planetMaterial = new THREE.MeshPhongMaterial({
      color: 0x0088ff,
      shininess: 50,
      specular: 0xaaaaaa,
      side: THREE.DoubleSide,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);


    const houseSize = planetRadius * 0.15;
    const houseGeometry = new THREE.BoxGeometry(houseSize, houseSize, houseSize);
    const houseMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(0, planetRadius + houseSize * 0.5, 0);
    scene.add(house);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);


    camera.position.set(0, house.position.y, planetRadius * 0.5);
    camera.lookAt(house.position);

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update(); 

      renderer.render(scene, camera);


    };

    animate();

    return () => {
      renderer.dispose();
   
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default ThreeScene;
