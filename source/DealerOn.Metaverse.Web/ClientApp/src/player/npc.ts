import { CollisionType, Engine, Font, Text, TextAlign } from "excalibur";
import { playerFontBlue } from "../resources/fonts";
import { PlayerBase } from "./playerBase";
import { playerBlue } from "../resources/playerSprites";
import { score } from "../symbols";

export class Npc extends PlayerBase {
  private label: Text;  
  private playerId: number;

  constructor(name: string, playerId: number, x: number, y: number) {
    super(name, x, y, 10, playerBlue, CollisionType.Active);
    this.playerId = playerId;
    this.label = new Text({
      text: `PLAYER ${playerId}`,
      font: playerFontBlue
    })
  }

  onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    this.graphics.onPostDraw = ctx => {
      this.label.text = `PLAYER ${this.playerId} ${this[score]}`
      this.label.draw(ctx, 0, -40);
    };
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
}