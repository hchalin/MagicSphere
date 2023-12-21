import * as THREE from "three";
import { TextureLoader } from "three";
// import { SubdivisionModifier } from "three/examples/jsm/modifiers/SubdivisionModifier.js";
// import {SubdivisionModifier} from 'three/examples/jsm/modifiers/'
import Experience from "../Experience";
import Renderer from "../Renderer";

export default class Ring {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.world = this.experience.world;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Ring");
    }
    // scene model resource
    this.resource = this.resources.items.magicSphere;
    // scene models
    this.model = this.resource.scene;

    this.setAnimation();

    // Create the ring
    this.createRing();
  }

  createRing() {
    this.model.traverse((child) => {
      if (child.name === "RingModApp") {
        this.ring = child;
      }
    });
    // normalMap
    console.log(this.ring.material.normalMap);
    // roughnessMap
    console.log(this.ring.material.roughnessMap);
    this.roughnessMap = this.ring.material.roughnessMap;
    const roughnessMap = new THREE.TextureLoader().load(this.roughnessMap);
    const customMaterial = new THREE.MeshStandardMaterial({
      name: "custom",
      color: "#FFDD95",
      metalness: 1,
      roughness: 0.2,
      // roughnessMap: roughnessMap,
    });
    const standardMaterial = this.ring.material;

    this.ring.castShadow = true;
    // this.ring.recieveShadow = true;

    this.ring.geometry.computeVertexNormals(); // doesnt work
    this.ring.scale.x = 40;
    this.ring.scale.y = 40;
    this.ring.scale.z = 40;
    this.ring.position.y = 0.5;
    this.ring.geometry;
    // this.ring.material.wireframe = true
    // this.ring.material = new THREE.MeshBasicMaterial({ color: 'red' });

    //Use custom material
    let useCustomMaterial = false;

    //debug
    if (this.debug.active) {
      //material folder
      this.debugFolder.addColor(this.ring.material, "color");
      const ringMaterialFolder =
        this.debugFolder.addFolder("customRingMaterial");

      // Add checkbox to toggle between materials
      ringMaterialFolder
        .add({ useCustomMaterial: useCustomMaterial }, "useCustomMaterial")
        .onChange((value) => {
          useCustomMaterial = value;
          console.log(useCustomMaterial);
          this.ring.material = useCustomMaterial
            ? customMaterial
            : standardMaterial;
          console.log(this.ring.material.name);
        });
      ringMaterialFolder.close();

      if (this.ring.material.name === "custom") {
        this.debugFolder.addColor(this.ring.material, "color");
        this.debugFolder
          .add(this.ring.material, "metalness")
          .name("metalness")
          .min(0)
          .max(1)
          .step(0.01);
        this.debugFolder
          .add(this.ring.material, "roughness")
          .name("roughness")
          .min(0)
          .max(1)
          .step(0.01);
      }
      this.debugFolder.close();
    }
    // Add the ring to the scene
    this.scene.add(this.ring);
  }

  setAnimation() {
    // handle animations
  }
}
