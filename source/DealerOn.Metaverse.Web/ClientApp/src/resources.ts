import { ImageSource, Loader, SpriteSheet } from "excalibur";
import humanBlueUrl from "../assets/human_being_blue.png";
import humanOrangeUrl from "../assets/human_being_orange.png";
import logoUrl from "../assets/dealeron_small.png";
import fourRunnerUrl from "../assets/cars/4Runner.png";
import avalonUrl from "../assets/cars/Avalon.png";

export type CarModel = "4Runner"|"Avalon";
export type PlayerColor = "Blue"|"Orange";

const loader = new Loader();
loader.logo = logoUrl;
loader.logoHeight = 55;
loader.logoWidth = 155;
loader.backgroundColor = "#274E91";

const cars = new Map<CarModel,ImageSource>();
cars.set("4Runner", new ImageSource(fourRunnerUrl));
cars.set("Avalon", new ImageSource(avalonUrl))
for (let resource of cars.values()) {
  loader.addResource(resource);
}

const humanBlue = new ImageSource(humanBlueUrl);
loader.addResource(humanBlue);
const humanOrange = new ImageSource(humanOrangeUrl);
loader.addResource(humanOrange);
const players = new Map<PlayerColor,SpriteSheet>();
const grid = {
  columns: 8,
  rows: 9,
  spriteWidth: 64,
  spriteHeight: 64
};
players.set("Orange", SpriteSheet.fromImageSource({ image: humanOrange, grid }));
players.set("Blue", SpriteSheet.fromImageSource({ image: humanBlue, grid }));

const logo = new ImageSource(logoUrl);
loader.addResource(logo);

export { players, loader, cars, logo };