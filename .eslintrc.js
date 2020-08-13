module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["react-app", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 90,
        bracketSpacing: true,
        trailingComma: "es5",
      },
    ],
  },
};
