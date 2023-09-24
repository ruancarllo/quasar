/// <reference types="bun-types"/>
import { BunFile } from 'bun';

import fs from 'fs';
import path from 'path';
import jimp from 'jimp';

const dataDirectory = path.join(__dirname, 'data');
const universitiesMap: {[universityName: string]: string[]} = {}

fs.readdir(dataDirectory, (error, fileNames) => {
  if (error) throw new Error(error.code);

  for (const fileName of fileNames) {
    const filePath = path.join(dataDirectory, fileName);

    const universityName = fileName.replace('.json', '');

    const encodedJSON = fs.readFileSync(filePath, 'utf-8');
    const decodedJSON = JSON.parse(encodedJSON);

    universitiesMap[universityName] = decodedJSON;
  }
});

Bun.serve({
  port: 8080,

  async fetch(request) {
    const requestURL = new URL(request.url);
    const searchParameters = new URLSearchParams(requestURL.search);

    let responsePath: string | undefined
    let responseFile: BunFile | undefined;
    let responseStream: ReadableStream<Uint8Array> | undefined;

    if (requestURL.pathname.startsWith('/quasar')) {
      const requestPath = requestURL.pathname.replace('/quasar', '');

      if (requestPath === '' || requestPath === '/') {
        responsePath = path.join('source', 'client', 'home.html');
        responseFile = Bun.file(responsePath);
        responseStream = responseFile.stream();
      }

      else if (requestPath.startsWith('/questions')) {
        responsePath = path.join('source', 'client', 'questions.html');
        responseFile = Bun.file(responsePath);
        responseStream = responseFile.stream();
      }

      else if (requestPath.startsWith('/desktop')) {
        responsePath = path.join('source', 'client', 'wrapper-desktop.html');
        responseFile = Bun.file(responsePath);
        responseStream = responseFile.stream();
      }

      else {
        responsePath = path.join('source', 'client', requestPath);
        responseFile = Bun.file(responsePath);

        if (await responseFile.exists()) responseStream = responseFile.stream();
        else return new Response(null, {status: 404});
      }
      
      if (responseStream) return new Response(responseStream);
      else return new Response(null, {status: 404});
    }

    else if (requestURL.pathname.startsWith('/api')) {
      const requestPath = requestURL.pathname.replace('/api', '');

      if (requestPath.startsWith('/random-question')) {
        const universityName = searchParameters.get('universityName');

        if (universityName && universitiesMap[universityName]) {
          const randomIndex = Math.floor(Math.random() * universitiesMap[universityName].length)
          const randomQuestionURL = universitiesMap[universityName][randomIndex];

          const imageResponse = await fetch(randomQuestionURL);

          if (imageResponse.status === 200) {
            const imageBlob = await imageResponse.blob();
            return new Response(imageBlob);
          } else return new Response(null, {status: 500});
        } else return new Response(null, {status: 404});
      }

      else if (requestPath.startsWith('/random-proccessed-question')) {
        const universityName = searchParameters.get('universityName');

        if (universityName && universitiesMap[universityName]) {
          const randomIndex = Math.floor(Math.random() * universitiesMap[universityName].length)
          const randomQuestionURL = universitiesMap[universityName][randomIndex];

          const imageResponse = await fetch(randomQuestionURL);

          if (imageResponse.status === 200) {
            const inputImage = await jimp.read(randomQuestionURL);

            inputImage.scan(0, 0, inputImage.getWidth(), inputImage.getHeight(), (x, y, idx) => {
              const r = inputImage.bitmap.data[idx + 0];
              const g = inputImage.bitmap.data[idx + 1];
              const b = inputImage.bitmap.data[idx + 2];

              if (arePixelsSimilar({r, g, b}, {r: 220, g: 230, b: 240}, 40)) {
                inputImage.bitmap.data[idx + 0] = 255;
                inputImage.bitmap.data[idx + 1] = 255;
                inputImage.bitmap.data[idx + 2] = 255;
                inputImage.bitmap.data[idx + 3] = 255;
              }
            });

            const outputImage = await inputImage.getBufferAsync('image/png');
            const response = new Response(outputImage);

            response.headers.set('Content-Type', 'image/png');
            response.headers.set('Access-Control-Allow-Origin', '*');
            response.headers.set('Access-Control-Allow-Methods', 'GET');

            return response;
          } else return new Response(null, {status: 500});
        } else return new Response(null, {status: 404});
      } else return new Response(null, {status: 404});
    } else return new Response(null, {status: 404});
  }
});

function arePixelsSimilar(firstColor: Color, secondColor: Color, tolerance: number) {
  const rDifference = Math.abs(firstColor.r - secondColor.r);
  const gDifference = Math.abs(firstColor.g - secondColor.g);
  const bDifference = Math.abs(firstColor.b - secondColor.b);

  return rDifference <= tolerance && gDifference <= gDifference && bDifference <= tolerance;
}

type Color = {
  r: number,
  g: number,
  b: number
}