module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'eslint:recommended',
      ],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
};
