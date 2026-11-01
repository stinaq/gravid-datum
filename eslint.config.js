import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Layer rules, see docs/ARCHITECTURE.md. Never disable these to get past them.
const coreImport = { group: ['**/core/**', '**/core'], message: 'components/ must not import from core/.' };
const componentImport = { group: ['**/components/**'], message: 'core/ must not import components.' };
const styleImport = { group: ['*.scss', '*.css', '**/*.scss', '**/*.css'], message: 'core/ must not import styles.' };
const reactImport = {
  group: ['react', 'react-dom', 'react/*', 'react-dom/*', 'react-day-picker', 'react-day-picker/*'],
  message: 'React is only allowed in core/**/use*.ts.',
};

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.strict],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'no-restricted-syntax': [
        'error',
        { selector: 'ExportDefaultDeclaration', message: 'Use named exports.' },
      ],
    },
  },
  {
    files: ['vite.config.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  {
    files: ['src/components/**'],
    rules: { 'no-restricted-imports': ['error', { patterns: [coreImport] }] },
  },
  {
    files: ['src/App.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: 'core/(?!(.+/)?use[A-Z][^/]*$)',
              message: 'App.tsx may only import hooks (core/**/use*.ts) from core/.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/core/**/use*.ts'],
    rules: { 'no-restricted-imports': ['error', { patterns: [componentImport, styleImport] }] },
  },
  {
    files: ['src/core/**/*.ts'],
    ignores: ['src/core/**/use*.ts'],
    languageOptions: { globals: {} },
    rules: {
      'no-restricted-imports': ['error', { patterns: [reactImport, componentImport, styleImport] }],
      'no-restricted-properties': [
        'error',
        { object: 'Date', property: 'now', message: 'Pure core must not read the clock. Pass "today" in.' },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: 'ExportDefaultDeclaration', message: 'Use named exports.' },
        {
          selector: "NewExpression[callee.name='Date'][arguments.length=0]",
          message: 'Pure core must not read the clock. Pass "today" in.',
        },
        { selector: "CallExpression[callee.object.name='Math'][callee.property.name='random']", message: 'Pure core must be deterministic.' },
      ],
      'no-restricted-globals': ['error', 'window', 'document', 'localStorage', 'sessionStorage', 'navigator', 'fetch'],
    },
  },
);
