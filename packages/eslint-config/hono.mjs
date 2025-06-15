import drizzle from 'eslint-plugin-drizzle';

import createConfig from './create-config.mjs';

export default createConfig({}, {
  ignores: ['src/db/migrations/*'],
  plugins: { drizzle },
  rules: {
    ...drizzle.configs.recommended.rules,
  },
});
