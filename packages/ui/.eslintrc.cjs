module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
