import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    server: {
      // 🔥 新增：允许的域名列表（解决Blocked request错误）
      host: '0.0.0.0', // 允许所有网络接口访问
      allowedHosts: [
        'frp-dad.com',           // 你的frp域名
        'aimedia.chenyibang.com', // 你的主域名
        'localhost',
        '127.0.0.1',
        '192.168.1.33'           // 你的NAS内网IP
      ],
      
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'same-origin'
      },
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true
        },
      },
      cors: true
    },
    define: {
      'process.env': {}
    }
  }
})