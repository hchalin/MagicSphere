import * as THREE from "three";
import Experience from "../Experience";

export default class MetalFloor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("MetalFloor");
    }

    this.setFloor();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(5, 5);
    this.material = new THREE.MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.3,
      color: "#121212",
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
    if (this.debug.active) {
      this.debugFolder
        .add(this.material, "metalness")
        .name("metalness")
        .min(0)
        .max(1)
        .step(0.01);
      this.debugFolder
        .add(this.material, "roughness")
        .name("roughness")
        .min(0)
        .max(1)
        .step(0.01);
    }
  }
}
