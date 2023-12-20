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

    // books
    this.setTableTop();
    this.addTableTop();
  }

  setModels() {
    this.model = this.resource.scene;
    // console.log(this.model.children);
  }

  setRing() {
    this.model.traverse((child) => {
      if (child.name === "Ring") {
        this.ring = child;
      }
    });
    this.ring.scale.x = 30;
    this.ring.scale.y = 30;
    this.ring.scale.z = 30;

    this.ring.position.y += 0.2;
  }

  addRing() {
    this.scene.add(this.ring);
  }

  setTableTop() {
    this.model.traverse((child) => {
      if (child.name === "TableTop") {
        this.tableTop = child;
      }
    });

    this.tableTop.rotation.x = 0;
    if (this.debug.active && this.tableTop) {
      console.log("debug is active and the table top is in the scene");

      this.debugFolder
        .add(this.tableTop.rotation, "x")
        .name("rotationX")
        .min(-1)
        .max(1)
        .step(0.0001);
    }
  }
  addTableTop() {
    this.scene.add(this.tableTop);
  }

  setAnimation() {
    // handle animations
  }
}
