import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.tsx',
    '!**/node_modules/**',
    '!**/*.test.tsx',
    '!src/tests/setupTests.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default config;
