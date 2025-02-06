import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'bem-helper/class-name-case': [
        'error',
        'always',
        {
          ignore: [
            '^hover:.*',
            '^focus:.*',
            '^active:.*',
            '^w-\\[.*\\]$', // Игнорируем Tailwind классы вида w-[40%]
            '^h-\\[.*\\]$', // Игнорируем h-[200px] и подобные
            '^bg-\\[.*\\]$', // Игнорируем bg-[rgba(0,0,0,0.5)]
          ]
        },
      ],
    },
  }
)
