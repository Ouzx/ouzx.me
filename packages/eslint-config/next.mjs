import pluginNext from '@next/eslint-plugin-next';

import createConfig from './create-config.mjs';

export default createConfig({}, {
  plugins: {
    '@next/next': pluginNext,
  },
  rules: {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs['core-web-vitals'].rules,
  },
});
