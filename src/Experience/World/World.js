import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import MetalFloor from "./MetalFloor.js";
import Fox from "./Fox.js";
import Ring from "./Ring/Ring.js";

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
      this.ring = new Ring();
      this.metalFloor = new MetalFloor();
      this.environment = new Environment();
    });
  }

  update() {
    // this is getting called every frame if the fox is in the scene
    if (this.fox) {
      this.fox.update();
    }
  }
}
