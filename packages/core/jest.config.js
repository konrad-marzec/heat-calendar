module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  globalSetup: '<rootDir>/../../global-setup.js',
};
