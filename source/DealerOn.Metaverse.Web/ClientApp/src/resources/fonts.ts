import { SpriteFont, SpriteSheet } from "excalibur";
import { GameResource, imageSources } from "./sources";

function defineFont(resource: GameResource, spriteHeight: number, spriteWidth: number, columns: number, rows: number, alphabet: string) : SpriteFont {
  const spriteSheet = SpriteSheet.fromImageSource({
    image: imageSources.get(resource)!,
    grid: { rows, columns, spriteHeight, spriteWidth },
  });
  
  return new SpriteFont({ spriteSheet, alphabet });
}

const playerFontBlue = defineFont(GameResource.Font_Blue, 14, 7, 6, 3, "PLAYER0123456789 ");
const playerFontOrange = defineFont(GameResource.Font_Orange, 64, 32, 6, 3, "PLAYER0123456789 ");
const iconFont = defineFont(GameResource.Font_Icon, 40, 40, 3, 3, "012345678");

export { playerFontBlue, playerFontOrange, iconFont };