import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { OUTPUT_DIR } from './build/constant';
import { generateAppConfig } from './build/generateConfig.js';
import path from "path";
import createVitePlugins from './vite/plugins'

const TimeStamp = new Date().getTime();

function resolve(url) {
  return path.resolve(__dirname, url);
}
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: './', //env.VITE_APP_BASE_URL, // 动态改变base值
    assetsInclude: [
      "**/*.glb",
      "**/*.gltf",
      "**/*.fbx",
      "**/*.hdr",
      "**/*.json",
      "**/*.mp4",
      "**/*.mov",
    ],
    resolve: {
      alias: {
        "@": resolve("./src"),
        "~@": resolve("./src"),
      },
      // 省略文件后缀
      extensions: [".mjs", ".js", ".jsx", ".json"],
    },
    build: {
      minify: 'esbuild',
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          // keep_infinity: true,
          // // Used to delete console in production environment
          // drop_console: VITE_DROP_CONSOLE,
          // drop_debugger: true,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // 参考：https://blog.cinob.cn/archives/393
        output: {
          // 入口文件名
          entryFileNames: `assets/[name]-${TimeStamp}.js`,
          // 块文件名
          chunkFileNames: `assets/[name]-[hash]-${TimeStamp}.js`,
          // 资源文件名 css 图片等等
          assetFileNames: `assets/[name]-[hash]-balabala-${TimeStamp}.[ext]`,
        }
      }
    },
    plugins: [
      ...createVitePlugins(env, command === 'build'),
      // 运行时配置生成插件
      {
        name: 'generate-app-config',
        closeBundle() {
          if (command === 'build') {
            generateAppConfig(mode, OUTPUT_DIR);
          }
        }
      }
    ],
    server: {
      host: true,
      port: 8084,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          // target: 'http://192.168.120.165:8080',
          // target: 'http://192.168.120.66:9114',
          target: 'http://192.168.110.110:9090',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        },
        '/prod-api': {
          target: 'http://127.0.0.1:9114',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/prod-api/, '')
        },
        '/prod-api-zt': {
          target: 'http://127.0.0.1:9090',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/prod-api-zt/, '')
        }
      }
    }
  });
};