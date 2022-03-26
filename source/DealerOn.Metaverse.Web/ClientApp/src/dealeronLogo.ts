import { Actor, Engine } from "excalibur";
import { logo } from "./resources";

export class DealerOnLogo extends Actor {
  constructor(x : number, y : number) {
    super({ 
      x, y,
    });
  }
  
  onInitialize(_engine: Engine): void {
    this.graphics.use(logo.toSprite());
  }
}