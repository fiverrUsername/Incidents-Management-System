module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^axios$': '<rootDir>/axios.ts',
    },
  };
  