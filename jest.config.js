export default {
  transform: {},
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['vue', 'js', 'ts'],
  testMatch: ['**/test/**/*.test.[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/main.ts',
    '!src/env.d.ts'
  ]
}