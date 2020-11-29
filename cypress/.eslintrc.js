module.exports = {
  root: true,
  env: {
    'cypress/globals': true,
    node: true,
  },
  plugins: ['cypress', 'prettier'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  rules: {
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
