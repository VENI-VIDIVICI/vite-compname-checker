import { defineConfig  } from "vite"
import { viteCompnameChecker } from "vite-compname-checker"

export default defineConfig({
    base: './src/main.ts',
    plugins: [
        viteCompnameChecker()
    ]
})