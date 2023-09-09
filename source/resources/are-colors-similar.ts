function areColorsSimilar(firstColor: Color, secondColor: Color, tolerance = 20) {
  const redDifference = Math.abs(firstColor.red - secondColor.red);
  const greenDifference = Math.abs(firstColor.green - secondColor.green);
  const blueDifference = Math.abs(firstColor.blue - secondColor.blue);

  return redDifference <= tolerance && greenDifference <= greenDifference && blueDifference <= tolerance;
}

interface Color {
  red: number,
  green: number,
  blue: number
}

export default areColorsSimilar;