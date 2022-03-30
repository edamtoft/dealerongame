import { Engine, Font, ScreenElement, Text, Vector } from "excalibur";
import { Orange } from "./theme";

export class PlayerTitle extends ScreenElement {
  private label : Text = new Text({ 
    text: "Connecting...", 
    font: new Font({ 
      family: "Play", 
      size: 32,
      color: Orange
    })
  });
  private getPlayerId: () => number;

  constructor(getPlayerId : () => number) {
    super({ x: 12, y : 44 });
    this.getPlayerId = getPlayerId;
  }

  onInitialize(_engine : Engine) : void {
    this.graphics.use(this.label);
  }

  onPreUpdate() {
    const playerId = this.getPlayerId();
    if (playerId !== 0) {
      this.label.text = `Player ${playerId}`;
    }
  }
}