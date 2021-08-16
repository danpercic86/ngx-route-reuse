module.exports = {
  roots: ['<rootDir>'],
  displayName: 'Ngx Route Reuse',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/ngx-route-reuse/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/projects/ngx-route-reuse/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePathIgnorePatterns: ["<rootDir>/projects/demo"],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/projects/ngx-route-reuse/src/test-setup.ts'],
};
