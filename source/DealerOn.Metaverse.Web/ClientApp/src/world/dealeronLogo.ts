import { Actor, Engine } from "excalibur";
import { GameResource, imageSources } from "../resources/sources";

export class DealerOnLogo extends Actor {
  constructor(x : number, y : number) {
    super({ 
      x, y,
    });
  }
  
  onInitialize(_engine: Engine): void {
    this.graphics.use(imageSources.get(GameResource.Logo_Dealeron)!.toSprite());
  }
}