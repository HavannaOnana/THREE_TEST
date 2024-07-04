import { defineConfig } from 'vite';
import mime from 'mime';

// Define the Vite configuration
export default defineConfig({
  server: {
    port: 3000, // Specify your port
    open: true, // Open the browser when the server starts
    configureServer: ({ middlewares }) => {
      // Add middleware to set the correct Content-Type for font files
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
  },

  // Ensure .mp4 files are treated as assets
  assetsInclude: ['**/*.mp4'],
});
