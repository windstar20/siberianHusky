import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import reactNaming from 'eslint-plugin-react-naming-convention';

export default tseslint.config([
  globalIgnores(['dist', 'eslint.config.js']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-naming-convention': reactNaming,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'react-naming-convention/use-state': 'error', // setter ↔ 값 대칭 검사
      camelcase: ['error', { properties: 'always', ignoreDestructuring: false }],
      //
      'react/jsx-handler-names': [
        'error',
        {
          // DOM·
          eventHandlerPropPrefix: 'on',
          eventHandlerPrefix: 'handle',
          checkLocalVariables: true,
          checkInlineFunction: false,
          checkDestructuredProps: false,
        },
      ],
      // React
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'error',
    },
  },
]);
