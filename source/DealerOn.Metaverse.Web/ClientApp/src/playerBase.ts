import { Actor, Animation, CollisionType, Engine, PostCollisionEvent, Scene, Shape, Side } from "excalibur";
import { humanSpriteSheet } from "./resources";

export type Direction = "left"|"right";

export type PlayerState = {
  x : number,
  y : number,
  xVel : number,
  yVel : number,
  facing: Direction,
  onGround: boolean,
};

export default abstract class PlayerBase extends Actor {
  protected onGround : boolean = false;
  protected facing : Direction = "right";
  
  constructor(name:string, x: number, y: number, collisionType: CollisionType) {
    super({
      name, x, y,
      collisionType,
      collider: Shape.Box(24,64),
      width: 80,
      height: 80
    });
  }

  get state() : PlayerState {
    return {
      x: this.pos.x,
      y: this.pos.y,
      xVel: this.vel.x,
      yVel: this.vel.y,
      facing: this.facing,
      onGround: this.onGround,
    };
  }

  set state(state : PlayerState) {
    this.pos.x = state.x;
    this.pos.y = state.y;
    this.vel.x = state.xVel;
    this.vel.y = state.yVel;
    this.facing = state.facing;
    this.onGround = state.onGround;
  }

  onInitialize(_engine: Engine): void {
    this.initializeGraphics("left");
    this.initializeGraphics("right");
    this.on("postcollision", e => this.onPostCollision(e));
  }

  private initializeGraphics(side: Direction) : void {
    const walk = Animation.fromSpriteSheet(humanSpriteSheet, [32,33,34,35,36,37,38,39], 60);
    const idle = Animation.fromSpriteSheet(humanSpriteSheet, [64], 0);
    const jump = Animation.fromSpriteSheet(humanSpriteSheet, [44], 0);

    walk.flipHorizontal = side === "left";
    idle.flipHorizontal = side === "left";
    jump.flipHorizontal = side === "left";

    this.graphics.add(`walk-${side}`, walk);
    this.graphics.add(`idle-${side}`, idle);
    this.graphics.add(`jump-${side}`, jump);
  }

  onPostCollision(e: PostCollisionEvent<Actor>): void {
    if (e.side === Side.Bottom) {
      this.onGround = true;
    }
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
  
  protected updateGraphics() {
    if (!this.onGround) {
      this.graphics.use(`jump-${this.facing}`);
      return;
    }
    if (this.vel.x === 0) {
      this.graphics.use(`idle-${this.facing}`);
      return;
    }
    this.graphics.use(`walk-${this.facing}`);
  }
}