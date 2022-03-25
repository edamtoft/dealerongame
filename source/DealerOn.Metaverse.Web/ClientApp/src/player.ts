import { Actor, CollisionType, Engine, Input, PostCollisionEvent, Side } from "excalibur";
import { PlayerBase } from "./playerBase";
import { connection } from "./pushConnection";
import { throttle } from "lodash";
import { HubConnectionState } from "@microsoft/signalr";

const UPDATE_FREQUENCY = 250;//ms

type Keys = {
  left: boolean,
  right: boolean,
  space: boolean,
}

const sendUpdate = throttle((player : Player) => {
  if (connection.state === HubConnectionState.Connected) {
    connection.invoke("updatePosition", player.state);
  }
}, UPDATE_FREQUENCY);

export class Player extends PlayerBase {
  constructor(x: number, y: number) {
    super("player", x, y, "Orange",  CollisionType.Active);
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
    if (this.onGround && keys.space) {
      this.vel.y = -400;
      this.onGround = false;
    }
  }

  private setXVelocity(keys : Keys) : void {
    if (!this.onGround) {
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