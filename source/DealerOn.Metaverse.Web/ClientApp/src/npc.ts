import { CollisionType, Engine, Font, Text, TextAlign } from "excalibur";
import { PlayerBase } from "./playerBase";
import { Blue } from "./theme";

export class Npc extends PlayerBase {
  private label: Text;  
  constructor(name: string, playerId: number, x: number, y: number) {
    super(name, x, y, "Blue", CollisionType.Active);
    this.playerId = playerId;
    this.label = new Text({
      text: `Player ${playerId}`,
      font: new Font({
        family: "Play",
        textAlign: TextAlign.Center,
        color: Blue,
        size: 12
      })
    })
  }

  onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    const labelFont = new Font({ textAlign: TextAlign.Center  });
    this.graphics.onPostDraw = ctx => this.label.draw(ctx, 0, -40);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
}