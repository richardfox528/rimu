module.exports = {
  // The root directory that Jest should scan for tests and modules
  roots: ['<rootDir>/src'],

  // File extensions Jest should look for
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  // Module name mapper for handling static assets
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/mocks/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },

  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],

  // Test environment configuration
  testEnvironment: 'jsdom',

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/serviceWorker.js'
  ],

  // Coverage directory
  coverageDirectory: 'coverage',

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/build/'],

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },

  // Verbose output
  verbose: true,

  // Display individual test results
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports/junit',
      outputName: 'jest-junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › ',
      usePathForSuiteName: true
    }]
  ],

  // Test results processor
  testResultsProcessor: 'jest-sonar-reporter',

  // Error handling and display
  bail: false, // Don't stop on first failure
  notify: true, // Show desktop notifications for test results

  // Display test execution time
  slowTestThreshold: 5, // Show warning for tests taking longer than 5s

  // Display error details
  errorOnDeprecated: true, // Show error for deprecated features
  detectOpenHandles: true, // Detect async operations that weren't cleaned up

  // Display test coverage summary
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],

  // Display test coverage thresholds
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
}; 