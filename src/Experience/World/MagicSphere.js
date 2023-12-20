import * as THREE from "three";
// import { SubdivisionModifier } from "three/examples/jsm/modifiers/SubdivisionModifier.js";
// import {SubdivisionModifier} from 'three/examples/jsm/modifiers/'
import Experience from "../Experience";
import Renderer from "../Renderer";

export default class MagicSphere {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("MagicSphere");
    }
    this.resource = this.resources.items.magicSphere;

    // Model resource
    this.setModels();
    this.setAnimation();

    // Ring
    this.setRing();
    // this.addRing();

    // Book
    this.setBooks();
    this.addBooks();

    // books
    // this.setTableTop();
    // this.addTableTop();
  }

  setModels() {
    this.model = this.resource.scene;
    console.log(this.model);
  }

  setRing() {
    this.model.traverse((child) => {
      if (child.name === "RingModApp") {
        this.ring = child;
      }
    });
    console.log(this.ring);
    this.ring.scale.x = 40;
    this.ring.scale.y = 40;
    this.ring.scale.z = 40;
    this.ring.position.y = 0.5;
    // this.ring.material.wireframe = true

    // this.ring.position.y += 0.2;
  }

  addRing() {
    this.scene.add(this.ring);
  }

  setBooks() {
    // Dont worry about the books right now
    this.model.traverse((child) => {
      if (child.name === "Book_WarnModApp") {
        this.bookWarn = child;
      }
    });
    this.bookWarn.material.wireframe = true
    this.bookWarn.scale.x = 40;
    this.bookWarn.scale.y = 40;
    this.bookWarn.scale.z = 40;
  }

  // addBooks() {
  //   this.scene.add(this.bookWarn);
  // }

  setAnimation() {
    // handle animations
  }
}
