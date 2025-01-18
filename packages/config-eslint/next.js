import createConfig from "./create-config";
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const config = compat.config({
    extends: ['next'],
    settings: {
        next: {
            rootDir: 'apps/web/',
        },
    },
})

export default createConfig({}, ...config);
