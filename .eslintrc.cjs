module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/no-setup-props-destructure': 'off',
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'vue/multi-word-component-names': 'off',
    'max-len': ['error', {
      tabWidth: 2,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 4,
      },
      multiline: {
        max: 1,
      },
    }],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@ui', './src/components/ui'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
