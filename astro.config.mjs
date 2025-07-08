import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://dball.netlify.app',
});
