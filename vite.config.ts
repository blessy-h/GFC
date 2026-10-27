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
          // Root redirect stubs for backward-compatibility
          menu_stub: path.resolve(__dirname, 'menu.html'),
          about_stub: path.resolve(__dirname, 'about.html'),
          gallery_stub: path.resolve(__dirname, 'gallery.html'),
          contact_stub: path.resolve(__dirname, 'contact.html'),
          reservation_stub: path.resolve(__dirname, 'reservation.html'),
          blog_stub: path.resolve(__dirname, 'blog.html'),
          ariticle1_stub: path.resolve(__dirname, 'ariticle1.html'),
          ariticle2_stub: path.resolve(__dirname, 'ariticle2.html'),
          ariticle3_stub: path.resolve(__dirname, 'ariticle3.html'),
          ariticle4_stub: path.resolve(__dirname, 'ariticle4.html'),
          ariticle5_stub: path.resolve(__dirname, 'ariticle5.html'),
          ariticle6_stub: path.resolve(__dirname, 'ariticle6.html'),
          // Clean directory-based pages
          menu: path.resolve(__dirname, 'menu/index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          gallery: path.resolve(__dirname, 'gallery/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          reservation: path.resolve(__dirname, 'reservation/index.html'),
          blog: path.resolve(__dirname, 'blog/index.html'),
          ariticle1: path.resolve(__dirname, 'ariticle1/index.html'),
          ariticle2: path.resolve(__dirname, 'ariticle2/index.html'),
          ariticle3: path.resolve(__dirname, 'ariticle3/index.html'),
          ariticle4: path.resolve(__dirname, 'ariticle4/index.html'),
          ariticle5: path.resolve(__dirname, 'ariticle5/index.html'),
          ariticle6: path.resolve(__dirname, 'ariticle6/index.html'),
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
