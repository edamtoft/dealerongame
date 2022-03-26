import { Actor, Engine, Font, Text } from "excalibur";

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
      font: new Font({ size: 36 })
    }));
  }
}