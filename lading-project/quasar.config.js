const { configure } = require('quasar/wrappers');
const phpPlugin = require('vite-plugin-php');
const { resolve, join } = require('path');

const packageVersion = process.env.npm_package_version; // 현재 프로젝트 버전 가져오기

module.exports = configure((/* ctx */) => ({
  eslint: {
    fix: true,
    warnings: true,
    errors: true,
  },
  preFetch: true,
  boot: ['unocss'],
  css: ['app.scss'],
  extras: [
    'material-icons',
    'material-symbols-outlined',
    'fontawesome-v6',
    'eva-icons',
  ],
  build: {
    target: {
      browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
      node: 'node16',
    },
    alias: {
      '@': resolve(__dirname, '/src'),
      '~': resolve(__dirname, '/node_modules'),
    },
    vueRouterMode: 'hash', // available values: 'hash', 'history'
    // distDir: join(__dirname, '..', './backend/front'), // 빌드 파일 설치 경로
    rollupOptions: {
      output: {
        // 빌드 파일 이름 설정 (프로젝트 버전과 함께 export)
        entryFileNames: `assets/[name]-${packageVersion}.min.js`,
        chunkFileNames: `assets/[name]-${packageVersion}.min.js`,
        assetFileNames: `assets/[name]-${packageVersion}-.min.[ext]`,
      },
    },
    vitePlugins: [
      ['unocss/vite', {}],
      [
        'vite-plugin-php',
        {
          entry: ['index.php'],
          plugins: [phpPlugin()],
        },
      ],
    ],
  },
  devServer: {
    open: true, // opens browser window automatically
    port: 8001,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: '/index.php',
        },
      ],
    },
  },
  framework: {
    config: {},
    lang: 'ko-kr',
    plugins: ['Cookies', 'Dialog', 'Notify', 'Loading'],
  },
  animations: [],
  ssr: {
    pwa: false,
    prodPort: 3000, // The default port that the production server should use
    middlewares: [
      'render', // keep this as last one
    ],
  },
  pwa: {
    workboxMode: 'generateSW', // or 'injectManifest'
    injectPwaMetaTags: true,
    swFilename: 'sw.js',
    manifestFilename: 'manifest.json',
    useCredentialsForManifestTag: false,
  },
  cordova: {},
  capacitor: {
    hideSplashscreen: true,
  },
  electron: {
    inspectPort: 5858,
    bundler: 'packager', // 'packager' or 'builder'
    packager: {},
    builder: {
      appId: 'quasar-bolilerplate',
    },
  },
  bex: {
    contentScripts: ['my-content-script'],
  },
}));
