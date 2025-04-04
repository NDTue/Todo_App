import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Todo_App/',// Thay 'Todo_App' bằng tên kho lưu trữ của bạn
})
