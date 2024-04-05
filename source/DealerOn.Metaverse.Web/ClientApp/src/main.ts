import { Engine, Physics, Vector } from "excalibur";
import * as Theme from "./resources/theme";
import { Level } from "./world/level";
import { loader } from "./resources/sources";

const game = new Engine({
  width: 800,
  height: 600,
  backgroundColor: Theme.LightBLue,
  canvasElementId: "gamecanvas",
  antialiasing: false,
  suppressConsoleBootMessage: true
});

Physics.gravity = new Vector(0, 500);

const level = new Level();
game.addScene("level", level);
game.goToScene("level");

game.start(loader);

declare global {
  interface Window { ___EXCALIBUR_DEVTOOL?: any }
}

delete(window.___EXCALIBUR_DEVTOOL);