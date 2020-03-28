module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    },
    {
      files: ['./types/**/*'],
      rules: {
        'no-var': 'off'
      }
    }
  ],
  ignorePatterns: [
    '*.js',
    'lib/**/*',
    'dist/**/*',
    'coverage/**/*',
    'examples/**/*'
  ]
};
