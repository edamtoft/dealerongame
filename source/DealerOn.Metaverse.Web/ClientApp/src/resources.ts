import { ImageSource, Loader, SpriteFont, SpriteSheet } from "excalibur";
import humanBlueUrl from "../assets/human_being_blue.png";
import humanOrangeUrl from "../assets/human_being_orange.png";
import logoUrl from "../assets/dealeron_small.png";
import fourRunnerUrl from "../assets/cars/4Runner.png";
import avalonUrl from "../assets/cars/Avalon.png";
import silveradoUrl from "../assets/cars/Silverado.png";
import playerFontBlueUrl from "../assets/playerfont_blue_small.png";
import playerFontOrangeUrl from "../assets/playerfont_orange.png";
import emojiFontUrl from "../assets/emojifont.png";

export type CarModel = "4Runner"|"Avalon"|"Silverado";
export type PlayerColor = "Blue"|"Orange";

const loader = new Loader();
loader.logo = logoUrl;
loader.logoHeight = 55;
loader.logoWidth = 155;
loader.backgroundColor = "#274E91";
loader.playButtonText = "Enter";

function registerFont(source: string, spriteHeight: number, spriteWidth: number, columns: number, rows: number, alphabet: string) : SpriteFont {
  const image = new ImageSource(source);

  loader.addResource(image);

  const spriteSheet = SpriteSheet.fromImageSource({
    image,
    grid: { rows, columns, spriteHeight, spriteWidth },
  });
  
  return new SpriteFont({ spriteSheet, alphabet });
}

function registerCars() : Map<CarModel,ImageSource> {
  const cars = new Map<CarModel,ImageSource>();
  cars.set("4Runner", new ImageSource(fourRunnerUrl));
  cars.set("Avalon", new ImageSource(avalonUrl))
  cars.set("Silverado", new ImageSource(silveradoUrl));
  for (let resource of cars.values()) {
    loader.addResource(resource);
  }
  return cars;
}

function registerPlayers() : Map<PlayerColor,SpriteSheet> {
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
  return players;
}

function registerLogo() : ImageSource {
  const logo = new ImageSource(logoUrl);
  loader.addResource(logo);
  return logo;
}

const cars = registerCars();
const players = registerPlayers();
const logo = registerLogo();

const playerFontBlue = registerFont(playerFontBlueUrl, 14, 7, 6, 3, "PLAYER0123456789 ");
const playerFontOrange = registerFont(playerFontOrangeUrl, 64, 32, 6, 3, "PLAYER0123456789 ");
const emojiFont = registerFont(emojiFontUrl, 40, 40, 3, 3, "012345678");

export { players, loader, cars, logo, playerFontBlue, playerFontOrange, emojiFont };

