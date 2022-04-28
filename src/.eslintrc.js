module.exports = {
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',  //  从@eslint-plugin-react推荐规则
    // require.resolve('@umijs/fabric/dist/eslint')
  ],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  parserOptions:  {
    ecmaVersion:  2018,  // 允许解析现代ECMAScript特性
    sourceType:  'module',  // 允许使用 imports 导入
    ecmaFeatures:  {
        jsx:  true,  // 语序解析JSX
    },
},
  rules: {
    "react/prop-types": "off",
    // suppress errors for missing 'import React' in files
   "react/react-in-jsx-scope": "off",
   // allow jsx syntax in js files (for next.js project)
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], //should add ".ts" if typescript
    'no-nested-ternary': 0,
  },
};
