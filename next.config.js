const nextTranslate = require('next-translate-plugin');

const config = nextTranslate({
  reactStrictMode: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['picsum.photos'],
  },
  output: 'export',
});

// ❗ Remove i18n field to prevent export conflict
delete config.i18n;

module.exports = config;
