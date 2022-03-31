import { SpriteSheet } from "excalibur";
import { GameResource, imageSources } from "./sources";

function defintPlayerSprite(resource: GameResource) : SpriteSheet {
  return SpriteSheet.fromImageSource({
    image: imageSources.get(resource)!,
    grid: {
      columns: 8,
      rows: 9,
      spriteWidth: 64,
      spriteHeight: 64
    }
  });
}

const playerBlue = defintPlayerSprite(GameResource.Player_Blue);
const playerOrange = defintPlayerSprite(GameResource.Player_Orange);

export { playerBlue, playerOrange };