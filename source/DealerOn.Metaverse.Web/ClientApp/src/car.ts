import { Actor, CollisionType, Engine, Shape, Vector } from "excalibur";
import { cars } from "./resources";

export class Suv extends Actor {
  constructor(x : number, y : number) {
    super({
      x, y, z: 30,
      collider: Shape.Capsule(90,50),
      collisionType: CollisionType.Fixed
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(cars.get("4Runner")!.toSprite());
  }
}

export class Sedan extends Actor {
  constructor(x : number, y : number) {
    super({
      x, y, z: 30,
      collider: Shape.Circle(30, new Vector(0,8)),
      collisionType: CollisionType.Fixed,
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(cars.get("Avalon")!.toSprite());
  }
}