module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['@html-eslint'],
    extends: [
        'eslint:recommended',
    ],
    overrides: [
        {
          files: ["*.html"],
          parser: "@html-eslint/parser",
          extends: ["plugin:@html-eslint/recommended"],
            rules: {
                '@html-eslint/require-title': 0,
                '@html-eslint/require-lang': 0,
            }
        },
      ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType:'module'
    },
    rules: {
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'consistent-return': 0,
        indent: ['error', 4], // space indentation
        'no-else-return': 1,
        'no-undef': 0,
        'max-len': ['error', { code: 120 }],
    },
    ignorePatterns: ['cache/**/*', 'data/**/*', 'modules/**/*', 'node_modules/**/*', '*.css', 'resources/chat/**/*']
};