import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If your index.html is at the project root (it is), this is enough.
// Output will go to ./dist by default.
export default defineConfig({
    plugins: [react()]
});
