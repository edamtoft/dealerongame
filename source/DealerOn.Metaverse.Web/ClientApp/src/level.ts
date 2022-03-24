import { HubConnectionState } from "@microsoft/signalr";
import { Actor, CollisionType, Color, Engine, Font, Random, Scene, Text, Vector } from "excalibur";
import { Sedan, Suv } from "./car";
import { Level1Blocks, Level2Blocks, Level3Blocks, Level4Blocks } from "./colors";
import { Npc } from "./npc";
import { Platform, BLOCK_SIZE } from "./platform";
import { Player } from "./player";
import { Direction, PlayerState } from "./playerBase";

import { connected, connection } from "./pushConnection";
import { WelcomeSign } from "./welcomeSign";

const rng = new Random();

export default class Level extends Scene {
  player!: Player;
  others: Map<string,Npc> = new Map();
  
  constructor() {
    super();
  }

  onInitialize(_engine: Engine): void {
    this.add(new WelcomeSign(0, -250));
    //0,-300
    //710, -600
    //2300,-300
    //1300, -800
    //300, -900
    this.player = new Player(rng.integer(-25,25), -400);
    this.add(this.player);
    this.initializeFloatingPlatforms();
    this.camera.clearAllStrategies();
    this.camera.x = this.player.center.x;
    this.camera.y = this.player.center.y;
    this.camera.strategy.elasticToActor(this.player, 0.05, 0.1);
    this.initializeConnection();
  }

  private initializeFloatingPlatforms() {
    
    this.add(new Platform(0, 0, Level1Blocks, 20)); // ground
    this.add(new Platform(150, -200, Level1Blocks, 4));
    this.add(new Platform(-200, -120, Level1Blocks, 3));
    this.add(new Platform(400, -250, Level1Blocks, 2));
    this.add(new Platform(150, -350, Level1Blocks, 2));
    this.add(new Platform(400, -450, Level1Blocks, 1));
    this.add(new Platform(-750, -200, Level1Blocks, 10));
    this.add(new Platform(-1300, -150, Level1Blocks, 5));
    this.add(new Suv(710, -450));
    this.add(new Platform(1000, -200, Level2Blocks, 4));
    this.add(new Platform(1300, -200, Level2Blocks, 2));
    this.add(new Platform(1600, 0, Level2Blocks, 3));
    this.add(new Platform(1900, 0, Level2Blocks, 2));
    this.add(new Platform(2100, -120, Level2Blocks, 1));
    this.add(new Sedan(2300, -250));
    this.add(new Platform(2100, -320, Level3Blocks, 1));
    this.add(new Platform(1800, -400, Level3Blocks, 3));
    this.add(new Platform(1450, -400, Level3Blocks, 3));
    this.add(new Platform(1200, -520, Level3Blocks, 1));
    this.add(new Platform(1000, -650, Level3Blocks, 1));
    this.add(new Platform(1300, -740, Level3Blocks, 3));
    this.add(new Platform(1600, -850, Level3Blocks, 2));
    this.add(new Platform(1300, -950, Level3Blocks, 2));
    this.add(new Suv(950, -950));
    this.add(new Platform(400, -800, Level4Blocks, 10));
    this.add(new Platform(50, -900, Level4Blocks, 1));
    this.add(new Platform(-200, -1000, Level4Blocks, 2, 1));
    this.add(new Platform(-400, -1100, Level4Blocks, 2, -1));
    this.add(new Platform(-600, -1200, Level4Blocks, 2, -1));
    this.add(new Platform(-1000, -1100, Level4Blocks, 3));
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