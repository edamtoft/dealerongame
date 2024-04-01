import { ScreenElement, Text } from "excalibur";
import { playerFontOrange } from "../resources/fonts";
import { Player } from "../player/player";

export class PlayerTitle extends ScreenElement {
  private label : Text = new Text({ 
    text: "PLAYER 0", 
    font: playerFontOrange
  });

  constructor(private getPlayerId : () => number, private getScore: () => number) {
    super({ x: 12, y : 12, z: 100 });
  }

  onPreUpdate() {
    const playerId = this.getPlayerId();
    if (playerId !== 0) {
      this.label.text = `PLAYER ${this.getPlayerId()} ${this.getScore()}`;
      this.graphics.use(this.label);
    } else {
      this.graphics.hide();
    }
  }
}