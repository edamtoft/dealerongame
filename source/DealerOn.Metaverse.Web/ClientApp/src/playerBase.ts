import { Actor, Animation, CollisionGroupManager, CollisionType, Engine, Font, PostCollisionEvent, Shape, Side, Text, TextAlign } from "excalibur";
import { Direction, EquatablePlayerState, PlayerState } from "./playerState";
import { PlayerColor, players } from "./resources";

const group = CollisionGroupManager.create("players");

export abstract class PlayerBase extends Actor {
  protected onGround : boolean = false;
  protected facing : Direction = "right";
  public playerId : number = 0;
  private playerColor : PlayerColor;
  
  constructor(name:string, x: number, y: number, z: number, color: PlayerColor, collisionType: CollisionType) {
    super({
      name, x, y, z,
      collisionType,
      collider: Shape.Box(24,64),
      collisionGroup: group,
      width: 80,
      height: 80
    });
    this.playerColor = color;
  }

  get state() : EquatablePlayerState {
    return new EquatablePlayerState({
      x: this.pos.x,
      y: this.pos.y,
      xVel: this.vel.x,
      yVel: this.vel.y,
      facing: this.facing,
      onGround: this.onGround
    });
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
    const sprites = players.get(this.playerColor)!;

    const walk = Animation.fromSpriteSheet(sprites, [32,33,34,35,36,37,38,39], 60);
    const idle = Animation.fromSpriteSheet(sprites, [64], 0);
    const jump = Animation.fromSpriteSheet(sprites, [44], 0);

    walk.flipHorizontal = side === "left";
    idle.flipHorizontal = side === "left";
    jump.flipHorizontal = side === "left";

    this.graphics.add(`walk-${side}`, walk);
    this.graphics.add(`idle-${side}`, idle);
    this.graphics.add(`jump-${side}`, jump);
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    if (this.pos.y > 800) {
      this.kill();
    }
  }

  onPostCollision(e: PostCollisionEvent<Actor>): void {
    if (e.side === Side.Bottom) {
      this.onGround = true;
    }
  }

  abstract onPreUpdate(_engine: Engine, _delta: number): void;
  
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