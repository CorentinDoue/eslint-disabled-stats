module.exports = {
  roots: ['src'],
  transform: {
    '.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.ts', '**/*.spec.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testURL: 'http://localhost',
};
