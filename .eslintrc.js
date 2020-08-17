module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'import'],
  root: true,
  rules: {
    'no-case-declarations': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx']
    }],
    'eol-last': 0,
    "prettier/prettier": ["error"]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', './src']
        ]
      }
    }
  }
};