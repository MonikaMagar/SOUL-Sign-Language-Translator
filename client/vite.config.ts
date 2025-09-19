// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { qrcode } from 'vite-plugin-qrcode'; // ✅ Use named import for the plugin

export default defineConfig({
  plugins: [
    react(),
    qrcode()   // ✅ Add the QR code plugin here
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // Allow other devices to connect (e.g. your phone)
    port: 3000,
    open: true,
  },
});
