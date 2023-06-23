// const pathJoin = require('path').join;

module.exports = {
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: [pathJoin(__dirname, './packages/core/tsconfig.json'), pathJoin(__dirname, './apps/docs/tsconfig.json')],
  // },
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-base`
  extends: ['base'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
