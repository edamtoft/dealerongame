import { Actor, CollisionType, Engine, Shape, Vector } from "excalibur";
import { collisionGroup } from "./platform";
import { GameResource, imageSources } from "../resources/sources";
import { ScorePlatform, getPlatformId } from "./scorePlatform";
import { platformId, platformScore } from "../symbols";

export class Suv extends Actor implements ScorePlatform {
  public [platformId] : number = getPlatformId();
  public [platformScore] : number = 50;
  
  constructor(x : number, y : number) {
    super({
      x, y, z: 30,
      collider: Shape.Capsule(90,50),
      collisionType: CollisionType.Fixed,
      collisionGroup
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(imageSources.get(GameResource.Car_4Runner)!.toSprite());
  }
}

export class Sedan extends Actor implements ScorePlatform {
  public [platformId] : number = getPlatformId();
  public [platformScore] : number = 50;
  
  constructor(x : number, y : number) {
    super({
      x, y, z: 30,
      collider: Shape.Circle(30, new Vector(0,8)),
      collisionType: CollisionType.Fixed,
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(imageSources.get(GameResource.Car_Avalon)!.toSprite());
  }
}

export class Truck extends Actor implements ScorePlatform {
  public [platformId] : number = getPlatformId();
  public [platformScore] : number = 50;
  
  constructor(x : number, y : number) {
    super({
      x, y, z: 30,
      collider: Shape.Box(140,23),
      collisionType: CollisionType.Fixed,
      collisionGroup
    });
  }

  onInitialize(_engine: Engine): void {
    this.graphics.use(imageSources.get(GameResource.Car_Silverado)!.toSprite());
  }
}