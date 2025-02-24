import createConfig from './create-config.mjs';
import pluginNext from '@next/eslint-plugin-next';

export default createConfig({}, {
  plugins: {
    '@next/next': pluginNext,
  },
  rules: {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs['core-web-vitals'].rules,
  },
});
