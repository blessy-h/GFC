import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

const rawInputs: Record<string, string> = {
  main: path.resolve(__dirname, 'index.html'),
  about: path.resolve(__dirname, 'about/index.html'),
  menu: path.resolve(__dirname, 'menu/index.html'),
  gallery: path.resolve(__dirname, 'gallery/index.html'),
  contact: path.resolve(__dirname, 'contact/index.html'),
  reservation: path.resolve(__dirname, 'reservation/index.html'),
  aboutHtml: path.resolve(__dirname, 'about.html'),
  menuHtml: path.resolve(__dirname, 'menu.html'),
  galleryHtml: path.resolve(__dirname, 'gallery.html'),
  contactHtml: path.resolve(__dirname, 'contact.html'),
  reservationHtml: path.resolve(__dirname, 'reservation.html'),
  notFound: path.resolve(__dirname, '404.html'),
};

const input = Object.fromEntries(
  Object.entries(rawInputs).filter(([, filePath]) => fs.existsSync(filePath))
);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
