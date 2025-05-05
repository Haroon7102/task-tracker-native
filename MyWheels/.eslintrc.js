// module.exports = {
//   root: true,
//   extends: '@react-native',
//   rules: {
//     'no-alert': 'off',
//   },
//   parserOptions: {
//     requireConfigFile: false,
//     ecmaVersion: 2020,
//     sourceType: 'module',
//   },

// };



module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // ✅ Enables JSX support
    },
    requireConfigFile: false, // ✅ Important for @babel/eslint-parser
  },
};
