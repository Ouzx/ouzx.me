import pluginNext from '@next/eslint-plugin-next';
// import tailwindcss from '@yorganci/eslint-plugin-tailwindcss';

import createConfig from './create-config.mjs';

export default createConfig(
  {
    react: true,
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  // tailwindcss.configs.recommended,
  // {
  //   settings: {
  //     tailwindcss: {
  //       stylesheet: '../../packages/ui/src/styles/globals.css',
  //     },
  //   },
  // },
);
