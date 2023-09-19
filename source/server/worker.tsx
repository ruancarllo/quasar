/// <reference types="bun-types"/>

import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom/server';

import HomePage from '@pages/home-page';
import QuestionsPage from '@pages/questions-page';

import Config from '@server/config';

class Server {
  public static async handleRequest(request: Request) {
    fs.appendFileSync('logs.txt', `${new Date().toUTCString()}: ${JSON.stringify(request.headers)}\n`);

    const requestURL = new URL(request.url);
    const requestedPath = requestURL.pathname.replace(Config.appPath, '');
    const requestedFilePath = path.join(Config.sourcePath, requestedPath);

    if (requestURL.pathname.startsWith('/curso-objetivo')) {
      const parameters = requestURL.pathname.replace('/curso-objetivo', '');
      const response = await fetch('https://www.curso-objetivo.br' + parameters);

      if (response.status !== 200) return new Response(null, {status: 500});

      const blob = await response.blob();
      return new Response(blob);
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

Bun.serve({
  port: 8080,
  fetch: Server.handleRequest
});