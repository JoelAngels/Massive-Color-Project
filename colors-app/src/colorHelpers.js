import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

//this will generate all of the shades, grba plus the color and id
function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };
  //we are now going to loop over the levels and for Each one we are going to add it into colors and set it into an empty array
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  /*we are now going to loop over every color,
   generate a scale with all different colors
   take the lightest color and add it in as the 50 color
   2 lightest to be 100 and keep on going on,
   generate rgba
   genereate rgb
  */
  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, 10).reverse(); //the 10 gives us 10 colors
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${[levels[i]]}`,
        //we are going to give it the id which is going to be the name of the color and the one with spaces I'm replacing them with a dash
        id: color.name.toLowerCase().replace(/ /g, "-"), //g means globaly
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return newPalette;
}
function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}
//  generate a scale with all different colors, take a parameter of hexColor and NumberOfColors
function getScale(hexColor, numberOfColors) {
  //mode sets the mode to light ab
  //.colors when we will spit out 10 colors, it will bring 10 colors
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };
