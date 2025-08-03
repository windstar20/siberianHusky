export default {
  extends: ['@commitlint/config-conventional'], // 기존 규칙 재사용
  parserPreset: {
    parserOpts: {
      //  [type]: <공백>subject  패턴
      headerPattern: /^\[(\w+)]\: (.*)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    // Conventional 타입 목록 유지 — 필요하면 추가·삭제
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
