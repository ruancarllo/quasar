/// <reference lib="dom"/>

import areColorsSimilar from "@resources/are-colors-similar";

async function beautifyQuestionImage(imageUrl: string): Promise<HTMLImageElement | undefined> {
  const inputImage = new Image();
  inputImage.src = imageUrl;

  await new Promise((resolve) => inputImage.onload = resolve);

  const inputCanvas = document.createElement('canvas');
  const inputContext = inputCanvas.getContext('2d');

  if (!inputContext) return;

  inputCanvas.width = inputImage.naturalWidth;
  inputCanvas.height = inputImage.naturalHeight;

  inputContext.drawImage(inputImage, 0, 0);

  const dynamicImageData = inputContext.getImageData(0, 0, inputCanvas.width, inputCanvas.height);

  for (let i = 0; i < dynamicImageData.data.length; i += 4) {
    const red = dynamicImageData.data[i];
    const green = dynamicImageData.data[i + 1];
    const blue = dynamicImageData.data[i + 2];

    const pixelColor = {red, green, blue}

    if (areColorsSimilar(pixelColor, cursoObjetivoWatermarkColor)) {
      dynamicImageData.data[i] = whiteColor.red;
      dynamicImageData.data[i + 1] = whiteColor.green;
      dynamicImageData.data[i + 2] = whiteColor.blue;
    }
  }

  inputContext.putImageData(dynamicImageData, 0, 0);

  const outputImage = new Image();
  outputImage.src = inputCanvas.toDataURL();

  return outputImage;
}

const cursoObjetivoWatermarkColor = {
  red: 220,
  green: 230,
  blue: 240
}

const whiteColor = {
  red: 255,
  green: 255,
  blue: 255
}

export default beautifyQuestionImage;