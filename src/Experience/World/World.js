import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import MetalFloor from "./MetalFloor.js";
import Fox from "./Fox.js";
import MagicSphere from "./MagicSphere.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // this.floor = new Floor();
      // this.fox = new Fox();
      // this.magicSphere = new MagicSphere();
      this.metalFloor = new MetalFloor();
      this.environment = new Environment();
    });
  }

  update() {
    // this is getting called every frame if the fox is in the scene
    if (this.fox) {
      console.log("the fox is in the scene");
      this.fox.update();
    }
  }
}
