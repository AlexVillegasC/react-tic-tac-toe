import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],    
})



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],  
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost.key')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost.crt')),
//     },
//     // Optionally specify a host if you need something besides "localhost"
//     // host: 'localhost',
//     port: 5173, // or whichever port you'd like
//   },
//     esbuild: {
//     logLevel: "silent"
//   }
// })

