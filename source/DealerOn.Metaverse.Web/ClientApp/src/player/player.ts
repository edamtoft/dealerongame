import { Actor, CollisionType, Engine, Input, PostCollisionEvent, Side } from "excalibur";
import { PlayerBase } from "./playerBase";
import { playerOrange } from "../resources/playerSprites";
import { onGround, platformId, platformScore, platforms, score } from "../symbols";
import { ScorePlatform } from "../world/scorePlatform";

type Keys = {
  left: boolean,
  right: boolean,
  space: boolean,
}

export class Player extends PlayerBase {
  public [platforms] : Set<number> = new Set<number>();
  
  constructor(x: number, y: number) {
    super("player", x, y, 15, playerOrange,  CollisionType.Active);
  }

  onPostCollision(e: PostCollisionEvent<Actor>): void {
    if (e.side === Side.Bottom) {
      this[onGround] = true;
    }

    if (platformId in e.other && platformScore in e.other) {
      const scorePlatform = e.other as ScorePlatform;
      if (!this[platforms].has(scorePlatform[platformId])) {
        this[platforms].add(scorePlatform[platformId]);
        this[score] += scorePlatform[platformScore]; 
      }
    }
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    const left = _engine.input.keyboard.isHeld(Input.Keys.Left);
    const right = _engine.input.keyboard.isHeld(Input.Keys.Right);
    const a = _engine.input.keyboard.isHeld(Input.Keys.A);
    const d = _engine.input.keyboard.isHeld(Input.Keys.D);
    const w = _engine.input.keyboard.isHeld(Input.Keys.W);
    const space = _engine.input.keyboard.wasPressed(Input.Keys.Space);

    const keys = { 
      left: left || a, 
      right: right || d, 
      space: space || w 
    };

    this.setXVelocity(keys);
    this.setYVelocity(keys);
    this.updateGraphics();
  }

  private setYVelocity(keys : Keys) : void {
    if (this[onGround] && keys.space) {
      this.vel.y = -400;
      this[onGround] = false;
    }
  }

  private setXVelocity(keys : Keys) : void {
    if (!this[onGround]) {
      return;
    }
    if (keys.left && !keys.right) {
      this.vel.x = -150;
      this.facing = "left";
    }
    else if (keys.right && !keys.left) {
      this.vel.x = 150;
      this.facing = "right";
    } else {
      this.vel.x = 0;
    }
  }
}