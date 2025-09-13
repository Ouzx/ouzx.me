// import tailwindcss from '@yorganci/eslint-plugin-tailwindcss';

import createConfig from './create-config.mjs';

export default createConfig(
  {
    react: true,
    nextjs: true,
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
