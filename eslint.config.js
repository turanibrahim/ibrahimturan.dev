import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // Web APIs
        HTMLElement: 'readonly',
        Element: 'readonly',
        HTMLParagraphElement: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        MouseEvent: 'readonly',
        PointerEvent: 'readonly',
        EventListener: 'readonly',
        CSSStyleDeclaration: 'readonly',
        // Browser APIs
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        performance: 'readonly',
        // Node globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Airbnb-inspired rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-use-before-define': 'off',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      'prefer-destructuring': ['error', { array: false, object: true }],
      'no-param-reassign': ['error', { props: false }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Vue-specific rules
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 5,
        multiline: 1,
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-props-declaration': ['error', 'type-based'],
    },
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.vscode/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
);
