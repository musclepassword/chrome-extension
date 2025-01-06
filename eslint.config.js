module.exports = {
  'react-hooks/exhaustive-deps': 'off',
  env: {
    browser: true, // Tarayıcı ortamı
    es2021: true,  // ES2021 sözdizimini kullanabilmek için
  },
  extends: [
    'eslint:recommended', // Önerilen ESLint kuralları
    'plugin:react/recommended', // React için önerilen kurallar
  ],
  parser: '@babel/eslint-parser', // Babel ile ES6+ kodunu çözümlemek için
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSX sözdizimini kullanabilmek için
    },
    ecmaVersion: 12, // ES2021
    sourceType: 'module', // Modül bazlı kaynak
  },
  plugins: [
    'react', // React için eklenti
  ],
  rules: {
    'no-undef': 'off', // Tanımsız değişken hatasını kapat
  },
  settings: {
    react: {
      version: 'detect', // React versiyonunu otomatik tespit et
    },
  },
  globals: {
    chrome: 'readonly', // 'chrome' API'sini global olarak tanımla
  },
};
