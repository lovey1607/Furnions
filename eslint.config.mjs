import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    plugins: ['import'],
  }),
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      'no-unused-vars': 'warn',
      'no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-absolute-path': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-self-import': 'off',
      'import/no-cycle': 'warn',
      'import/no-useless-path-segments': 'warn',
    },
  },
]
 
export default eslintConfig