import { Actor, CollisionEndEvent, Engine, Text, Font, CollisionType, Shape, Vector } from "excalibur";
import { Player } from "../player/player";

export class Trophy extends Actor {
  constructor(x : number, y : number) {
    super({
      x, y,
      collider: Shape.Box(10,10, new Vector(0.5,1)),
      collisionType: CollisionType.Passive
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(new Text({ 
      text: "🏆",
      font: new Font({ size: 36 })
    }));
    this.on("collisionend", e => this.onCollisionEnd(e))
  }
  
  onCollisionEnd(e: CollisionEndEvent<Actor>): void {
    if (e.other instanceof Player) {
      this.actions.repeat(ctx => ctx.moveBy(0, -10, 50).moveBy(0, 10, 50), 2);
    }
  }
}