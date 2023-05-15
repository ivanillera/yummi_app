module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    ignorePatterns: [
        'projects/**/*',
        'build',
        'node_modules',
        'public'
    ],
    overrides: [
        {
            files: ['src/**/*.js', 'src/**/*.ts']
        }
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        camelcase: ['error', { properties: 'never', ignoreImports: true }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'method',
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
                filter: {
                    regex: '^_[a-z].*',
                    match: false
                }
            }
        ],
        '@typescript-eslint/no-var-requires':'off',

        // Individual rules
        indent: ['error', 4],
        'no-undef':'off',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        semi: 'error',
        'capitalized-comments': 'error',
        'max-depth': ['error', 4]
    }
};
