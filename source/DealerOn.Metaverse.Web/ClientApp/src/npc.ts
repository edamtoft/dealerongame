import { CollisionType, Engine, Text } from "excalibur";
import { PlayerBase } from "./playerBase";

export class Npc extends PlayerBase {
  private label: Text;
  
  constructor(name: string, x: number, y: number) {
    super(name, x, y, "Blue", CollisionType.Active);
    this.label = new Text({ text: name.substring(0, 6) });
  }

  onInitialize(_engine: Engine): void {
    super.onInitialize(_engine);
    this.graphics.onPostDraw = ctx => this.label.draw(ctx, -20, -40);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
}