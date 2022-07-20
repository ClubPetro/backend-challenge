module.exports = {
  transform: {},
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/data/use-cases/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(tsx|ts)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
};
