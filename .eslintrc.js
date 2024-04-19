module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "overrides": [
        {
            "env": {
                "node": true
            }, 

            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-unused-vars": ["warn", {argsIgnorePattern: '^next$'}],
        "no-undef": "warn"
    },

    "globals": {
        process: 'readonly',
        __dirname: 'readonly'
    }
}
