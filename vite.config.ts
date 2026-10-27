import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

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
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          menu: path.resolve(__dirname, 'menu/index.html'),
          gallery: path.resolve(__dirname, 'gallery/index.html'),
          blog: path.resolve(__dirname, 'blog/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          reservation: path.resolve(__dirname, 'reservation/index.html'),
          article1: path.resolve(__dirname, 'the-art-of-royal-dum-biryani-why-it-remains-a-timeless-favourite/index.html'),
          article2: path.resolve(__dirname, 'crispy-chicken-wraps-fresh-flavours-rolled-to-perfection/index.html'),
          article3: path.resolve(__dirname, 'chilled-mocktails-refreshing-coolers-the-ultimate-thirst-quenchers/index.html'),
          article4: path.resolve(__dirname, 'comfortable-dining-booths-designing-spaces-for-family-and-friends/index.html'),
          article5: path.resolve(__dirname, 'wok-tossed-perfection-the-secret-behind-our-savoury-egg-fried-rice/index.html'),
          article6: path.resolve(__dirname, 'the-ultimate-sweet-indulgence-warm-brownie-with-cool-ice-cream/index.html'),
          aboutHtml: path.resolve(__dirname, 'about.html'),
          menuHtml: path.resolve(__dirname, 'menu.html'),
          galleryHtml: path.resolve(__dirname, 'gallery.html'),
          blogHtml: path.resolve(__dirname, 'blog.html'),
          contactHtml: path.resolve(__dirname, 'contact.html'),
          reservationHtml: path.resolve(__dirname, 'reservation.html'),
        },
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
