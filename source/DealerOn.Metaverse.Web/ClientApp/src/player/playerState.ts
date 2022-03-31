export type Direction = "left"|"right";

export interface PlayerState {
  x : number,
  y : number,
  xVel : number,
  yVel : number,
  facing: Direction,
  onGround: boolean
};

export class EquatablePlayerState implements PlayerState {
  x: number;
  y: number;
  xVel: number;
  yVel: number;
  facing: Direction;
  onGround: boolean;
  
  constructor(state : PlayerState) {
    this.x = state.x;
    this.y = state.y;
    this.xVel = state.xVel;
    this.yVel = state.yVel;
    this.facing = state.facing;
    this.onGround = state.onGround;
  }
    
  equals(other : PlayerState) : boolean {
    return other && 
      this.x === other.x &&
      this.y === other.y &&
      this.xVel === other.xVel && 
      this.yVel === other.yVel &&
      this.facing === other.facing &&
      this.onGround === other.onGround;
  }
}