module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/vendor/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/examples/',
  ],
};
