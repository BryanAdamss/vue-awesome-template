import { defineConfig } from 'vite'

import { getDevConf, getProdConf } from './.vite-config'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('🚦 -> file: vite.config.ts -> line 9 -> defineConfig -> command, mode', command, mode)

  return command === 'build' ? getProdConf({ command, mode }) : getDevConf({ command, mode })
})
