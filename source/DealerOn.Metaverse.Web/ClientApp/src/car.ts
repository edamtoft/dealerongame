import { Actor, CollisionEndEvent, CollisionType, Engine, PostCollisionEvent, Shape, Side, Vector } from "excalibur";
import { CarModel, cars } from "./resources";

export class Suv extends Actor {
  constructor(x : number, y : number) {
    super({
      x, y,
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
      x, y,
      collider: Shape.Circle(30, new Vector(0,8)),
      collisionType: CollisionType.Fixed,
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(cars.get("Avalon")!.toSprite());
  }
}