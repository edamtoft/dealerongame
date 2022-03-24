import { Actor, Engine, Font, Text } from "excalibur";
import { Level1Blocks, Level2Blocks } from "./colors";

export class WelcomeSign extends Actor {
  constructor(x : number, y : number) {
    super({ 
      x, y,
    });
  }
  
  onInitialize(_engine: Engine): void {
    this.graphics.use(new Text({
      text: "DealerOn Metaverse",
      color: Level1Blocks,
      font: new Font({ size: 36, family: "Roboto,Arial,sans-serif" })
    }))
  }
}