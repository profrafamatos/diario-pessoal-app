module.exports = {
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  transformIgnorePatterns: ['/node_modules/'],

  roots: ['<rootDir>/tests'],

  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/public/js/**/*.js'],

  testTimeout: 10000,
};
