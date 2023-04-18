import chroma from "chroma-js";

export default function generateRandomLightColor(
  myExistingColors: string[]
): string {
  let color: chroma.Color = chroma("white");
  let isUnique = false;

  // Loop until a unique color is generated
  while (!isUnique) {
    const hue = Math.random() * 360;

    // Generate a random saturation between 25% and 50%
    const saturation = Math.random() * 25 + 25;

    // Generate a random lightness between 70% and 90%
    const lightness = Math.random() * 20 + 70;
    // Generate a random color with lightness between 50 and 90
    color = chroma.hsl(hue, saturation, lightness);
    // Check if the color is unique by comparing its hex code with existing colors
    const isColorUnique = myExistingColors.every((existingColor) => {
      return chroma.distance(color, existingColor) > 0.2;
    });
    if (isColorUnique) {
      isUnique = true;
    }
  }

  // Return the unique light color
  return color.hex();
}
