import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'static',
  site: 'https://dball.netlify.app',
  baseUrl: '.',
  paths: {
    '@src/*': ['src/*'],
    '@components/*': ['src/components/*'],
    '@layouts/*': ['src/layouts/*'],
    '@pages/*': ['src/pages/*'],
    '@tests/*': ['src/tests/*'],
    '@types/*': ['src/types/*'],
    '@utils/*': ['src/utils/*'],
  },
});
