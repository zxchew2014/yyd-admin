module.exports = {
    "extends": ["airbnb", "prettier", "prettier/react", "react-app"],
    "plugins": ["prettier"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "constructor-super": "error",
        "linebreak-style": ["error", "windows"],
        "no-param-reassign": ["error", {"props": false}],
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", {"aspects": ["invalidHref"]}],
        "array-callback-return": "error",
        "no-nested-ternary": "error"
    }
};