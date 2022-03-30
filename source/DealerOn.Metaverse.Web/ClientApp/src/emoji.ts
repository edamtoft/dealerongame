import { Actor, Engine, Text } from "excalibur";
import { emojiFont } from "./resources";

export class Emoji extends Actor {
  private text: string;
  constructor(x : number, y : number, text : string) {
    super({
      x,y
    });
    this.text = text;
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(new Text({ 
      text: this.text,
      font: emojiFont
    }));
  }
}