module.exports = {
  env: {
    'cypress/globals': true,
  },
  parserOptions: {
    project: '../tsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['cypress'],
  extends: ['plugin:cypress/recommended'],
  rules: {
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-var-requires': 0,
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'newline-per-chained-call': 2,
  },
};
