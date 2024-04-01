import { Engine, Random, Scene, Timer } from "excalibur";
import { Emoji } from "./emoji";
import { Sedan, Suv, Truck } from "./car";
import * as Theme from "../resources/theme";
import { Npc } from "../player/npc";
import { Platform } from "./platform";
import { Player } from "../player/player";
import { connection } from "../services/pushConnection";
import { DealerOnLogo } from "./dealeronLogo";
import { Trophy } from "./trophy";
import { PlayerState } from "../player/playerState";
import { PlayerTitle } from "../ui/playerTitle";
import { HubConnectionState } from "@microsoft/signalr";
import { sendUpdate } from "../services/playerStateService";

const rng = new Random();

export class Level extends Scene {
  player!: Player;
  others: Map<number,Npc> = new Map();
  playerId: number = 0;
  timer!: Timer;

  onInitialize(_engine: Engine): void {
    this.add(new PlayerTitle(() => this.playerId,  () => this.player.score));
    this.initializeFloatingPlatforms();
    this.spawnPlayer();
    this.timer = new Timer({
      repeats: true,
      interval: 250,
      fcn: () => sendUpdate(this.player)
    });
    this.addTimer(this.timer);
    this.initializeConnection();
  }

  onActivate(_oldScene: Scene, _newScene: Scene): void {
    super.onActivate(_oldScene, _newScene);
    this.timer.start();
  }

  spawnPlayer() {
    //0,-300
    //710, -600
    //2300,-300
    //1300, -800
    //300, -900
    this.player = new Player(-4100, -2850);
    //this.player = new Player(rng.integer(-25,25), -50);
    this.player.once("kill", _ => this.spawnPlayer());
    this.add(this.player);
    this.camera.clearAllStrategies();
    this.camera.x = this.player.center.x;
    this.camera.y = this.player.center.y;
    this.camera.strategy.elasticToActor(this.player, 0.05, 0.1);
  }

  private initializeFloatingPlatforms() {
    this.add(new Platform(0, 0, Theme.Gray, 30)); // ground
    this.add(new Truck(500, -50));
    this.add(new Emoji(0, -50, "7"));
    this.add(new DealerOnLogo(200, -80));
    this.add(new Platform(150, -200, Theme.Gray, 4));
    this.add(new Platform(-200, -120, Theme.Gray, 3));
    this.add(new Platform(400, -250, Theme.Gray, 2));
    this.add(new Platform(150, -350, Theme.Gray, 2));
    this.add(new Platform(400, -450, Theme.Gray, 1));
    this.add(new Platform(-750, -200, Theme.Gray, 10));
    this.add(new Platform(-1300, -150, Theme.Gray, 5));
    this.add(new Suv(710, -450));
    this.add(new Platform(1000, -200, Theme.Sky, 4));
    this.add(new Platform(1300, -200, Theme.Sky, 2));
    this.add(new Platform(1600, 0, Theme.Sky, 3));
    this.add(new Platform(1900, 0, Theme.Sky, 2));
    this.add(new Platform(2100, -120, Theme.Sky, 1));
    this.add(new Sedan(2300, -250));
    this.add(new Platform(2100, -320, Theme.Orange, 1));
    this.add(new Platform(1800, -400, Theme.Orange, 3));
    this.add(new Platform(1450, -400, Theme.Orange, 3));
    this.add(new Platform(1200, -520, Theme.Orange, 1));
    this.add(new Platform(1000, -650, Theme.Orange, 1));
    this.add(new Platform(1300, -740, Theme.Orange, 3));
    this.add(new Platform(1600, -850, Theme.Orange, 2));
    this.add(new Platform(1300, -950, Theme.Orange, 2));
    this.add(new Suv(950, -950));
    this.add(new Platform(400, -800, Theme.Blue, 10));
    this.add(new Platform(50, -900, Theme.Blue, 1));
    this.add(new Platform(-200, -1000, Theme.Blue, 2, 1));
    this.add(new Platform(-400, -1100, Theme.Blue, 2, -1));
    this.add(new Platform(-600, -1200, Theme.Blue, 2, -1));
    this.add(new Platform(-1000, -1100, Theme.Blue, 3));
    this.add(new Emoji(-1150, -1150, "5"));
    this.add(new Sedan(-1400, -900));
    this.add(new Sedan(-1700, -800));
    this.add(new Sedan(-2000, -700));
    this.add(new Emoji(-2100, -750, "5"));
    this.add(new Platform(-2500, 0, Theme.Sky, 3));
    this.add(new Platform(-2700, -100, Theme.Sky, 1, 1));
    this.add(new Platform(-2900, -200, Theme.Sky, 1, 1));
    this.add(new Platform(-3100, -300, Theme.Sky, 1, 1));
    this.add(new Platform(-3350, -400, Theme.Sky, 2));
    this.add(new Sedan(-3100, -550));
    this.add(new Truck(-3350, -700));
    this.add(new Suv(-3100, -850));
    this.add(new Platform(-3300, -950, Theme.Sky, 1, 1));
    this.add(new Platform(-3500, -1050, Theme.Sky, 1, 1));
    this.add(new Platform(-3800, -1100, Theme.Sky, 3, -1.5));
    this.add(new Sedan(-3550, -1250));
    this.add(new Sedan(-3800, -1300));
    this.add(new Sedan(-3550, -1400));
    this.add(new Sedan(-3800, -1500));
    this.add(new Truck(-3550, -1600));
    this.add(new Suv(-3800, -1700));
    this.add(new Sedan(-3550, -1800));
    this.add(new Sedan(-3800, -1900));
    this.add(new Truck(-3550, -2000));
    this.add(new Platform(-3800, -2100, Theme.Orange, 2, 2));
    this.add(new Platform(-3550, -2200, Theme.Blue, 2, 2));
    this.add(new Platform(-3800, -2300, Theme.Orange, 2, -2));
    this.add(new Platform(-3550, -2400, Theme.Blue, 2, -2));
    this.add(new Platform(-3800, -2500, Theme.Orange, 2, -2));
    this.add(new Platform(-3550, -2600, Theme.Blue, 2, -2));
    this.add(new Platform(-3800, -2700, Theme.Orange, 2, -2));
    this.add(new Truck(-3950, -2700));
    this.add(new Truck(-4100, -2800));
    this.add(new Truck(-4400, -2800));
    this.add(new Truck(-4700, -2800));
    this.add(new Truck(-5000, -2800));
    this.add(new Platform(-5200, -2920, Theme.Gray));
    this.add(new Trophy(-5200, -3000));
  }

  async initializeConnection() : Promise<void> {  
    connection.on("playerUpdated", (id : number, state : PlayerState) => {
      if (!this.others.has(id)) {
        const newPlayer = new Npc(`player-${id}`, id, state.x, state.y);
        newPlayer.state = state;
        newPlayer.on("kill", _ => this.others.delete(id));
        this.others.set(id, newPlayer);
        this.add(newPlayer);
      } else {
        const other = this.others.get(id)!;
        other.state = state;
      }
    });

    connection.on("playerLeft", (id : number) => {
      const other = this.others.get(id);
      if (other) {
        other.kill();
      }
    });

    console.log("Connecting to real-time server");

    if (connection.state === HubConnectionState.Disconnected) {
      await connection.start();
    }

    this.playerId = await connection.invoke("getPlayerId");

    console.log("Connected");
  }
}