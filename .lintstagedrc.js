const fs = require('node:fs');
const path = require('node:path');

module.exports = {
  '*.{js,jsx,ts,tsx,html,md,json,jsonc,yml,yaml,toml,xml,css,postcss}': [
    'pnpm run lint --',
  ],
  '{apps,packages}/**/*.{ts,tsx}': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map(file => path.relative(cwd, file));

    const projectRoots = new Set();

    for (const filePath of relativePaths) {
      const parts = filePath.split(path.sep);
      if ((parts[0] === 'apps' || parts[0] === 'packages') && parts.length > 2) {
        projectRoots.add(path.join(parts[0], parts[1]));
      }
    }

    return Array.from(projectRoots)
      .filter(project => fs.existsSync(path.join(project, 'tsconfig.json')))
      .map(
        project => `tsc --noEmit --project ${project}/tsconfig.json`,
      );
  },
};
