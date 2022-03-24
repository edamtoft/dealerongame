import { Actor, CollisionEndEvent, CollisionType, Engine, PostCollisionEvent, Shape, Side, Vector } from "excalibur";
import { CarModel, cars } from "./resources";

export default class Car extends Actor {
  model: CarModel;

  constructor(x : number, y : number, model: CarModel) {
    super({
      x,
      y,
      collider: Shape.Box(155,60, new Vector(0.5, 1)),
      collisionType: CollisionType.Active,
      anchor: new Vector(0.5, 1),
    });
    this.model = model;
    this.on("postcollision", e => this.onPostCollision(e));
  }

  onPostCollision(e: PostCollisionEvent<Actor>): void {
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(cars.get(this.model)!.toSprite());
  }

  onPreUpdate(_engine: Engine, _delta: number): void {  
  }
}