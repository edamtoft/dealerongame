import { Actor, CollisionType, Engine, Input, PostCollisionEvent, Side } from "excalibur";
import PlayerBase from "./playerBase";
import { connection } from "./pushConnection";
import { throttle } from "lodash";

type Keys = {
  left: boolean,
  right: boolean,
  space: boolean,
}

const sendUpdate = throttle((player : Player) => {
  connection.invoke("updatePosition", player.state);
}, 250);

export default class Player extends PlayerBase {
  constructor(x: number, y: number) {
    super((Math.random()*1e32).toString(36), x, y, CollisionType.Active);
  }

  onPostCollision(e: PostCollisionEvent<Actor>): void {
    if (e.side === Side.Bottom) {
      this.onGround = true;
    }
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    const left = _engine.input.keyboard.isHeld(Input.Keys.Left);
    const right = _engine.input.keyboard.isHeld(Input.Keys.Right);
    const space = _engine.input.keyboard.isHeld(Input.Keys.Space);

    const keys = { left, right, space };

    this.setXVelocity(keys);
    this.setYVelocity(keys);
    this.updateGraphics();
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    sendUpdate(this);
  }

  private setYVelocity(keys : Keys) : void {
    if (!this.onGround) {
      return;
    }
    
    if (keys.space) {
      this.vel.y = -300;
      this.onGround = false;
      return;
    }
  }

  private setXVelocity(keys : Keys) : void {
    if (!this.onGround) {
      return;
    }
    if (keys.left && !keys.right) {
      this.vel.x = -150;
      this.facing = "left";
      return;
    }
    if (keys.right && !keys.left) {
      this.vel.x = 150;
      this.facing = "right";
      return;
    }
    this.vel.x = 0;
  }
}