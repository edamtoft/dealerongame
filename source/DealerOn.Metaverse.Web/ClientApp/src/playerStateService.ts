import { HubConnectionState } from "@microsoft/signalr";
import { throttle } from "lodash";
import { Player } from "./player";
import { EquatablePlayerState } from "./playerState";
import { connection } from "./pushConnection";

const UPDATE_FREQUENCY = 250;//ms

let lastUpdate : EquatablePlayerState = new EquatablePlayerState({
  x: 0,
  y: 0,
  xVel: 0,
  yVel: 0,
  facing: "left",
  onGround: true
});

export const sendUpdate = throttle((player : Player) => {
  const state = player.state;

  if (state.equals(lastUpdate)) {
    return;
  }

  if (connection.state !== HubConnectionState.Connected) {
    return;
  }

  connection.invoke("updatePosition", state);
  lastUpdate = state;
}, UPDATE_FREQUENCY, { trailing: true, leading: true });