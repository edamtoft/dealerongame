import { Actor, CollisionType, Color, Engine, Physics, Vector } from "excalibur";
import Level from "./level";
import Player from "./player";
import { loader } from "./resources";

const game = new Engine({
  width: 800,
  height: 600,
  backgroundColor: Color.fromHex("#152B51"),
  canvasElementId: "gamecanvas"
});

Physics.acc = new Vector(0, 500);

const level = new Level();
game.addScene("level", level);
game.goToScene("level");

game.start(loader);