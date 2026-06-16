import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const roleUrl = env.VITE_ROLE_URL;
  const url = new URL(roleUrl);

  return {
    appType: 'spa',
    server: {
      proxy: {
        '/api/campaigns': {
          target: url.origin,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.path = url.pathname + url.search;
            });
          }
        }
      }
    }
  };
});
