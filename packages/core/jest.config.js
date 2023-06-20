module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  globalSetup: '<rootDir>/../../global-setup.js',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.constants.ts',
    '!<rootDir>/src/**/index.{ts,tsx}',
    '!<rootDir>/src/**/types.{ts,tsx}',
  ],
};
