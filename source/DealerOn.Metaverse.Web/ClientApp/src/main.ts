import { Engine, Physics, Vector } from "excalibur";
import * as Theme from "./theme";
import { Level } from "./level";
import { loader } from "./resources";

const game = new Engine({
  width: 800,
  height: 600,
  backgroundColor: Theme.Light,
  canvasElementId: "gamecanvas"
});

Physics.gravity = new Vector(0, 500);

const level = new Level();
game.addScene("level", level);
game.goToScene("level");

game.start(loader);