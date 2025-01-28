import createConfig from './create-config.mjs';
import pluginNext from '@next/eslint-plugin-next';
import pluginNextOnPages from 'eslint-plugin-next-on-pages';

export default createConfig({}, {
  plugins: {
    '@next/next': pluginNext,
    'next-on-pages': pluginNextOnPages,
  },
  rules: {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs['core-web-vitals'].rules,
    ...pluginNextOnPages.configs.recommended.rules,
  },
});
