import { ScreenElement, Text } from "excalibur";
import { playerFontOrange } from "./resources";

export class PlayerTitle extends ScreenElement {
  private label : Text = new Text({ 
    text: "PLAYER 0", 
    font: playerFontOrange
  });
  private getPlayerId: () => number;

  constructor(getPlayerId : () => number) {
    super({ x: 12, y : 12, z: 100 });
    this.getPlayerId = getPlayerId;
  }

  onPreUpdate() {
    const playerId = this.getPlayerId();
    if (playerId !== 0) {
      this.label.text = `PLAYER ${playerId}`;
      this.graphics.use(this.label);
    } else {
      this.graphics.hide();
    }
  }
}