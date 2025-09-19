import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// If you plan to deploy to GitHub Pages under a repo, set base to '/REPO_NAME/'.
export default defineConfig({
  plugins: [react()],
  // base: '/REPO_NAME/',
})
