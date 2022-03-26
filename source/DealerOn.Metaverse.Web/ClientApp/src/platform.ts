import { Actor, CollisionType, Color } from "excalibur";

export const BLOCK_SIZE = 50;

export class Platform extends Actor {
  constructor(x : number, y : number, color : Color, width : number = 1, spin : number = 0) {
    super({ 
      x, y, z: 20,
      height: BLOCK_SIZE, 
      width: BLOCK_SIZE * width, 
      collisionType: CollisionType.Fixed,
      color,
      angularVelocity: spin
    });
  }
}