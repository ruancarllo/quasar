/// <reference types="bun-types"/>

import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom/server';

import HomePage from '@pages/home-page';
import QuestionsPage from '@pages/questions-page';

import Config from '@server/config';

let universitiiesData: {[universityName: string]: Array<string>} = {}

class Server {
  public static async handleRequest(request: Request) {
    const requestURL = new URL(request.url);
    const requestedPath = requestURL.pathname.replace(Config.appPath, '');
    const requestedFilePath = path.join(Config.sourcePath, requestedPath);

    if (requestURL.pathname.startsWith('/random-question')) {
      const searchParameters = new URLSearchParams(requestURL.search);
      const universityName = searchParameters.get('universityName');

      if (!universityName) return new Response(null, {status: 500});
      if (!universitiiesData[universityName]) return new Response(null, {status: 404});

      const randomIndex = Math.floor(Math.random() * universitiiesData[universityName].length)
      const randomQuestionURL = universitiiesData[universityName][randomIndex];

      const imageRequest = await fetch(randomQuestionURL);
      if (imageRequest.status !== 200) return new Response(null, {status: 500});

      const imageBlob = await imageRequest.blob();

      return new Response(imageBlob);
    }

    if (requestURL.pathname.startsWith(Config.appPath)) {
      if (requestedPath === '' || requestedPath === '/') {
        const stream = await ReactDOM.renderToReadableStream(<HomePage/>);
        return new Response(stream);
      }

      if (requestedPath.startsWith('/questions')) {
        const stream = await ReactDOM.renderToReadableStream(<QuestionsPage/>);
        return new Response(stream);
      }

      if (fs.existsSync(requestedFilePath)) {
        if (requestedFilePath.endsWith('.tsx')) {
          const transpiledFile = await Server.getScript(requestedFilePath);
          return new Response(transpiledFile);
        }

        else {
          const requestedFile = fs.readFileSync(requestedFilePath);
          return new Response(requestedFile);
        } 
      }
    }

    return new Response(null, {status: 404});
  }

  public static async getScript(scriptPath: string) {
    const scriptNameParts = scriptPath.split('/');
    const scriptName = path.join(scriptNameParts[scriptNameParts.length - 1]);

    const cachedScriptPath = path.join(Config.cachePath, scriptName.replace('.tsx', '.js'));
  
    if (Bun.argv[2] !== 'dev' && fs.existsSync(cachedScriptPath)) {
      return fs.readFileSync(cachedScriptPath, 'utf8');
    }
  
    const buildOutput = await Bun.build({
      entrypoints: [scriptPath],
      outdir: Config.cachePath,
      minify: true
    });

    return await buildOutput.outputs[0].arrayBuffer();
  }
}

const universityDataPathes = fs.readdirSync(Config.dataPath);

for (const relativePath of universityDataPathes) {
  const universityDataPath = path.join(Config.dataPath, relativePath);
  const universityName = relativePath.replace(/\.json$/g, '');

  const universityRawData = fs.readFileSync(universityDataPath, 'utf-8');
  const universityParsedData = JSON.parse(universityRawData);

  universitiiesData[universityName] = universityParsedData;
}

Bun.serve({
  port: 8080,
  fetch: Server.handleRequest
});