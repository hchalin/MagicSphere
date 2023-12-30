import * as THREE from "three";
import { TextureLoader } from "three";
import Experience from "../../Experience";

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
    // layers test

    //Textures
    const greasyPlateTexture = this.resources.items.greasyPlate;
    const vikingRunesTexture = this.resources.items.vikingRunes;
    vikingRunesTexture.flipY = false;
    // Set texture wrap and repeat properties
    greasyPlateTexture.wrapS = THREE.RepeatWrapping;
    greasyPlateTexture.wrapT = THREE.RepeatWrapping;
    greasyPlateTexture.repeat.set(1, 1);

    //Materials
    const standardMaterial = this.ring.material;
    const vikingRunesShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: vikingRunesTexture },
      },
      // vertexShader:
    });

    const customMaterial = new THREE.MeshStandardMaterial({
      name: "custom",
      color: "#FFDD95",
      metalness: 1,
      roughnessMap: greasyPlateTexture,
      roughness: 0.8,
      // normalMap: vikingRunesTexture, // this is adding block texture to mesh
      // normalScale: new THREE.Vector2(1, 1),
      emissive: "#7CFFFF", // look at making this a shaderMaterial???
      emissiveIntensity: 1,
      // emissiveMap: vikingRunesShaderTexture,
      emissiveMap: vikingRunesTexture,
    });

    // Combine shader material and custom material
    const multiMaterial = [customMaterial, vikingRunesShaderMaterial];

    //Shadows
    this.ring.castShadow = true;
    this.ring.recieveShadow = true;

    // scale and position
    this.ring.scale.x = 40;
    this.ring.scale.y = 40;
    this.ring.scale.z = 40;
    // this.ring.position.y = 0.5;
    // this.ring.position.x = 0;
    // this.ring.position.z = 0;
    this.ring.position.set(0, 0.4, 0);

    let useCustomMaterial = true;
    this.ring.material = customMaterial;
    // this.ring.material = vikingRunesShaderTexture;
    // this.ring.material = standardMaterial;
    //debug
    if (this.debug.active) {
      //material folder

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
          console.log("Using original material");
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
      // closed by default
      // this.debugFolder.close();
    }
    // Add the ring to the scene
    this.scene.add(this.ring);
  }

  setAnimation() {
    // handle animations
  }
}
