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
      // CamelCase 네이밍 규칙
      '@typescript-eslint/naming-convention': [
        'error',
        // 변수 (useState setter 포함)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          filter: {
            // React Hook과 상수는 예외 처리
            regex: '^(use[A-Z].*|[A-Z0-9_]+)$',
            match: false,
          },
        },
        // React Hook useState setter
        {
          selector: 'variable',
          filter: {
            regex: '^set[A-Z]',
            match: true,
          },
          format: ['camelCase'],
          prefix: ['set'],
        },
        // 함수명
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // 매개변수
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // 객체 프로퍼티
        {
          selector: 'property',
          format: ['camelCase', 'PascalCase'],
          filter: {
            // CSS-in-JS나 외부 API 속성은 예외
            regex: '^(data-|aria-|css|--)',
            match: false,
          },
        },
        // 타입/인터페이스
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // React 권장 규칙 직접 추가
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'error',
    },
  },
]);
