const { pathsToModuleNameMapper } = require('ts-jest');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/core/**/*.*.ts",
    "<rootDir>/src/modules/**/*.*.ts",
    // "<rootDir>/src/{!(ignore-me),}*.module.ts",
    // "<rootDir>/src/**/{!(ignore-me),}*.module.ts"
  ],
  coveragePathIgnorePatterns:[
    ".module.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "text-summary",
    "lcov",
    "json",
    "text",
    "clover"
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    'node_modules'
  ],
  testMatch: [
    "**/*.spec.ts",
  ],
};
