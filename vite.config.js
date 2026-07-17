import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import path from 'path'
import { defineConfig } from 'vite'
import viteOgp from 'vite-plugin-open-graph'
import { VitePWA } from 'vite-plugin-pwa'
import { generateLicenses } from './generateLicesnses'

const commitHash = execSync('git rev-parse --short HEAD').toString().trim()
const buildAt = Date.now()

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    generateLicenses(),
    VitePWA({
      strategies: 'injectManifest',
      filename: 'coi-serviceworker.js',
      injectManifest: {
        maximumFileSizeToCacheInBytes: 10000000
      },
      manifest: {
        name: 'PrograBlock',
        description: 'コード(JavaScript)とブロックを変換しながらプログラミングが出来るツール',
        theme_color: '#fff',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'ja-jp',
        icons: [
          {
            src: 'icons/128.png',
            sizes: '128x128',
            type: 'image/png'
          }, {
            src: 'icons/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    }),
    viteOgp({
      basic: {
        title: 'PrograBlock',
        type: 'website',
        image: 'https://ramune314159265.github.io/PrograBlock/icons/128.png',
        description: 'コード(JavaScript)とブロックを変換しながらプログラミングが出来るツール',
        url: 'https://ramune314159265.github.io/PrograBlock/',
        locale: 'ja_JP'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __BUILD_AT__: buildAt
  },
})
