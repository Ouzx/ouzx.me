# Creating a New Package

This guide walks you through the process of creating and integrating a new package into our monorepo.

## Prerequisites

- [ ] Ensure you have PNPM installed
- [ ] Make sure you're in the root directory of the project
- [ ] Ensure you have the latest changes from the main branch

## Step 1: Create Package Directory

- [ ] Create a new directory for your package:
  ```bash
  mkdir packages/your-package-name
  ```

## Step 2: Initialize Package

- [ ] Create a `package.json` with required fields, you need to eslint and typescript packages and as well as our config packages.
  ```json
    {
        "name": "@ouzx-me/your-package-name",
        "type": "module",
        "version": "0.0.1",
        "private": true,
        "exports": {
            ".": "./src/index.ts"
        },
        "scripts": {
            "lint": "eslint .",
            "typecheck": "tsc --noEmit",
            "build": "echo 'build'",
            "start": "echo 'start'",
            "dev": "echo 'dev'",
            "test": "echo 'test'",
            "clean": "echo 'clean'"
        },
        "dependencies": { },
        "devDependencies": {
            "@ouzx-me/eslint-config": "workspace:*",
            "@ouzx-me/typescript-config": "workspace:*",
            "@types/node": "^20",
            "eslint": "^9.17.0",
            "typescript": "^5"
        },
        "lint-staged": {
            "*": [
                "eslint --fix"
            ],
            "*.{ts,tsx}": [
                "sh -c 'tsc --noEmit'"
            ]
        }
    }
  ```

## Step 3: Set Up TypeScript

- [ ] Create `tsconfig.json`, you can extend the base config from our config package.
  ```json
    {
        "extends": "@ouzx-me/typescript-config/base.json",
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
            "@/config/*": ["./src/*"]
            },
            "noEmit": true
        },
        "exclude": ["node_modules"]
    }
  ```

## Step 4: Set Up ESLint

- [ ] Create `eslint.config.mjs`, you can tweak it as you want.
  ```javascript
    import createConfig from '@ouzx-me/eslint-config/create-config';

    export default createConfig();
  ```

## Step 5: Install Dependencies

- [ ] Install dependencies:
    ```bash
    pnpm i
    ```

## Step 6: Set Up Source Files

- [ ] Create source directory and main file:
  ```bash
  mkdir src
  touch src/index.ts
  ```
- [ ] Add basic exports to `src/index.ts`

## Step 7: Testing Setup

- [ ] Create `src/__tests__` directory
- [ ] Add test file: `src/__tests__/index.test.ts`
- [ ] Create `vitest.config.ts` if needed

## Step 8: Documentation

- [ ] Create `README.md` in package directory with:
  - Package description
  - Installation instructions
  - Usage examples
  - API documentation
  - Contributing guidelines

## Step 9: Integration

- [ ] Build the package:
  ```bash
  pnpm build
  ```
- [ ] Test the package:
  ```bash
  pnpm test
  ```
- [ ] Add the package as a dependency where needed:
  ```bash
  pnpm add @ouzx-me/your-package-name
  ```

## Final Checklist

- [ ] Package builds successfully
- [ ] All tests pass
- [ ] ESLint shows no errors
- [ ] TypeScript shows no errors
- [ ] Documentation is complete
- [ ] Package is properly exported
- [ ] Dependencies are correctly specified
- [ ] Package is listed in workspace configuration

## Common Issues

- If you encounter build errors, check your `tsconfig.json` and build script configurations
- If dependencies aren't resolving, run `pnpm install` from the root directory
- If types aren't being recognized, ensure your `package.json` "types" field is correct
- If tests fail, ensure all dependencies are properly mocked and environment is set up correctly
