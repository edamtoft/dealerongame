import { HubConnectionState } from "@microsoft/signalr";
import { throttle } from "lodash";
import { Player } from "../player/player";
import { EquatablePlayerState } from "../player/playerState";
import { connection } from "./pushConnection";

const UPDATE_FREQUENCY = 250;//ms

let lastUpdateTime = 0;
let lastUpdate : EquatablePlayerState = new EquatablePlayerState({
  x: 0,
  y: 0,
  xVel: 0,
  yVel: 0,
  facing: "left",
  onGround: true
});

export const sendUpdate = throttle(async (player : Player) => {
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
}, UPDATE_FREQUENCY, { trailing: true, leading: true,  });