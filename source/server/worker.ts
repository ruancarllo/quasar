import * as fs from 'fs';
import * as path from 'path';

class Server {
  public static async handleRequest(request: Request): Promise<Response> {
    const requestURL = new URL(request.url);

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

    if (requestURL.pathname.startsWith('/quasar')) {
      const requestPath = requestURL.pathname.replace('/quasar', '');

      if (requestPath === '' || requestPath === '/') {
        const resultHTML = Bun.file('source/client/home.html').stream();
        return new Response(resultHTML);
      }

      if (requestPath.startsWith('/questions')) {
        const resultHTML = Bun.file('source/client/questions.html').stream();
        return new Response(resultHTML);
      }

      const requestedFilePath = path.join('source', 'client', requestPath);

      if (fs.existsSync(requestedFilePath)) {
        const requestedFile = fs.readFileSync(requestedFilePath);
        return new Response(requestedFile);
      }
    }

    return new Response(undefined, {status: 404});
  }

  public static port = 8080;
}

const universitiiesData: {[universityName: string]: Array<string>} = {};
const universityDataPathes = fs.readdirSync('source/server/data');

for (const relativePath of universityDataPathes) {
  const universityDataPath = path.join('source/server/data', relativePath);
  const universityName = relativePath.replace(/\.json$/g, '');

  const universityRawData = fs.readFileSync(universityDataPath, 'utf-8');
  const universityParsedData = JSON.parse(universityRawData);

  universitiiesData[universityName] = universityParsedData;
}

Bun.serve({port: Server.port, fetch: Server.handleRequest});
