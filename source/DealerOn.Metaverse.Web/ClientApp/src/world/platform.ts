import { Actor, CollisionGroupManager, CollisionType, Color } from "excalibur";
import { platformId, platformScore } from "../symbols";
import { ScorePlatform, getPlatformId } from "./scorePlatform";


export const BLOCK_SIZE = 50;

export const collisionGroup = CollisionGroupManager.create("platforms");

export class Platform extends Actor implements ScorePlatform {
  public [platformId] : number = getPlatformId();
  public [platformScore] : number;
  
  constructor(x : number, y : number, color : Color, width : number = 1, spin : number = 0, score: number|null = null) {
    super({ 
      x, y, z: 20,
      height: BLOCK_SIZE, 
      width: BLOCK_SIZE * width, 
      collisionType: CollisionType.Fixed,
      collisionGroup,
      color,
      angularVelocity: spin
    });
    this[platformScore] = score === null ? Platform.getPlatformScore(width, spin) : score;
  }

  private static getPlatformScore(width: number, spin: number) : number {
   
    if (spin !== 0) {
      return 100;
    }

    if (width === 1) {
      return 20;
    }

    return 10;
  }
}