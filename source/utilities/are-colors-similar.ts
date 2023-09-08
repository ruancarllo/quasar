function areColorsSimilar(color1: Color, color2: Color, tolerance = 20) {
  const redDifference = Math.abs(color1.red - color2.red);
  const greenDifference = Math.abs(color1.green - color2.green);
  const blueDifference = Math.abs(color1.blue - color2.blue);

  return redDifference <= tolerance && greenDifference <= greenDifference && blueDifference <= tolerance;
}

interface Color {
  red: number,
  green: number,
  blue: number
}

export default areColorsSimilar;