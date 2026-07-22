module.exports = {
    extends: [
        "@redhat-actions/eslint-config",
    ],
    rules: {
        "no-console": 0,
        "@typescript-eslint/semi": 0,
        "semi": [ "error" ],
    },
};
