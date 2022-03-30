import { Engine, ScreenElement, Text } from "excalibur";
import { playerFontOrange } from "./resources";

export class PlayerTitle extends ScreenElement {
  private label : Text = new Text({ 
    text: "PLAYER 0", 
    font: playerFontOrange
  });
  private getPlayerId: () => number;

  constructor(getPlayerId : () => number) {
    super({ x: 12, y : 44, z: 100 });
    this.getPlayerId = getPlayerId;
  }

  onInitialize(_engine : Engine) : void {
    this.graphics.use(this.label);
  }

  onPreUpdate() {
    const playerId = this.getPlayerId();
    if (playerId !== 0) {
      this.label.text = `PLAYER ${playerId}`;
    }
  }
}