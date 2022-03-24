import { Color, Engine, Physics, Vector } from "excalibur";
import { Background } from "./colors";
import Level from "./level";
import { loader } from "./resources";

const game = new Engine({
  width: 800,
  height: 600,
  backgroundColor: Background,
  canvasElementId: "gamecanvas"
});

Physics.acc = new Vector(0, 500);

const level = new Level();
game.addScene("level", level);
game.goToScene("level");

game.start(loader);