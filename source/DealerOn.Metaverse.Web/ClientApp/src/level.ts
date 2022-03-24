import { HubConnectionState } from "@microsoft/signalr";
import { Actor, CollisionType, Color, Engine, Font, Random, Scene, Text, Vector } from "excalibur";
import Car from "./car";
import Npc from "./npc";
import Player from "./player";
import { Direction, PlayerState } from "./playerBase";

import { connected, connection } from "./pushConnection";

export default class Level extends Scene {
  player!: Player;
  others: Map<string,Npc> = new Map();
  
  constructor() {
    super();
  }

  onInitialize(_engine: Engine): void {
    const text = new Actor({ x: 0, y: -100 });
    text.graphics.use(new Text({ 
      text:"Explore the DealerOn Metaverse",
      font: new Font({ size: 24, family: "Arial" }), 
      color: Color.fromHex("#FF7319") }));
    this.add(text);

    this.player = new Player(0, -150);
    this.add(this.player);

    for (let x = -1000; x < 1000; x+= 50) {
      for (let y = 0; y < 400; y+= 50) {
        const groundBlock = new Actor({
          x, y,
          width: 50,
          height: 50,
          color: Color.DarkGray,
          collisionType: CollisionType.Fixed,
        });
        this.add(groundBlock);
      }
    }

    this.camera.clearAllStrategies();
    this.camera.x = this.player.center.x;
    this.camera.y = this.player.center.y;
    this.camera.strategy.elasticToActor(this.player, 0.05, 0.1);

    this.initializeConnection();
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
  }

  async initializeConnection() : Promise<void> {
    console.log("Connecting"); 
    
    await connected;
    
    console.log("Connected");

    connection.on("playerUpdate", (id : string, state : PlayerState) => {
      if (!this.others.has(id)) {
        const newPlayer = new Npc(id, 0, 0);
        newPlayer.state = state;
        this.add(newPlayer);
        this.others.set(id, newPlayer);
      } else {
        const other = this.others.get(id)!;
        other.state = state;
      }
    });

    connection.on("playerLeft", (id : string) => {
      const other = this.others.get(id);
      if (other) {
        other.kill();
      }
    });
  }
}