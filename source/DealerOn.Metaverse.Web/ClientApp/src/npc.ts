import { Actor, CollisionType, Engine, Input, PostCollisionEvent, Side } from "excalibur";
import Car from "./car";
import PlayerBase from "./playerBase";

export default class Npc extends PlayerBase {
  constructor(name: string, x: number, y: number) {
    super(name, x, y, CollisionType.Active);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
}