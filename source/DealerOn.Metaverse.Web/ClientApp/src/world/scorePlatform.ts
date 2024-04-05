import { platformId, platformScore } from "../symbols";

let id = 0;

export function getPlatformId() : number {
  return id++;
}

export interface ScorePlatform {
  [platformId] : number;
  [platformScore] : number;
}