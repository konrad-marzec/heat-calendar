const pathJoin = require('path').join;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [pathJoin(__dirname, '../core/tsconfig.json'), pathJoin(__dirname, '../../apps/docs/tsconfig.json')],
  },
  plugins: ['testing-library', 'import'],
  extends: [
    'xo',
    'turbo',
    'prettier',
    'xo-typescript',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'object'],
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    // Defer to Prettier
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
  },
};
