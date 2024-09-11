import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("%c"+`===THIS A ${mode.toUpperCase()} MODE ===`,"color:green");
  console.log("===CONNECT TO === "+env.VITE_API_URL);
  
  return {
    plugins: [react()],
    build: { chunkSizeWarningLimit: 8000 },
    server: {
      proxy: {
        '/api': {
          target:env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    }
   
  }
})
