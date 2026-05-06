import { existsSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Remove legacy/stale dirs from dist (flat upload). */
function removeStaleDistDirs(names) {
  return {
    name: 'remove-stale-dist-dirs',
    closeBundle() {
      const dist = resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
      if (!existsSync(dist)) return
      for (const name of names) {
        const p = resolve(dist, name)
        if (existsSync(p)) rmSync(p, { recursive: true, force: true })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), removeStaleDistDirs(['api', 'vendor'])],
  build: {
    assetsDir: '',
  },
})
