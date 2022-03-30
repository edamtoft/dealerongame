import { CollisionType, Engine, Text } from "excalibur";
import { PlayerBase } from "./playerBase";

export class Npc extends PlayerBase {  
  constructor(name: string, playerId: number, x: number, y: number) {
    super(name, x, y, "Blue", CollisionType.Active);
    this.playerId = playerId;
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.updateGraphics();
  }
}