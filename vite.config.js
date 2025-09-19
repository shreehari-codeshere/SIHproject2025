import{ defineConfig} from 'vite' 
import react from '@vitejs/plugin-react' 
import { basename } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/SIHproject2025"
})