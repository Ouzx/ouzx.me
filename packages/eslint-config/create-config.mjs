import antfu from '@antfu/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';

export default function createConfig(options, ...userConfigs) {
  return antfu({
    type: 'app',
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
    },
    pnpm: true,
    ...options,
  }, {
    rules: {
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],
      'perfectionist/sort-imports': ['error', {
        tsconfigRootDir: '.',
      }],
      'unicorn/filename-case': ['error', {
        case: 'kebabCase',
      }],
    },
  }, {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  }, {
    files: ['**/*.md'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  }, {
    ignores: ['dist/**'],
  }, ...userConfigs);
}
