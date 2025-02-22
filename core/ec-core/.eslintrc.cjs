// @ts-check

// This file inherits the parent eslint config, so we only need to include the rules we want to override
/** @type {import('eslint').Linter.Config} */
const config = {
  root: false,
  rules: {
    'check-file/folder-naming-convention': 'off',
    'check-file/filename-naming-convention': 'off',
    'valid-jsdoc': 'off',
    '@bigcommerce/jsx-short-circuit-conditionals': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'import/no-extraneous-dependencies': 'off',
  },
  ignorePatterns: [
    'client/generated/**/*.ts',
    'playwright-report/**',
    'test-results/**',
    '**/google_analytics4.js',
  ],
};

module.exports = config;
