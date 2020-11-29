module.exports = {
  root: true,
  env: {
    'cypress/globals': true,
    node: true,
  },
  plugins: ['cypress', 'prettier'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'prettier/react',
  ],
  rules: {
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
