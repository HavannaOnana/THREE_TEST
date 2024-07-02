import { defineConfig } from 'vite';
import mime from 'mime';

export default defineConfig({
  server: {
    middlewareMode: 'html',
    configureServer: ({ middlewares }) => {
      middlewares.use((req, res, next) => {
        const url = req.url;
        if (url.endsWith('.woff2')) {
          res.setHeader('Content-Type', mime.getType('woff2'));
        } else if (url.endsWith('.woff')) {
          res.setHeader('Content-Type', mime.getType('woff'));
        } else if (url.endsWith('.ttf')) {
          res.setHeader('Content-Type', mime.getType('ttf'));
        }
        next();
      });
    }
  }
});
