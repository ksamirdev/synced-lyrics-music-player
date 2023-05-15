import Vibrant from "node-vibrant";
import { Color } from "../types";

export async function getColorsForThumbnail(thumbnailUrl: string) {
  const palette = await Vibrant.from(thumbnailUrl).getPalette();
  const colors: Color[] = [];

  for (const [type, color] of Object.entries(palette)) {
    if (color && color.rgb) {
      colors.push({ type, value: color.rgb });
    }
  }

  return colors;
}
