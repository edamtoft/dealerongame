import { ImageSource, Loader } from "excalibur";

export enum GameResource {
  Car_4Runner,
  Car_Avalon,
  Car_Silverado,
  Font_Blue,
  Font_Orange,
  Font_Icon,
  Logo_Dealeron,
  Player_Blue,
  Player_Orange,
}

const imageSources = new Map<GameResource,ImageSource>();

imageSources.set(GameResource.Car_4Runner, new ImageSource(require("../../assets/cars/4Runner.png")));
imageSources.set(GameResource.Car_Avalon, new ImageSource(require("../../assets/cars/Avalon.png")));
imageSources.set(GameResource.Car_Silverado, new ImageSource(require("../../assets/cars/Silverado.png")));
imageSources.set(GameResource.Font_Blue, new ImageSource(require("../../assets/fonts/blue_small.png")));
imageSources.set(GameResource.Font_Orange, new ImageSource(require("../../assets/fonts/orange.png")));
imageSources.set(GameResource.Font_Icon, new ImageSource(require("../../assets/fonts/icon.png")));
imageSources.set(GameResource.Logo_Dealeron, new ImageSource(require("../../assets/logos/dealeron_small.png")));
imageSources.set(GameResource.Player_Blue, new ImageSource(require("../../assets/players/blue.png")));
imageSources.set(GameResource.Player_Orange, new ImageSource(require("../../assets/players/orange.png")));

const loader = new Loader();
loader.logo = require("../../assets/logos/dealeron_small.png")
loader.logoHeight = 55;
loader.logoWidth = 155;
loader.backgroundColor = "#274E91";
loader.playButtonText = "Enter";

for (let source of imageSources.values()) {
  loader.addResource(source);
}

export { loader, imageSources };