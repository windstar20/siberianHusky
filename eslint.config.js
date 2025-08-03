import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      // 이벤트 핸들러 함수명 규칙 설정
      'react/jsx-handler-names': [
        'error',
        {
          // DOM·컴포넌트 프롭 이름은 onXxx 형식
          eventHandlerPropPrefix: 'on',
          // 대응하는 함수 이름은 handleXxx 형식
          eventHandlerPrefix: 'handle',
          checkLocalVariables: true, // 로컬 const handleX 도 검사
          checkInlineFunction: false, // 인라인 화살표 함수는 검사하지 않음
          checkDestructuredProps: false, // props로 전달받은 함수는 검사하지 않음
        },
      ],

      // React 권장 규칙 직접 추가
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'error',
    },
  },
]);
