import { HubConnectionState } from "@microsoft/signalr";
import { Player } from "../player/player";
import { EquatablePlayerState } from "../player/playerState";
import { connection } from "./pushConnection";

let lastUpdateTime = 0;
let lastUpdate : EquatablePlayerState = new EquatablePlayerState({
  x: 0,
  y: 0,
  xVel: 0,
  yVel: 0,
  facing: "left",
  onGround: true
});

export async function sendUpdate(player : Player) {
  const state = player.state;
  const now = Date.now();
  const timeSinceLastUpdate = now - lastUpdateTime; 

  if (state.equals(lastUpdate) && timeSinceLastUpdate < 5000) {
    return;
  }

  if (connection.state !== HubConnectionState.Connected) {
    return;
  }
  
  lastUpdate = state;
  lastUpdateTime = now;
  await connection.invoke("updateState", state);
}