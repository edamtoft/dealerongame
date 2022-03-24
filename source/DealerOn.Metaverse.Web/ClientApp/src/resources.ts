import { ImageSource, Loader, SpriteSheet } from "excalibur";
import humanUrl from "../assets/human_being.png";
import logoUrl from "../assets/dealeron_small.png";
import fourRunnerUrl from "../assets/cars/4Runner.png";
import avalonUrl from "../assets/cars/Avalon.png";
import cloudsUrl from "../assets/clouds.png";

export type CarModel = "4Runner"|"Avalon";

const loader = new Loader();
loader.logo = logoUrl;
loader.logoHeight = 55;
loader.logoWidth = 155;
loader.backgroundColor = "#274E91";
loader.suppressPlayButton = true;

const human = new ImageSource(humanUrl);
loader.addResource(human);

const clouds = new ImageSource(cloudsUrl);
loader.addResource(clouds);

const cars = new Map<CarModel,ImageSource>();
cars.set("4Runner", new ImageSource(fourRunnerUrl));
cars.set("Avalon", new ImageSource(avalonUrl))
const humanSpriteSheet = SpriteSheet.fromImageSource({
  image: human,
  grid: {
    columns: 8,
    rows: 9,
    spriteWidth: 64,
    spriteHeight: 64
  }
});

for (let resource of cars.values()) {
  loader.addResource(resource);
}

export { human, humanSpriteSheet, loader, cars, clouds };