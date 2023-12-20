import * as THREE from "three";
import Experience from "../Experience";

export default class MetalFloor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(5, 5);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.3,
      color: "#121212",
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
