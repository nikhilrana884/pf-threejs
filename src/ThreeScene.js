import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import craterTexture from './t1.jpg'; 
import houseModel from './model1.gltf';
import backgroundMusic from './bg.mp3'; 


const ThreeScene = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });

    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const audio = new Audio(backgroundMusic);
    audio.addEventListener('canplaythrough', () => {
      audio.play();
    });

    const planetRadius = 30;
    const planetSegments = 64;
    const planetGeometry = new THREE.SphereGeometry(planetRadius, planetSegments, planetSegments);
    const planetTexture = new THREE.TextureLoader().load(craterTexture);
const planetMaterial = new THREE.MeshPhongMaterial({
  map: planetTexture,
  shininess: 10,
  specular: 0x333333,
  side: THREE.FrontSide,
});
    
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);


    const houseSize = planetRadius * 0.15;
   
    
    const houseGeometry = new THREE.BoxGeometry(houseSize, houseSize, houseSize);
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(0, planetRadius + houseSize * 0.5, 0);
    scene.add(house);

    const loader = new GLTFLoader();
    loader.load(houseModel, (gltf) => {
      const house = gltf.scene;
      house.position.set(0, planetRadius + houseSize * 0.5, 0); 
      scene.add(house);
    });

    const rocketSize = planetRadius * 0.05;
    const rocketGeometry = new THREE.BoxGeometry(rocketSize, rocketSize, rocketSize);
    const rocketMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
    rocket.position.set(0, house.position.y + 1.5 * houseSize, 0);
    scene.add(rocket);
    const rocket2 = new THREE.Mesh(rocketGeometry, rocketMaterial);
    rocket2.position.set(0, house.position.y + 1.5 * houseSize, 0);
    scene.add(rocket2);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(500, 500, 50);
    scene.add(directionalLight);

    const numStars = 1600;

    for (let i = 0; i < numStars; i++) {
      const starSize = Math.random() * 0.2 + 0.03;
      const starGeometry = new THREE.SphereGeometry(starSize, 8, 8);

      const starColor = new THREE.Color(Math.random(), Math.random(), Math.random());
      const starMaterial = new THREE.MeshBasicMaterial({ color: starColor });

      const starDistance = Math.random() * planetRadius + 70;
      const starAngle = Math.random() * Math.PI * 2;
      const starX = starDistance * Math.cos(starAngle);
      const starY = starDistance * Math.sin(starAngle);
      const starZ = (Math.random() - 0.5) * planetRadius * 20;

      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(starX, starY, starZ);
      scene.add(star);

    }

    
    camera.position.set(0, house.position.y, planetRadius * 0.5);
    camera.lookAt(house.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = house.position; 
    controls.minDistance = planetRadius * 0.4; 
    controls.maxDistance = planetRadius * 1; 
    controls.minPolarAngle = Math.PI / 4; 
    controls.maxPolarAngle = Math.PI / 2; 
    
    const orbitRadius = planetRadius * 1.5; 
    const orbitSpeed = 0.0003; 

    const animate = () => {
      requestAnimationFrame(animate);
      const angle = orbitSpeed * Date.now();
  const posY = Math.sin(angle) * orbitRadius;
  const posZ = Math.cos(angle) * orbitRadius;
  rocket.position.set(0, posY, posZ);
  rocket2.position.set(posY, posZ, 0);

  rocket.lookAt(planet.position);
  rocket2.lookAt(planet.position);

  const lightAngle = Date.now() * 0.0001; 
  const lightDistance = planetRadius * 2;
  const lightX = Math.sin(lightAngle) * lightDistance;
  const lightZ = Math.cos(lightAngle) * lightDistance;
  directionalLight.position.set(lightX, 0, lightZ);

      
  

      controls.update(); 

      renderer.render(scene, camera);


    };

    animate();

    return () => {
     
      renderer.dispose();
      audio.pause();
      audio.src = '';
   
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default ThreeScene;
