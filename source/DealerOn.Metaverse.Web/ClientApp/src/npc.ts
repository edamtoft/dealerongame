import { Actor, CollisionType, Engine, Input, PostCollisionEvent, Side } from "excalibur";
import { PlayerBase } from "./playerBase";

export class Npc extends PlayerBase {
  constructor(name: string, x: number, y: number) {
    super(name, x, y, "Blue", CollisionType.Active);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
}