import * as vite from 'vite';

import fs from 'fs-extra';
import path from 'path';

class Directories {
  static source = path.join(__dirname, 'source');
  static target = path.join(__dirname, 'target');

  static public = {
    source: path.join(this.source, 'static'),
    target: path.join(this.target, 'static')
  }
}

async function serve() {
  let app = await vite.createServer({
    root: Directories.source,
    mode: 'development'
  });

  await app.listen(8080);

  console.log(`App running at http://localhost:${app.config.server.port}`);
}

async function build() {
  await vite.build({
    root: Directories.source,
    mode: 'production',
    publicDir: false,
    build: {
      outDir: Directories.target,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        }
      }
    }
  });
  
  let indexPath = path.join(Directories.target, 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf-8');

  let indexFilteredLines = indexContent.split('\n').filter((item) => item.trim());
  let indexFilteredContent = indexFilteredLines.join('\n');

  fs.writeFileSync(indexPath, indexFilteredContent);
  fs.copy(Directories.public.source, Directories.public.target, (error) => null);
}

if (process.argv.includes('build')) build();
if (process.argv.includes('serve')) serve();